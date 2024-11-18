import React from 'react';
import { Button } from "@/components/ui/button";

export default function Trial() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Start Your Free Trial</h1>
        <p className="text-xl text-gray-600 mb-8">
          Get started with 3 free evaluations. No credit card required.
        </p>
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
          <Button className="w-full bg-gradient-to-r from-blue-300 to-blue-400 text-black border-2 border-black px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            Begin Your Trial
          </Button>
        </div>
      </div>
    </div>
  );
}
