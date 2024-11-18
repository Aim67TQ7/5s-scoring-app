export interface Analysis {
  location: string;
  department: string;
  workStation: string;
  overallScore: number;
  scores: {
    sort: number;
    setInOrder: number;
    shine: number;
    standardize: number;
    sustain: number;
  };
  suggestions?: string;
  imageUrls: string[];
}

export interface AnalysisResult {
  id: number;
  createdAt: Date;
  scores: Analysis;
  imageUrls: string[];
}
