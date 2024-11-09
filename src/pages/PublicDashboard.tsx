import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import SessionCard from '../components/SessionCard';
import PublicStats from '../components/PublicStats';

interface Session {
  id: string;
  url: string;
  email: string;
  duration: number;
  startTime: string;
  isActive: boolean;
}

const PublicDashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/sessions/public');
      if (response.ok) {
        const data = await response.json();
        setSessions(data);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = sessions.filter(session =>
    session.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalSessions: sessions.length,
    activeSessions: sessions.filter(s => s.isActive).length,
    totalDuration: sessions.reduce((acc, s) => acc + s.duration, 0)
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Live Sessions</h1>
      
      <PublicStats {...stats} />

      <div className="my-8">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email or video URL..."
            className="w-full bg-gray-800 rounded-xl pl-10 pr-4 py-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <SessionCard key={session.id} {...session} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400">
            No sessions found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicDashboard;