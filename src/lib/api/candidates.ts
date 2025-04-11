import { API_BASE_URL, defaultHeaders, ApiResponse } from './config';
import { Candidate } from '../types';

export const candidateApi = {
  getCandidates: async () => {
    const response = await fetch(`${API_BASE_URL}/candidates`, {
      credentials: 'include',
    });
    return response.json() as Promise<ApiResponse<Candidate[]>>;
  },

  createCandidate: async (candidateData: Omit<Candidate, 'id' | 'image'>) => {
    const response = await fetch(`${API_BASE_URL}/candidates/add`, {
      method: 'POST',
      headers: defaultHeaders,
      credentials: 'include',
      body: JSON.stringify(candidateData),
    });
    return response.json() as Promise<ApiResponse<Candidate>>;
  },

  uploadImage: async (candidateId: string, imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/candidates/upload/image/${candidateId}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    return response.json();
  },

  deleteCandidate: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return response.json();
  },

  getVoteCounts: async () => {
    const response = await fetch(`${API_BASE_URL}/candidates/votes`, {
      credentials: 'include',
    });
    return response.json();
  },

  getVotePercentages: async () => {
    const response = await fetch(`${API_BASE_URL}/candidates/votes/persen`, {
      credentials: 'include',
    });
    return response.json();
  },

  getWinner: async () => {
    const response = await fetch(`${API_BASE_URL}/candidates/votes/winner`, {
      credentials: 'include',
    });
    return response.json();
  },
};