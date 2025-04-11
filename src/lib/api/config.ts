export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const defaultHeaders = {
  'Content-Type': 'application/json',
};

export type ApiResponse<T> = {
  message: string;
  data: T;
};