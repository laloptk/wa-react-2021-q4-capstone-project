import useApiData from "./useApiData";

export function useFeaturedBanners() {
  const urlParts = {
    slug: '/documents/search',
    queryParams: {
        q: [
            '[[at(document.type, "banner")]]'
        ],
        lang: 'en-us',
        pageSize: '5'
    }
  }

  const{data, isLoading} = useApiData(urlParts);

  return {banners: data, bannersLoading: isLoading};
}