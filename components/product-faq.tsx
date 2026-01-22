'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'What is the warranty period?',
    answer: 'Our products come with a comprehensive warranty period. Please check the product details for specific warranty information. Extended warranty options are also available.',
  },
  {
    id: 2,
    question: 'How long does delivery take?',
    answer: 'Delivery times vary by product and location. Standard delivery is 3-5 business days. Express delivery options are available for select products.',
  },
  {
    id: 3,
    question: 'Can I customize the product?',
    answer: 'Yes, many of our products offer customization options. Please contact our sales team to discuss your specific requirements.',
  },
  {
    id: 4,
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for most products. Items must be in original condition with all packaging and documentation.',
  },
  {
    id: 5,
    question: 'Do you offer bulk discounts?',
    answer: 'Yes, we offer attractive bulk discounts for orders above certain quantities. Please contact our sales team for a custom quote.',
  },
  {
    id: 6,
    question: 'Is technical support available?',
    answer: 'We provide comprehensive technical support via email, phone, and live chat. Our support team is available 24/7 for enterprise customers.',
  },
];

export function ProductFAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>

      {faqs.map((faq) => (
        <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
          <button
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold text-gray-900 text-left">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                openId === faq.id ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openId === faq.id && (
            <div className="px-6 py-4 bg-white border-t border-gray-200">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
