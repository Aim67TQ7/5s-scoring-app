import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, FileQuestion, MessageCircle, Phone, Mail, Video, Users, Search } from 'lucide-react'
import { Link } from "wouter"

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-600 cursor-pointer">5S-AI</span>
            </Link>
          </div>
          <Link href="/contact">
            <Button variant="outline">Contact Support</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to your questions and learn how to get the most out of 5S-AI.
          </p>
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search for help articles..." 
              className="w-full pl-10 pr-4 py-2 text-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileQuestion className="h-5 w-5 text-blue-600" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Find quick answers to common questions about 5S-AI.</CardDescription>
              <Button variant="link" className="mt-4 p-0">View FAQs</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                User Guides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Step-by-step guides to help you use 5S-AI effectively.</CardDescription>
              <Button variant="link" className="mt-4 p-0">Browse Guides</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-blue-600" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Watch video demonstrations of 5S-AI features.</CardDescription>
              <Button variant="link" className="mt-4 p-0">Watch Videos</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Community Forum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Connect with other 5S-AI users and share tips.</CardDescription>
              <Button variant="link" className="mt-4 p-0">Join Discussion</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                Live Chat Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Get real-time assistance from our support team.</CardDescription>
              <Button variant="link" className="mt-4 p-0">Start Chat</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Still need help?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Available Mon-Fri, 9am-5pm EST</p>
              <Button>+1 (555) 123-4567</Button>
            </div>
            <div className="text-center">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">For press inquiries, please contact:</h3>
              <p className="text-gray-600 mb-4">Sarah Johnson, PR Manager</p>
              <Button className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                press@5s-ai.com
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} 5S-AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
