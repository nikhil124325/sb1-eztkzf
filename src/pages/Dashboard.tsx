import React, { useState, useEffect } from 'react';
import { Play, Settings, Activity, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Session } from '../types/session';
import { z } from 'zod';

const urlSchema = z.string().url();

const Dashboard = () => {
  const { user } = useAuth();
  const [url, setUrl] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    try {
      if (!user) return;
      const data = await mockApi.getSessions(user.id);
      setSessions(data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      setError('Failed to load sessions');
    }
  };

  const startViewing = async () => {
    try {
      setError('');
      
      if (!user) {
        setError('Please log in to start a session');
        return;
      }

      // Validate URL
      urlSchema.parse(url);

      // Check remaining views
      if (user.viewsRemaining <= 0) {
        setError('No views remaining. Please upgrade your plan.');
        return;
      }

      setIsRunning(true);
      
      await mockApi.startSession(user.id, url);
      await fetchSessions();
      setUrl('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid URL');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">Welcome back, {user?.email}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Views Remaining</h3>
            <p className="text-2xl text-blue-500">{user?.viewsRemaining}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Active Sessions</h3>
            <p className="text-2xl text-blue-500">{sessions.filter(s => s.status === 'active').length}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Total Views</h3>
            <p className="text-2xl text-blue-500">{sessions.reduce((acc, s) => acc + s.views, 0)}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Start New Session</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <div className="flex gap-4">
          <input
            type="url"
            placeholder="Enter video URL"
            className="flex-1 bg-gray-700 rounded-lg px-4 py-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={startViewing}
            disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running...' : 'Start'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Active Sessions
          </h2>
          <div className="space-y-4">
            {sessions.length === 0 ? (
              <p className="text-gray-400">No active sessions</p>
            ) : (
              sessions.map((session) => (
                <div key={session.id} className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-300 mb-2">{session.url}</p>
                  <div className="flex justify-between text-sm">
                    <span>Views: {session.views}</span>
                    <span className={session.status === 'active' ? 'text-blue-500' : 'text-gray-400'}>
                      {session.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">View Duration (seconds)</label>
              <input
                type="number"
                className="bg-gray-700 rounded-lg px-4 py-2 w-full"
                min="30"
                defaultValue="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Concurrent Sessions</label>
              <input
                type="number"
                className="bg-gray-700 rounded-lg px-4 py-2 w-full"
                min="1"
                max="10"
                defaultValue="1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;