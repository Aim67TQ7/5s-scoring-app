import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Analysis } from "@/lib/types";

interface ScoreDisplayProps {
  analysis: Analysis;
}

export function ScoreDisplay({ analysis }: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-8 print:space-y-6">
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

      {/* Overall Score */}
      <div className="text-center border-t border-b py-4">
        <h2 className="text-2xl font-bold mb-2">Overall Score</h2>
        <div className="text-4xl font-bold text-primary">
          {analysis.overallScore.toFixed(1)}%
        </div>
      </div>

      {/* Category Scores */}
      <div className="space-y-6">
        {Object.entries(analysis.scores).map(([key, score]) => (
          <div key={key} className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2 capitalize">
              {key === 'setInOrder' ? 'Set in Order' : key}
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg">{score.toFixed(1)}%</span>
            </div>
            <Progress
              value={score}
              className={getScoreColor(score)}
            />
          </div>
        ))}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 gap-4">
        {analysis.imageUrls.map((url, index) => (
          <div key={index} className="aspect-square">
            <img
              src={url}
              alt={`Workplace photo ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {analysis.suggestions && (
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Improvement Suggestions</h3>
          <div className="space-y-4 text-gray-600">
            {analysis.suggestions.split('\n\n').map((suggestion, index) => (
              <p key={index}>{suggestion}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
