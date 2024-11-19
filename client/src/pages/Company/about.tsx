import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "wouter"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <span className="text-xl font-bold text-blue-600 cursor-pointer">5S-AI.COM</span>
            </Link>
          </div>
          <Link href="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="prose max-w-none py-8">
            <h1 className="text-4xl font-bold text-center mb-8">About 5S-AI.COM</h1>
            <p className="text-lg mb-6">
              Our mission is to deliver an intelligent, user-friendly AI platform that transforms workplace organization by:

              Automating 5S assessments and audits through computer vision and machine learning
              Providing real-time guidance and actionable insights for workplace optimization
              Empowering teams with data-driven decision making for continuous improvement
              Standardizing best practices while adapting to each unique workspace
              Reducing the time and effort required to implement and maintain 5S principles

              We accomplish this by combining advanced artificial intelligence with practical workplace expertise, making 5S implementation more accessible, consistent, and sustainable for organizations of all sizes. Our platform serves as an ever-present mentor, guide, and partner in the journey toward operational excellence.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8">Our Mission</h2>
            <p>
              To revolutionize workplace organization by seamlessly blending the time-tested principles of 5S methodology with cutting-edge artificial intelligence, empowering organizations to achieve unprecedented levels of efficiency, safety, and continuous improvement. Our vision is to make world-class operational excellence accessible to every workplace, transforming cluttered spaces into optimized environments where teams can perform at their best and innovation can flourish.
            </p>

            <h2 className="text-2xl font-semibold mt-8">Our Vision</h2>
            <p>
              
              Through intelligent automation, real-time insights, and adaptive learning, 5S-AI will serve as the catalyst for a new era of workplace organization - one where sustainable order is not just maintained, but continuously evolved and perfected. We envision a future where every workspace, from small workshops to large manufacturing facilities, can implement and sustain 5S practices with the precision and consistency that only AI-powered guidance can deliver.
            </p>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} 5S-AI.COM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
