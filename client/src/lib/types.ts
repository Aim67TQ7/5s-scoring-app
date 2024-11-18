export interface Analysis {
  overallScore: number;
  scores: {
    sort: number;
    setInOrder: number;
    shine: number;
    standardize: number;
    sustain: number;
  };
  suggestions?: string;
}

export interface AnalysisResult {
  id: number;
  createdAt: Date;
  scores: Analysis;
  imageUrls: string[];
}
