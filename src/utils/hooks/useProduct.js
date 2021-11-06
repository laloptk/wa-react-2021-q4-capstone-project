import useApiData from "./useApiData";

export function useProduct(productId) {
  const urlParts = {
    slug: '/documents/search',
    queryParams: {
        q: [
          `[[:d = at(document.id,"${productId}") ]]`
        ],
        lang: 'en-us',
        pageSize: '30'
    }
  }

  const {data, isLoading} = useApiData(urlParts);

  return {product: data, productLoading: isLoading};
}