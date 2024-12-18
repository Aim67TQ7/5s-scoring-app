import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Analysis } from "@/lib/types";

interface PhotoCaptureProps {
  onAnalysisComplete: (analysis: Analysis) => void;
}

export function PhotoCapture({ onAnalysisComplete }: PhotoCaptureProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [workStation, setWorkStation] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const totalFiles = photos.length + newFiles.length;
    
    if (totalFiles > 4) {
      toast({
        title: "Maximum Photos Reached",
        description: "You can only add up to 4 photos per evaluation. Please remove some photos first.",
        variant: "destructive",
      });
      return;
    }

    const validFiles = newFiles.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/heif'];
      return validTypes.includes(file.type);
    });

    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Please only upload JPG, PNG, HEIC, or HEIF images",
        variant: "destructive",
      });
      return;
    }

    setPhotos(prevPhotos => [...prevPhotos, ...validFiles]);
    
    const newPreviews = await Promise.all(
      validFiles.map(file => URL.createObjectURL(file))
    );
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  };

  const removePhoto = (index: number) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
    setPreviews(prevPreviews => {
      URL.revokeObjectURL(prevPreviews[index]);
      return prevPreviews.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async () => {
    if (!location || !department || !workStation) {
      toast({
        title: "Missing Information",
        description: "Please fill in all location details",
        variant: "destructive",
      });
      return;
    }

    if (photos.length === 0) {
      toast({
        title: "No photos selected",
        description: "Please select at least one photo",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    photos.forEach(photo => formData.append('photos', photo));
    formData.append('location', location);
    formData.append('department', department);
    formData.append('workStation', workStation);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const analysis = await response.json();
      onAnalysisComplete({
        ...analysis,
        location,
        department,
        workStation
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze photos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Work Station"
          value={workStation}
          onChange={(e) => setWorkStation(e.target.value)}
          className="border rounded p-2"
          required
        />
      </div>

      {/* Warning message about required fields */}
      <div className="text-sm text-amber-600 mb-2">
        * Please complete Location, Department, and Work Station before analyzing photos
      </div>

      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="w-full md:w-auto"
        >
          <Camera className="mr-2 h-4 w-4" />
          Take Photo
        </Button>
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="w-full md:w-auto"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Photos
        </Button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        capture="environment"
        onChange={handleFileSelect}
      />

      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card 
            key={i} 
            className={`relative overflow-hidden aspect-square ${
              i < previews.length 
                ? '' 
                : 'border-dashed border-2 flex items-center justify-center'
            }`}
          >
            {i < previews.length ? (
              <>
                <img
                  src={previews[i]}
                  alt={`Preview ${i + 1}`}
                  className="w-full h-full object-cover rounded-[inherit]"
                />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                  aria-label="Remove photo"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <div className="text-center p-4 text-gray-400">
                <Camera className="mx-auto h-8 w-8 mb-2" />
                <p>Photo {i + 1}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Button 
        onClick={handleSubmit} 
        className="w-full"
        disabled={loading || photos.length === 0 || !location || !department || !workStation}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Analyze Photos
      </Button>
    </div>
  );
}
