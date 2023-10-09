import { useCallback, useState } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyDataFn) => {
    const { url, method, headers, body } = requestConfig;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: method ? method : 'GET',
        headers: headers ? headers : {},
        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) throw new Error('Request failed!');
      const data = await response.json();
      applyDataFn(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setLoading(false);
  }, []);

  return { loading, error, sendRequest };
};

export default useHttp;
