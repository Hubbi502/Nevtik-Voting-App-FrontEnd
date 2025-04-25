import { API_BASE_URL, defaultHeaders, ApiResponse } from './config';
import { User, CurrentUser } from '../types';
import { cacheUtils } from '../utils/cache';

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
    const data = await response.json() as ApiResponse<User>;
    if (data.message === 'User successfully added') {
      await cacheUtils.clearCache(); // Clear cache when new user is added
    }
    return data;
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
    const cacheKey = cacheUtils.generateCacheKey(page, USERS_PER_PAGE, isVoted, divisi, undefined, undefined, search);
    
    // Try to get data from cache first
    const cachedData = await cacheUtils.getCacheData<ApiResponse<User[]>>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // If no cache, fetch from API
    const response = await fetch(
      `${API_BASE_URL}/auth/users?page=${page}&limit=${USERS_PER_PAGE}&divisi=${divisi}&statusVote=${isVoted}&search=${search}`, 
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const data = await response.json() as ApiResponse<User[]>;
    
    // Cache the response
    if (data.message === 'success') {
      await cacheUtils.setCacheData(cacheKey, data);
    }
    
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
        id : userId
      }),
    });
    const data = await response.json() as ApiResponse<User>;
    if (data.message === 'success') {
      await cacheUtils.clearCache(); // Clear cache when user is deleted
    }
    return data;
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
    const data = await response.json() as ApiResponse<User>;
    if (data.message === 'success') {
      await cacheUtils.clearCache(); // Clear cache when user is updated
    }
    return data;
  }

};