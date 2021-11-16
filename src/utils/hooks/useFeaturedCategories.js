import useApiData from "./useApiData";

export function useFeaturedCategories() {
  const urlParts = {
    slug: '/documents/search',
    queryParams: {
        q: [
          encodeURIComponent('[[at(document.type, "category")]]')
        ],
        lang: 'en-us',
        pageSize: '30'
    }
  }

  const{data, isLoading} = useApiData(urlParts);

  return {categories: data, categoriesLoading: isLoading};
}