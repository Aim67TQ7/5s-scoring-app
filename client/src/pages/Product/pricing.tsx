import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, User, Users, Building, Globe } from 'lucide-react'
import { Link } from 'wouter'
import api from '@/lib/api'
import { toast } from "@/components/ui/toast"

export default function PricingPage() {
  const handleTryItOut = async (plan: string) => {
    try {
      // Redirect to assessment page with trial info
      window.location.href = '/assessment?trial=true&plan=' + plan;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start trial. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-600 cursor-pointer">5S-AI.COM</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/features"><Button variant="ghost">Features</Button></Link>
            <Link href="/pricing"><Button variant="ghost">Pricing</Button></Link>
            <Link href="/contact"><Button variant="ghost">Contact</Button></Link>
            <Link href="/login"><Button variant="outline">Log In</Button></Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Transform Your Workplace with huge Efficiency Gains</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to revolutionize your workspace with AI-powered 5S. 
            All plans include our core assessment features.
          </p>
          <p className="text-sm font-medium text-blue-600">
            Limited Time Launch Offer: 50% off for first 100 subscribers!
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Starter Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Starter
              </CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold">$99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Up to 50 evaluations/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Basic reporting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>30-day evaluation history</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleTryItOut('starter')}
              >
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>

          {/* Professional Plan */}
          <Card className="relative border-blue-500">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Professional
              </CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold">$399</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Unlimited evaluations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Advanced analytics & AI insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>180-day evaluation history</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleTryItOut('professional')}
              >
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>

          {/* Business Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Business
              </CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold">$999</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Unlimited history</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>24/7 priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => handleTryItOut('business')}
              >
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Enterprise
              </CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold">Custom</span>
                <span className="text-muted-foreground"> pricing</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Everything in Business</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Custom onboarding & training</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Tailored features & integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>On-premise deployment option</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/contact">
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's included in the free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our 3-day free trial gives you full access to all features. Experience the power of AI-driven 5S assessment with no commitment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I switch plans later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, upgrade or downgrade anytime. Changes take effect on your next billing cycle with no penalties.
                </p>
              </CardContent>
            </Card>

            
          </div>
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
