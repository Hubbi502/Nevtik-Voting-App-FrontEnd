import { API_BASE_URL, defaultHeaders, ApiResponse } from './config';
import { VoteStats, VotePercentage } from '../types';

export const voteApi = {
  castVote: async (candidateId: string) => {
    const response = await fetch(`${API_BASE_URL}/vote/add`, {
      method: 'POST',
      headers: defaultHeaders,
      credentials: 'include',
      body: JSON.stringify({ candidates: candidateId }),
    });
    return response.json();
  },

  getVoteStats: async () => {
    const response = await fetch(`${API_BASE_URL}/vote/total`, {
      credentials: 'include',
    });
    return response.json() as Promise<ApiResponse<VoteStats>>;
  },

  getVotePercentages: async () => {
    const response = await fetch(`${API_BASE_URL}/vote/persen`, {
      credentials: 'include',
    });
    return response.json() as Promise<ApiResponse<VotePercentage>>;
  },
};