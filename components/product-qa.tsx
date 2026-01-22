'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle, ThumbsUp } from 'lucide-react';

interface QAItem {
  id: number;
  question: string;
  answer: string;
  author: string;
  helpful: number;
  date: string;
}

const qaItems: QAItem[] = [
  {
    id: 1,
    question: 'What is the warranty period?',
    answer: 'This product comes with a 2-year comprehensive warranty covering manufacturing defects and hardware failures.',
    author: 'MEGABOTICS Support',
    helpful: 45,
    date: '1 week ago',
  },
  {
    id: 2,
    question: 'Is this compatible with existing systems?',
    answer: 'Yes, it has universal compatibility with most standard interfaces and can be integrated with existing setups.',
    author: 'MEGABOTICS Support',
    helpful: 32,
    date: '2 weeks ago',
  },
  {
    id: 3,
    question: 'What is the battery life?',
    answer: 'The battery provides up to 60 minutes of continuous operation under normal conditions.',
    author: 'MEGABOTICS Support',
    helpful: 28,
    date: '3 weeks ago',
  },
];

export function ProductQA() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState('');

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Questions & Answers</h3>

      {/* Ask Question */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Have a question? Ask the community
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask your question here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm">
            Ask
          </button>
        </div>
      </div>

      {/* Q&A List */}
      <div className="space-y-3">
        {qaItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
            <button
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 text-left">
                <MessageCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="font-semibold text-gray-900">{item.question}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  openId === item.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openId === item.id && (
              <div className="px-4 py-4 bg-white border-t border-gray-200 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Answered by {item.author}</p>
                  <p className="text-gray-700">{item.answer}</p>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-600">Was this helpful?</span>
                  <button className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-all">
                    <ThumbsUp className="w-4 h-4" />
                    {item.helpful}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
