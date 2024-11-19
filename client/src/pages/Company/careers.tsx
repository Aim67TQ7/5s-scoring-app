import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "wouter"

export default function CareersPage() {
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
            <h1 className="text-4xl font-bold text-center mb-8">Careers at 5SHAZ.COM</h1>
            <p className="text-lg mb-6">
              Join our team and help transform workplace safety and organization worldwide.
            </p>

            <h2 className="text-2xl font-semibold mt-8">Open Positions</h2>
            <div className="space-y-6 mt-4">
              <div className="border-b pb-4">
                <h3 className="text-xl font-medium">Senior Full Stack Developer</h3>
                <p className="text-gray-600 mt-2">
                  Help build and scale our AI-powered assessment platform.
                </p>
                <Button className="mt-4">Apply Now</Button>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-xl font-medium">AI/ML Engineer</h3>
                <p className="text-gray-600 mt-2">
                  Develop and improve our AI-based assessment algorithms.
                </p>
                <Button className="mt-4">Apply Now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} 5SHAZ.COM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
