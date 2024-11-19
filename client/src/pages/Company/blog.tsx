import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from 'lucide-react'
import { Link } from "wouter"

export default function BlogPage() {
  const blogPosts = [
    {
      title: "The 5 Frictions of 5S",
      excerpt: "Discover the common obstacles in implementing 5S and how to overcome them for a more efficient workplace.",
      date: "November 25, 2024",
      readTime: "5 min read",
    },
    {
      title: "How AI is Changing Lean Thinking",
      excerpt: "Explore the intersection of artificial intelligence and lean methodologies, and how 5S-AI.COM is leading the charge.",
      date: "November 20, 2024",
      readTime: "7 min read",
    },
    {
      title: "The Beytien Effect: Starting 5S for Purpose",
      excerpt: "Learn about the Beytien approach to 5S implementation and how it can transform your organization's culture.",
      date: "November 15, 2024",
      readTime: "6 min read",
    },
  ]

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
        <h1 className="text-4xl font-bold text-center mb-12">5S-AI.COM Blog</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription>{post.date} • {post.readTime}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full" variant="outline">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            View All Posts
          </Button>
        </div>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} 5S-AI.COM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
