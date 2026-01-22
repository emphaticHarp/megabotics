'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Check, X, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams',
      monthlyPrice: 29999,
      annualPrice: 299990,
      popular: false,
      features: [
        { name: 'Up to 5 robots', included: true },
        { name: 'Basic monitoring', included: true },
        { name: 'Email support', included: true },
        { name: 'API access', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom integrations', included: false },
        { name: 'Dedicated support', included: false },
      ],
      cta: 'Get Started',
    },
    {
      name: 'Professional',
      description: 'For growing businesses',
      monthlyPrice: 79999,
      annualPrice: 799990,
      popular: true,
      features: [
        { name: 'Up to 50 robots', included: true },
        { name: 'Advanced monitoring', included: true },
        { name: 'Priority email & chat support', included: true },
        { name: 'API access', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Custom integrations', included: false },
        { name: 'Dedicated support', included: false },
      ],
      cta: 'Start Free Trial',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 199999,
      annualPrice: 1999990,
      popular: false,
      features: [
        { name: 'Unlimited robots', included: true },
        { name: 'Real-time monitoring', included: true },
        { name: '24/7 phone & chat support', included: true },
        { name: 'Full API access', included: true },
        { name: 'Advanced analytics & reporting', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Dedicated account manager', included: true },
      ],
      cta: 'Contact Sales',
    },
  ];

  const faqs = [
    {
      q: 'Can I change my plan anytime?',
      a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.',
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes, all plans come with a 14-day free trial. No credit card required.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, bank transfers, and digital wallets.',
    },
    {
      q: 'Do you offer discounts for annual billing?',
      a: 'Yes, save 15% when you choose annual billing instead of monthly.',
    },
    {
      q: 'What if I need more than the plan limit?',
      a: 'Contact our sales team for custom enterprise solutions tailored to your needs.',
    },
    {
      q: 'Is there a setup fee?',
      a: 'No, there are no setup fees. You only pay for the plan you choose.',
    },
  ];

  const displayPrice = (monthlyPrice: number) => {
    const price = billingCycle === 'monthly' ? monthlyPrice : monthlyPrice * 12 * 0.85;
    return Math.round(price).toLocaleString('en-IN');
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Choose the perfect plan for your robotics needs. Scale as you grow.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-4 bg-white rounded-full p-2 shadow-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Annual
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Save 15%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl shadow-lg overflow-hidden transition-all ${
                  plan.popular
                    ? 'ring-2 ring-blue-600 transform scale-105'
                    : 'hover:shadow-xl'
                } ${plan.popular ? 'bg-gradient-to-br from-blue-50 to-cyan-50' : 'bg-white'}`}
              >
                {plan.popular && (
                  <div className="bg-blue-600 text-white py-2 text-center font-bold text-sm">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">₹{displayPrice(plan.monthlyPrice)}</span>
                      <span className="text-gray-600">
                        {billingCycle === 'monthly' ? '/month' : '/year'}
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-sm text-green-600 mt-2">Save ₹{Math.round(plan.monthlyPrice * 12 * 0.15).toLocaleString('en-IN')} per year</p>
                    )}
                  </div>

                  <Button
                    className={`w-full rounded-full py-3 font-semibold mb-8 flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Detailed Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Starter</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Professional</th>
                    <th className="text-center py-4 px-4 font-bold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Number of Robots', starter: '5', pro: '50', ent: 'Unlimited' },
                    { feature: 'Monitoring', starter: 'Basic', pro: 'Advanced', ent: 'Real-time' },
                    { feature: 'Support', starter: 'Email', pro: 'Priority', ent: '24/7 Phone' },
                    { feature: 'API Access', starter: '❌', pro: '✓', ent: '✓' },
                    { feature: 'Analytics', starter: '❌', pro: '✓', ent: '✓' },
                    { feature: 'Custom Integrations', starter: '❌', pro: '❌', ent: '✓' },
                    { feature: 'Dedicated Manager', starter: '❌', pro: '❌', ent: '✓' },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-semibold text-gray-900">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-gray-600">{row.starter}</td>
                      <td className="py-4 px-4 text-center text-gray-600">{row.pro}</td>
                      <td className="py-4 px-4 text-center text-gray-600">{row.ent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your 14-day free trial today. No credit card required.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-3 font-semibold">
                Start Free Trial
              </Button>
              <Button className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 py-3 font-semibold">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
