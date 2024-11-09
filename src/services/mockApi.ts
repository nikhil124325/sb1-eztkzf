import { User } from '../types/auth';
import { Session } from '../types/session';

// Simulated delay to mimic API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user storage
const users: Record<string, { password: string; user: User }> = {
  'demo@example.com': {
    password: 'Demo123!',
    user: {
      id: '1',
      email: 'demo@example.com',
      viewsRemaining: 100,
      subscription: 'free',
      isAdmin: false
    }
  }
};

// Mock token storage
const tokens = new Set<string>();

// Mock sessions storage
let sessions: Session[] = [
  {
    id: '1',
    userId: '1',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    views: 45,
    status: 'active',
    startTime: new Date().toISOString(),
    duration: 30
  },
  {
    id: '2',
    userId: '1',
    url: 'https://www.youtube.com/watch?v=y6120QOlsfU',
    views: 23,
    status: 'completed',
    startTime: new Date(Date.now() - 3600000).toISOString(),
    duration: 45
  }
];

export const mockApi = {
  async login(email: string, password: string) {
    await delay(500);

    const userRecord = users[email];
    if (!userRecord || userRecord.password !== password) {
      throw new Error('Invalid email or password');
    }

    const token = `mock-token-${Date.now()}`;
    tokens.add(token);

    return {
      token,
      user: userRecord.user
    };
  },

  async signup(email: string, password: string) {
    await delay(500);

    if (users[email]) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: `${Object.keys(users).length + 1}`,
      email,
      viewsRemaining: 100,
      subscription: 'free',
      isAdmin: false
    };

    users[email] = { password, user: newUser };

    const token = `mock-token-${Date.now()}`;
    tokens.add(token);

    return {
      token,
      user: newUser
    };
  },

  async validateToken(token: string) {
    await delay(200);

    if (!tokens.has(token)) {
      throw new Error('Invalid token');
    }

    const email = Object.keys(users).find(email => 
      users[email].user.id === token.split('-')[2]
    );

    if (!email) {
      throw new Error('User not found');
    }

    return users[email].user;
  },

  async logout(token: string) {
    await delay(200);
    tokens.delete(token);
  },

  async getSessions(userId: string) {
    await delay(300);
    return sessions.filter(session => session.userId === userId);
  },

  async startSession(userId: string, url: string) {
    await delay(300);

    const newSession: Session = {
      id: `${sessions.length + 1}`,
      userId,
      url,
      views: 0,
      status: 'active',
      startTime: new Date().toISOString(),
      duration: 30
    };

    sessions.push(newSession);
    return newSession;
  },

  async getPublicSessions() {
    await delay(300);
    return sessions.map(session => ({
      ...session,
      email: users[Object.keys(users).find(email => 
        users[email].user.id === session.userId
      ) || '']?.user.email || 'unknown'
    }));
  }
};