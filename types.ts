
export interface User {
  username: string;
  passcode: string;
}

export interface Paper {
  id: string;
  title: string;
  author: string;
  abstract: string;
  uploadDate: string;
  fileUrl: string; // Base64 or Blob URL for demo
  type: 'Journal' | 'Conference' | 'Preprint' | 'Other';
  keywords: string[];
}

export enum AppScreen {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  VIEWER = 'VIEWER'
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}
