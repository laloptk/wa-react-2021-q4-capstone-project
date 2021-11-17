import { useState, useEffect } from 'react';
import useApiUrl from './useApiUrl';

function useApiData(urlParts) {
  const [data, setData] = useState(() => ({
    data: {},
    isLoading: true,
  }));

  const {apiUrl, isLoading} = useApiUrl(urlParts);

  useEffect(() => {

    if(!apiUrl || isLoading) {
        return () => {}
    }

    const controller = new AbortController();

    async function getData() {
      try {
        setData({ data: {}, isLoading: true });

        const response = await fetch(
          `${apiUrl}`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        setData({ data, isLoading: false });
      } catch (err) {
        setData({ data: {}, isLoading: false });
        console.error(err);
      }
    }

    getData();

    return () => {
      controller.abort();
    };
  }, [apiUrl, isLoading]);

  return data;
}

export default useApiData;