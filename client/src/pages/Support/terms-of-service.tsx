import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "wouter"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-600 cursor-pointer">5S-AI.COM</span>
            </Link>
          </div>
          <Link href="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using 5S-AI.COM, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service.</p>

            <h2>2. Description of Service</h2>
            <p>5S-AI.COM provides a 5S evaluation tool for workplace organization and hazard management. Our service includes features for assessment, reporting, and progress tracking.</p>

            <h2>11. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at support@5s-ai.com</p>
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
