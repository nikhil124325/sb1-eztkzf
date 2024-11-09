export interface User {
  id: string;
  email: string;
  viewsRemaining: number;
  subscription: string;
  isAdmin?: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}