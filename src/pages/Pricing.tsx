import React from 'react';
import { Check, Zap, Star, Trophy, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PricingTier = ({ name, price, features, recommended = false, icon: Icon }) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-gray-800 rounded-xl p-6 relative ${recommended ? 'ring-2 ring-blue-500' : ''}`}>
      {recommended && (
        <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full absolute -mt-8">
          MOST POPULAR
        </span>
      )}
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
      <div className="mb-4">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-gray-400">/month</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate('/auth')}
        className={`w-full py-2 px-4 rounded-lg font-medium ${
          recommended
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-700 hover:bg-gray-600'
        } transition-colors`}
      >
        Get Started
      </button>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 19,
      icon: Star,
      features: [
        '1,000 views per month',
        '3 concurrent sessions',
        'Basic analytics',
        'Email support',
        '24-hour retention'
      ]
    },
    {
      name: 'Growth',
      price: 39,
      icon: Rocket,
      features: [
        '3,000 views per month',
        '5 concurrent sessions',
        'Advanced analytics',
        'Priority support',
        '48-hour retention'
      ]
    },
    {
      name: 'Pro',
      price: 79,
      icon: Trophy,
      recommended: true,
      features: [
        '8,000 views per month',
        '10 concurrent sessions',
        'Real-time analytics',
        'Priority support',
        '72-hour retention',
        'Custom viewing patterns'
      ]
    },
    {
      name: 'Business',
      price: 149,
      icon: Zap,
      features: [
        '20,000 views per month',
        '20 concurrent sessions',
        'Advanced analytics dashboard',
        '24/7 support',
        '7-day retention',
        'API access'
      ]
    },
    {
      name: 'Scale',
      price: 299,
      icon: Rocket,
      features: [
        '50,000 views per month',
        'Unlimited sessions',
        'Enterprise dashboard',
        'Dedicated account manager',
        '30-day retention',
        'White-label solution'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-400">Unlock the power of YTUnfreeze</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.slice(0, 6).map((plan) => (
          <PricingTier key={plan.name} {...plan} />
        ))}
      </div>

      <div className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {plans.slice(6, 10).map((plan) => (
            <PricingTier key={plan.name} {...plan} />
          ))}
        </div>
      </div>

      <div className="mt-20 bg-gray-800 rounded-xl p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Need a Custom Solution?</h2>
        </div>
        <p className="text-gray-300 mb-6">
          Looking for higher limits or special features? We offer tailored packages for businesses with specific requirements.
        </p>
        <button
          onClick={() => window.location.href = 'mailto:enterprise@ytunfreeze.com'}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Contact Sales
        </button>
      </div>
    </div>
  );
};

export default Pricing;