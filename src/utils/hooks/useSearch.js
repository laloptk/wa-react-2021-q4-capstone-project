import useApiData from "./useApiData";

export function useSearch(query, page = 1) {
  const urlParts = {
    slug: '/documents/search',
    queryParams: {
        q: [
          '[[at(document.type, "product")]]',
          `[[fulltext(document, "${query}")]]`
        ],
        page: page,
        lang: 'en-us',
        pageSize: '20'
    }
  }

  const{data, isLoading} = useApiData(urlParts);

  return {search: data, searchLoading: isLoading};
}