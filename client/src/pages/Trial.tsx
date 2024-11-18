import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PhotoCapture } from "@/components/PhotoCapture";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import type { Analysis } from "@/lib/types";

export default function Trial() {
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleAnalysisComplete = (result: Analysis) => {
    setAnalysis(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Start Your Free Trial</h1>
        <p className="text-xl text-gray-600 mb-8">
          Get started with 3 free evaluations. No credit card required.
        </p>
        
        {!showEvaluation ? (
          <div className="bg-white rounded-lg shadow-lg p-8 border border-zinc-200">
            <h2 className="text-2xl font-semibold mb-4">What's included:</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <span className="bg-blue-100 p-2 rounded-full mr-3">✓</span>
                3 Complete 5S evaluations
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 p-2 rounded-full mr-3">✓</span>
                AI-powered analysis
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 p-2 rounded-full mr-3">✓</span>
                Detailed reports and recommendations
              </li>
            </ul>
            <Button 
              onClick={() => setShowEvaluation(true)}
              className="w-full bg-gradient-to-r from-blue-300 to-blue-400 text-black border-2 border-black px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Begin Your Trial
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 border border-zinc-200">
            {!analysis ? (
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold">Upload Workplace Photos</h2>
                <p className="text-gray-600">
                  Take or upload up to 4 photos of your workspace for AI analysis
                </p>
                <PhotoCapture onAnalysisComplete={handleAnalysisComplete} />
              </div>
            ) : (
              <ScoreDisplay analysis={analysis} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
