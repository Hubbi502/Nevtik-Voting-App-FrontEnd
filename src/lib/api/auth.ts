import { API_BASE_URL, defaultHeaders, ApiResponse } from './config';
import { User } from '../types';

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    divisi: string;
    role: 'USER' | 'ADMIN';
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: defaultHeaders,
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    return response.json() as Promise<ApiResponse<User>>;
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },

  getUsers: async (page: number, USERS_PER_PAGE: number) => {
    const response = await fetch(`${API_BASE_URL}/auth/users?page=${page}&limit=${USERS_PER_PAGE}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json() as Promise<ApiResponse<User[]>>;
  },


};