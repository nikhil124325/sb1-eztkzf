import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Shield, Zap, Trophy } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Automate Your Video Views
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Boost your video engagement with our AI-powered automation platform
        </p>
        <button
          onClick={() => navigate('/auth')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
        >
          Get Started Free
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-gray-800 p-6 rounded-xl">
          <Play className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Multi-Platform Support</h3>
          <p className="text-gray-400">
            Support for all major video platforms with automated viewing capabilities
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <Shield className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
          <p className="text-gray-400">
            Enterprise-grade security with advanced encryption and privacy features
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <Trophy className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Free Trial</h3>
          <p className="text-gray-400">
            100 free views for new users to test our powerful platform
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-8 mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">1</div>
            <h4 className="font-semibold mb-2">Sign Up</h4>
            <p className="text-gray-400">Create your account in seconds</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">2</div>
            <h4 className="font-semibold mb-2">Add URL</h4>
            <p className="text-gray-400">Input your video URL</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">3</div>
            <h4 className="font-semibold mb-2">Configure</h4>
            <p className="text-gray-400">Set your viewing preferences</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">4</div>
            <h4 className="font-semibold mb-2">Watch Growth</h4>
            <p className="text-gray-400">Monitor your video performance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;