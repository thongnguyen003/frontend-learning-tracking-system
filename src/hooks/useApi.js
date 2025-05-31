import { useState, useCallback } from 'react';
import api from './api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = useCallback(async (url, method, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api({
        url,
        method,
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }, []);

  return { apiCall, loading, error };
};
