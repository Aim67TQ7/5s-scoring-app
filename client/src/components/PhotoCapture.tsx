import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Analysis } from "@/lib/types";

interface PhotoCaptureProps {
  onAnalysisComplete: (analysis: Analysis) => void;
}

export function PhotoCapture({ onAnalysisComplete }: PhotoCaptureProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 4) {
      toast({
        title: "Too many photos",
        description: "Please select up to 4 photos",
        variant: "destructive",
      });
      return;
    }

    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/heif'];
      return validTypes.includes(file.type);
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid file type",
        description: "Please only upload JPG, PNG, HEIC, or HEIF images",
        variant: "destructive",
      });
      return;
    }

    setPhotos(validFiles);
    
    // Create previews
    const newPreviews = await Promise.all(
      validFiles.map(file => URL.createObjectURL(file))
    );
    setPreviews(newPreviews);
  };

  const handleSubmit = async () => {
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

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const analysis = await response.json();
      onAnalysisComplete(analysis);
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

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {previews.map((preview, index) => (
            <Card key={index} className="relative aspect-square overflow-hidden">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </Card>
          ))}
        </div>
      )}

      {photos.length > 0 && (
        <Button 
          onClick={handleSubmit} 
          className="w-full"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Analyze Photos
        </Button>
      )}
    </div>
  );
}
