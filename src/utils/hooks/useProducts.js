import useApiData from "./useApiData";

export function useProducts(currentPage = 1, filters = []) {
  const urlParts = {
    slug: '/documents/search',
    queryParams: {
        q: [
          encodeURIComponent('[[at(document.type, "product")]]'),
        ],
        page: currentPage,
        lang: 'en-us',
        pageSize: '16'
    }
  }

  if(filters.length > 0) {
    for(let i in filters) {
      urlParts.queryParams.q.push(encodeURIComponent(`[[at(my.product.category, "${filters[i]}")]]`));
    }
  }
  const{data, isLoading} = useApiData(urlParts);
  return {products: data, productsLoading: isLoading};
}