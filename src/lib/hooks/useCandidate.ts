import { useState, useEffect } from 'react';
import { candidateApi } from '@/lib/api';
import { Candidate } from '@/lib/types';

export const useCandidate = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await candidateApi.getCandidates();
        if (response.data) {
          const transformedCandidates = response.data.map(candidate => ({
            ...candidate,
            vision: JSON.parse(candidate.vision as string),
            mission: JSON.parse(candidate.mission as string)
          }));
          setCandidates(transformedCandidates);
        }
      } catch (err) {
        setError('Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return { candidates, loading, error };
};