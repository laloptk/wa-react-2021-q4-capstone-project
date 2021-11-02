import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import useLatestAPI from './useLatestApi';

export function useSearch(query, page = 1) {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [search, setSearch] = useState(() => ({
    data: {},
    isLoading: true,
  }));
  const urlComponent = encodeURIComponent(`[[fulltext(document, "${query}")]]`);

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getSearch() {
      try {
        setSearch({ data: {}, isLoading: true });

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "product")]]'
          )}&q=${urlComponent}&page=${page}&lang=en-us&pageSize=20`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        setSearch({ data, isLoading: false });
      } catch (err) {
        setSearch({ data: {}, isLoading: false });
        console.error(err);
      }
    }

    getSearch();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading, urlComponent, page]);
 
  return search;
}