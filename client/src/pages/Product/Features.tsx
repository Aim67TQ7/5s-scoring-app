  import React from 'react';
  import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
  import { CheckCircle2, AlertCircle, FileSpreadsheet, BarChart2, Camera, ClipboardList, Share2, LineChart, ImageIcon, TrendingUp } from 'lucide-react';
  import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  // Sample data for the progress chart
  const sampleData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 72 },
    { month: 'Apr', score: 75 },
    { month: 'May', score: 82 },
    { month: 'Jun', score: 88 },
  ];

  export default function FeaturesPage() {
    return (
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="space-y-4">
          {/* Page Header */}
          <h1 className="text-3xl font-bold">Features</h1>
          <p className="text-muted-foreground">
            Track, compare, and showcase your workplace improvements with our comprehensive 5S and Hazard Evaluation tool.
          </p>

          {/* Progress Tracking Section */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#2563eb" name="Overall Score" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Before/After Comparisons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Before/After Comparisons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Side-by-side photo comparisons</li>
                  <li>• Score delta visualization</li>
                  <li>• Improvement highlights</li>
                  <li>• Time-stamped progress tracking</li>
                  <li>• Downloadable comparison reports</li>
                </ul>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="aspect-video bg-slate-200 rounded flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Before</p>
                    </div>
                    <p className="text-sm mt-2 text-center">Score: 65</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="aspect-video bg-slate-200 rounded flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">After</p>
                    </div>
                    <p className="text-sm mt-2 text-center">Score: 88</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Progress Sharing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Optional public project showcase</li>
                  <li>• Privacy controls for sensitive areas</li>
                  <li>• Share success stories</li>
                  <li>• Export improvement journey</li>
                  <li>• Team collaboration features</li>
                </ul>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Project Visibility</span>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Public</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Private</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" />
                  Advanced Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Trend analysis over time</li>
                  <li>• Department comparisons</li>
                  <li>• Custom date range reports</li>
                  <li>• Score breakdown analytics</li>
                  <li>• ROI calculations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Reporting */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  Comprehensive Reporting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Progress timeline reports</li>
                  <li>• Before/After documentation</li>
                  <li>• Multi-format exports</li>
                  <li>• Custom report generation</li>
                  <li>• Shareable dashboards</li>
                </ul>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="md:col-span-2 bg-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <AlertCircle className="h-5 w-5" />
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This tool is designed to support workplace organization and basic hazard identification through 5S principles. 
                  It is not a replacement for professional safety assessments or audits. When sharing progress publicly, ensure no 
                  sensitive or confidential information is included. Always ensure proper safety protocols are followed and consult 
                  qualified safety professionals for comprehensive safety evaluations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
