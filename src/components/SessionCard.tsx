import React from 'react';
import { Play, Clock, Mail } from 'lucide-react';

interface SessionCardProps {
  url: string;
  email: string;
  duration: number;
  startTime: string;
  isActive: boolean;
}

const SessionCard = ({ url, email, duration, startTime, isActive }: SessionCardProps) => {
  const videoId = url.split('v=')[1] || '';
  const thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden">
      <div className="relative">
        <img src={thumbnail} alt="Video thumbnail" className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-sm ${
            isActive 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-gray-500/20 text-gray-400'
          }`}>
            {isActive ? 'Active' : 'Completed'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm">
          <Mail className="w-4 h-4" />
          <span>{email}</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}s</span>
          </div>
          <div className="flex items-center gap-1">
            <Play className="w-4 h-4" />
            <span>{new Date(startTime).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;