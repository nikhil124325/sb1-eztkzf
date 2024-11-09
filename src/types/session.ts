export interface Session {
  id: string;
  userId: string;
  url: string;
  views: number;
  status: 'active' | 'completed';
  startTime: string;
  duration: number;
}