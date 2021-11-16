import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants';
import useLatestAPI from './useLatestApi';

const useApiUrl = (urlParts) => {
    const [apiUrl, setApiUrl] = useState('');
    const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();

    const getQueryParams = (params) => {        
        const qArr = Object.keys(params).map((key) => {
            let currentParams = '';
            
            if(Array.isArray(params[key])) {
                currentParams = `&${key}=${params[key].join(`&${key}=`)}`;
            } else if(typeof params[key] === 'string') {
                currentParams = `&${key}=${params[key]}`;
            }

            return currentParams;
        });
        
        return qArr.join("");
    }

    useEffect(() => {
        if (!apiRef || isApiMetadataLoading) {
            return () => {};
        }

        const qParams = getQueryParams(urlParts.queryParams);

        setApiUrl(`${API_BASE_URL}${urlParts.slug}?ref=${apiRef}${qParams}`);

    }, [apiRef, isApiMetadataLoading, urlParts])    

    return {apiUrl, isLoading: isApiMetadataLoading};  
}

export default useApiUrl;