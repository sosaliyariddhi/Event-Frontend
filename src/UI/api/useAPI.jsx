import { useState, useEffect } from "react";

export const useApi = (apiFunction, body) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const { data, error } = await apiFunction(body);
      if (error) {
        throw error;
      }
      setData(data);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiFunction, body]);

  const refetch = () => {
    fetchData();
  };

  return { data, error, refetch };
};
