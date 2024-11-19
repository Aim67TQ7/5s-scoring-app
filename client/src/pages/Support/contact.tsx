import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">Have questions about 5S-AI? We're here to help.</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Pricing</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
              </div>

              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Send Message
              </button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">rojec@nov8v.ai</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Text</h3>
            <p className="text-gray-600">+1 (316) 765-2144</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (316) 247-2246</p>
          </div>

        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize workplace organization by seamlessly blending the time-tested principles of 5S methodology with cutting-edge artificial intelligence, empowering organizations to achieve unprecedented levels of efficiency, safety, and continuous improvement. Our vision is to make world-class operational excellence accessible to every workplace, transforming cluttered spaces into optimized environments where teams can perform at their best and innovation can flourish.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our mission is to deliver an intelligent, user-friendly AI platform that transforms workplace organization by:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Automating 5S assessments and audits through computer vision and machine learning</li>
                <li>Providing real-time guidance and actionable insights for workplace optimization</li>
                <li>Empowering teams with data-driven decision making for continuous improvement</li>
                <li>Standardizing best practices while adapting to each unique workspace</li>
                <li>Reducing the time and effort required to implement and maintain 5S principles</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
