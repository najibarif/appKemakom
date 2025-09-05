export interface Alumni {
  id: number;
  name: string;
  year: string;
  company: string;
  position: string;
  location: string;
  thesis: string;
  created_at: string;
  updated_at: string;
}

export interface Angkatan {
  id: number;
  year: string;
  total: number;
  active: number;
  achievements: string[];
  created_at: string;
  updated_at: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Modul {
  id: number;
  title: string;
  description: string;
  category: string;
  downloads: number;
  views: number;
  date: string;
  file: string;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  type: string;
  title: string;
  info: string;
  created_at: string;
  updated_at: string;
}

export interface Timeline {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expires_at: string;
}