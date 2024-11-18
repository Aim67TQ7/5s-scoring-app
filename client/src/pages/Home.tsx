import { useState } from "react";
import { PhotoCapture } from "@/components/PhotoCapture";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { Card } from "@/components/ui/card";
import { type Analysis } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const { toast } = useToast();

  const handleAnalysisComplete = (result: Analysis) => {
    setAnalysis(result);
    toast({
      title: "Analysis Complete",
      description: "5S scores have been calculated based on the provided images.",
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center">5S Score Analysis</h1>
      
      <Card className="p-6 mb-8">
        <PhotoCapture onAnalysisComplete={handleAnalysisComplete} />
      </Card>

      {analysis && (
        <Card className="p-6">
          <ScoreDisplay analysis={analysis} />
        </Card>
      )}
    </div>
  );
}
