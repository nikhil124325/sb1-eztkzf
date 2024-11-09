import React from 'react';
import { Users, Play, Clock } from 'lucide-react';

interface PublicStatsProps {
  totalSessions: number;
  activeSessions: number;
  totalDuration: number;
}

const PublicStats = ({ totalSessions, activeSessions, totalDuration }: PublicStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-800 p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold">Total Sessions</h3>
        </div>
        <p className="text-2xl">{totalSessions}</p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Play className="w-5 h-5 text-green-500" />
          <h3 className="font-semibold">Active Sessions</h3>
        </div>
        <p className="text-2xl">{activeSessions}</p>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold">Total Duration</h3>
        </div>
        <p className="text-2xl">{Math.round(totalDuration / 60)} mins</p>
      </div>
    </div>
  );
};

export default PublicStats;