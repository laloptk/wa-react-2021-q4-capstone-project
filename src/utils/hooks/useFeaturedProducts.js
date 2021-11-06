import useApiData from "./useApiData";

export function useFeaturedProducts() {
  const urlParts = {
    slug: '/documents/search',
    queryParams: {
        q: [
          '[[at(document.type, "product")]]',
          '[[at(document.tags, ["Featured"])]]'
        ],
        lang: 'en-us',
        pageSize: '16'
    }
  }

  const{data, isLoading} = useApiData(urlParts);

  return {products: data, productsLoading: isLoading};
}