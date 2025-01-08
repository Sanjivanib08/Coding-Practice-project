import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom Hook to fetch data from a given URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {Object} The fetched data, loading state, and any errors.
 */
const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
