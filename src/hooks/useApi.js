// hooks/useApi.js
import { useState, useCallback } from 'react';
import axios from 'axios';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = useCallback(async (url, method, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
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
  }, []); // Thêm useCallback để ổn định hàm

  return { apiCall, loading, error };
};