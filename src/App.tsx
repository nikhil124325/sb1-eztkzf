import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Bot, Shield, Users } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Terms from './pages/Terms';
import Pricing from './pages/Pricing';
import PublicDashboard from './pages/PublicDashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/live" element={<PublicDashboard />} />
          </Routes>
          
          <footer className="bg-gray-900 mt-20 py-10">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Bot className="w-6 h-6 text-blue-500" />
                    <h3 className="text-xl font-bold">ViewBot AI</h3>
                  </div>
                  <p className="text-gray-400">
                    Automated video viewing solution with advanced AI technology.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-500" />
                    Security
                  </h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>End-to-end encryption</li>
                    <li>Advanced fraud detection</li>
                    <li>24/7 monitoring</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    Support
                  </h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>24/7 Customer service</li>
                    <li>Documentation</li>
                    <li>FAQ</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                <p>© 2024 ViewBot AI. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;