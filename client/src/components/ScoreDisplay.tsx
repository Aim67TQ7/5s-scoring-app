import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2pdf from 'html2pdf.js';
import type { Analysis } from "@/lib/types";

interface ScoreDisplayProps {
  analysis: Analysis;
}

export function ScoreDisplay({ analysis }: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 95) return "bg-green-500";
    if (score >= 85) return "bg-green-400";
    if (score >= 75) return "bg-yellow-500";
    if (score >= 65) return "bg-yellow-600";
    return "bg-red-500";
  };

  const downloadPDF = () => {
    const element = document.getElementById('score-report');
    const opt = {
      margin: 0.5,
      filename: `5S-Report-${analysis.location}-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="space-y-4">
      <div id="score-report" className="space-y-6 print:space-y-4 bg-white px-6 pb-6 pt-2">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold mb-2">5S-AI.Com Analysis</h1>
          <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
        </div>

        {/* Location Info */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold">Location</h3>
            <p>{analysis.location}</p>
          </div>
          <div>
            <h3 className="font-semibold">Department</h3>
            <p>{analysis.department}</p>
          </div>
          <div>
            <h3 className="font-semibold">Work Station</h3>
            <p>{analysis.workStation}</p>
          </div>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-2 gap-4">
          {analysis.imageUrls.map((url, index) => (
            <div key={index} className="aspect-square w-full max-h-[200px]">
              <img
                src={url}
                alt={`Workplace photo ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>

        {/* Overall Score */}
        <div className="text-center border-t border-b py-3">
          <h2 className="text-2xl font-bold mb-1">Overall Score</h2>
          <div className="text-4xl font-bold text-primary">
            {analysis.overallScore.toFixed(1)}%
          </div>
        </div>

        {/* Scoring Guide */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Score Interpretation Guide</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>95-100: Exceptional</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span>85-94: Advanced</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>75-84: Proficient</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-600" />
              <span>65-74: Developing</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Below 65: Requires Attention</span>
            </div>
          </div>
        </div>
        {/* Category Scores */}
        <div className="space-y-2">
          {Object.entries(analysis.scores).map(([key, score]) => {
            const categoryDetails = analysis.categories[key];
            return (
              <div key={key} className="border-b pb-3 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-semibold capitalize">
                    {key === 'setInOrder' ? 'Set in Order' : key}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{score.toFixed(1)}%</span>
                    <div className={`w-3 h-3 rounded-full ${getScoreColor(score)}`} />
                  </div>
                </div>
                <Progress
                  value={score}
                  className={`${getScoreColor(score)} h-2`}
                />
                <div className="mt-2 space-y-2 text-sm">
                  {/* Key Findings */}
                  {categoryDetails.findings.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700">Key Findings:</h4>
                      <ul className="list-disc pl-4 text-gray-600 space-y-1">
                        {categoryDetails.findings.slice(0, 3).map((finding, idx) => (
                          <li key={idx}>{finding}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Recommendations */}
                  {categoryDetails.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700">Top Recommendations:</h4>
                      <ul className="space-y-1">
                        {categoryDetails.recommendations.slice(0, 2).map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className={`inline-block px-2 py-0.0 rounded text-xs ${
                              rec.priority === 'high' 
                                ? 'bg-red-100 text-red-700'
                                : rec.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {rec.priority}
                            </span>
                            <span className="text-gray-600 flex-1">{rec.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggestions */}
        {analysis.suggestions && (
          <div className="bg-gray-50 p-3 rounded">
            <h3 className="font-semibold mb-1">Improvement Suggestions</h3>
            <div className="space-y-2 text-gray-600 text-sm">
              {analysis.suggestions.split('\n\n').map((suggestion, index) => (
                <p key={index}>{suggestion}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Button
        onClick={downloadPDF}
        className="w-full mt-4"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Report
      </Button>
    </div>
  );
}
