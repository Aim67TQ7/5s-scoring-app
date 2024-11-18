'use client'

import React, { useState } from 'react'
import { Link } from 'wouter'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, LineChart, CheckCircle, Camera, Menu, X, Play } from 'lucide-react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-gray-900">
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-gray-900">5S-AI.COM</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-zinc-700 hover:text-gray-900">Features</Button>
            <Button variant="ghost" className="text-zinc-700 hover:text-gray-900">About</Button>
            <Button variant="ghost" className="text-zinc-700 hover:text-gray-900">Contact</Button>
            <Button className="bg-gradient-to-r from-blue-300 to-blue-400 text-black border-2 border-black shadow-md hover:shadow-lg transition-all duration-300">
              Log In
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                <Button variant="ghost" className="w-full justify-start text-zinc-700">Features</Button>
                <Button variant="ghost" className="w-full justify-start text-zinc-700">About</Button>
                <Button variant="ghost" className="w-full justify-start text-zinc-700">Contact</Button>
                <Button className="w-full justify-center bg-gradient-to-r from-blue-300 to-blue-400 text-black border-2 border-black shadow-md hover:shadow-lg transition-all duration-300">
                  Log In
                </Button>
              </div>
            </nav>
          </div>
        )}
      </nav>

      <header className="container mx-auto px-4 py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full blur-xl opacity-75"></div>
              <Play className="w-20 h-20 text-gray-900" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Transform Your Workplace Assessment
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Elevate your 5S evaluations with AI-powered insights. 
            Achieve precision, efficiency, and continuous improvement.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-32" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-3xl p-12 text-center shadow-xl border border-zinc-200">
            <h2 id="cta-heading" className="text-3xl font-semibold text-gray-900 mb-6">
              AI Clarity. Shop Floor Reality.
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get Fast Results. Eliminate Inefficient, biased 5S scoring.
            </p>
            <div className="space-y-4">
              <Link href="/trial">
                <Button size="lg" className="bg-gradient-to-r from-blue-300 to-blue-400 text-black border-2 border-black px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                  Start Free Trial
                </Button>
              </Link>
              <p className="text-gray-600 mt-4">No credit card required • 3 Free Evaluations</p>
            </div>
          </div>
        </section>

        <section className="mb-32" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-3xl font-semibold text-center text-gray-900 mb-16">Why Choose Our Platform</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "AI-Powered Scoring", 
                description: "Eliminate bias with intelligent evaluations",
                icon: CheckCircle 
              },
              { 
                title: "Real-time Efficiency", 
                description: "75% faster assessment completion",
                icon: Clock 
              },
              { 
                title: "Advanced Analytics", 
                description: "Track improvements with precision",
                icon: LineChart 
              },
              { 
                title: "Visual Intelligence", 
                description: "Smart workplace documentation",
                icon: Camera 
              },
            ].map((feature, index) => (
              <Card key={index} className="border border-zinc-200 hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="bg-gradient-to-br from-blue-100 to-blue-100 p-3 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="mt-4 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-32" aria-labelledby="release-heading">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 text-center shadow-xl border border-blue-200">
            <h2 id="release-heading" className="text-3xl font-semibold text-gray-900 mb-6">
              Coming Soon: Official Release
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              All features of the app will be available on Dec. 1, 2024.
            </p>
            <div className="space-y-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-300 to-blue-400 text-black border-2 border-black px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                Get 50% off for 3 months
              </Button>
              <p className="text-gray-500">
                Sign up before Dec. 1 to claim this special offer!
              </p>
            </div>
          </div>
        </section>

        <section className="mb-32" aria-labelledby="process-heading">
          <h2 id="process-heading" className="text-3xl font-semibold text-center text-gray-900 mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Capture", description: "Upload or take photos of your workspace" },
              { step: "02", title: "Analyze", description: "AI evaluates 5S compliance" },
              { step: "03", title: "Improve", description: "Get actionable insights and recommendations" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="bg-gradient-to-br from-blue-100 to-blue-100 rounded-2xl p-6 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-zinc-50 py-16 mt-32 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5S-AI.com</h2>
              <p className="text-gray-600">
                Pioneering the future of workplace organization and efficiency.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Case Studies", "Documentation"]
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Privacy", "Terms"]
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-blue-600">{link}</Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-200 mt-16 pt-8 text-center text-gray-600">
            <p>&copy; 2024 5S-AI.COM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}