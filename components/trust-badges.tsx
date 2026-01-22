'use client';

import { Shield, Award, RotateCcw, Zap } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: '30-Day Money Back',
      description: 'Guarantee',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure',
      description: 'SSL Encrypted',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'ISO Certified',
      description: 'Quality Assured',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Fast Support',
      description: '24/7 Available',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <div
          key={index}
          className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 text-center hover:shadow-lg transition-all"
        >
          <div className="text-blue-600 mb-2 flex justify-center">{badge.icon}</div>
          <p className="font-bold text-gray-900 text-sm">{badge.title}</p>
          <p className="text-xs text-gray-600">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}
