import { useState } from 'react';
import axios from 'axios';

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const signUp = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/register', formData);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Error signing up');
    }
  };

  return { signUp, loading, error };
};
