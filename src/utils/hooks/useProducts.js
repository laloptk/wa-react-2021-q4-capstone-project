import useApiData from "./useApiData";

export function useProducts(currentPage = 1) {
  const urlParts = {
    slug: '/documents/search',
    queryParams: {
        q: [
          encodeURIComponent('[[at(document.type, "product")]]')
        ],
        page: currentPage,
        lang: 'en-us',
        pageSize: '16'
    }
  }

  const{data, isLoading} = useApiData(urlParts);

  return {products: data, productsLoading: isLoading};
}