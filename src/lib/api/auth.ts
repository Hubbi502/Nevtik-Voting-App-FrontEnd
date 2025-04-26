import { CurrentUser, User } from '../types';
import { cacheUtils } from '../utils/cache';
import { API_BASE_URL, ApiResponse, ApiResponseUsers, defaultHeaders } from './config';

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

  addUser: async (userData: {
    name: string;
    email: string;
    password: string;
    divisi: string;
    role: 'USER' | 'ADMIN';
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/addUser`, {
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

  getUsers: async (
    page: number, 
    USERS_PER_PAGE: number, 
    isVoted: string = "all", 
    divisi: string = "all",
    search: string = ""
  ) => {
    const statusVote = isVoted || "all";
    const division = divisi || "all";

    const response = await fetch(
      `${API_BASE_URL}/auth/users?page=${page}&limit=${USERS_PER_PAGE}&divisi=${division}&statusVote=${statusVote}&search=${search}`, 
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json() as ApiResponseUsers<User[]>;
  
    return data;
  },

  clearUsersCache: async () => {
    await cacheUtils.clearCache();
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/user`, {
      method: 'GET',
      credentials: 'include',
      headers: defaultHeaders,
    });
    return response.json() as Promise<CurrentUser>;
  },

  deleteUser: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/deleteUser`, {
      method: 'DELETE',
      headers: defaultHeaders,
      credentials: 'include',
      body: JSON.stringify({ 
        id: userId
      }),
    });
    return response.json() as Promise<ApiResponse<User>>;
  },

  editUser: async (userId: string, userData: {
    name?: string;
    email?: string;
    password?: string;
    divisi?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/user/${userId}`, {
      method: 'PUT',
      headers: defaultHeaders,
      credentials: 'include',
      body: JSON.stringify({ 
        ...userData
      }),
    });
    return response.json() as Promise<ApiResponse<User>>;
  }
};