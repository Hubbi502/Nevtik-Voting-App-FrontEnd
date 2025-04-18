export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'nevtik-voting-app-backend-production.up.railway.app';

export const defaultHeaders = {
  'Content-Type': 'application/json',
};

export type ApiResponse<T> = {
  message: string;
  data: T;
};
