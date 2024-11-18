import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Analysis } from "@/lib/types";

interface ScoreDisplayProps {
  analysis: Analysis;
}

export function ScoreDisplay({ analysis }: ScoreDisplayProps) {
  const categories = [
    { name: "Sort", key: "sort" },
    { name: "Set in Order", key: "setInOrder" },
    { name: "Shine", key: "shine" },
    { name: "Standardize", key: "standardize" },
    { name: "Sustain", key: "sustain" }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Overall Score</h2>
        <div className="text-4xl font-bold text-primary">
          {analysis.overallScore.toFixed(1)}%
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
        {categories.map(({ name, key }) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{name}</span>
              <span className="font-medium">{analysis.scores[key].toFixed(1)}%</span>
            </div>
            <Progress
              value={analysis.scores[key]}
              className={`h-2 ${getScoreColor(analysis.scores[key])}`}
            />
          </div>
        ))}
      </div>

      {analysis.suggestions && (
        <Card className="p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Improvement Suggestions</h3>
          <p className="text-sm text-gray-600">{analysis.suggestions}</p>
        </Card>
      )}
    </div>
  );
}
