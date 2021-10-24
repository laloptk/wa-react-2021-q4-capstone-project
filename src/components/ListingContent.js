import { useState, useEffect } from 'react';
import Grid from "./Grid";
import Sidebar from "./Sidebar";
import { fetchData } from '../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ListingContent = (props) => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getData = async () => {
        const productsData = await fetchData('./products.json');

        if(productsData !== false) {
            setProducts(productsData.results);
        }
    }

    useEffect(() => {
        getData();        
    }, []);

    const handleFilters = (filter) => {
        const filterPos = filters.indexOf(filter);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        
        if(filterPos === -1) {
            setFilters([...filters, filter]);
        } else {
            setFilters([...filters.slice(0, filterPos), ...filters.slice(filterPos + 1)]);
        }        
    }

    const filterData = () => {        
        const filteredProducts = products.filter((product) => {
            return filters.includes(product.data.category.id);
        });

        return filteredProducts;            
    }

    return(
        <div className="products-listing">
            <div className="container">
                <div className="products-listing__title">
                    <h1>Products</h1>
                </div>
                <div className="products-listing__wrap">
                    <div className="products-listing__content">
                        {
                            isLoading 
                            ? <FontAwesomeIcon icon={faSpinner} pulse />
                            : <Grid products={ filters.length > 0 ? filterData() : products} />
                        }
                    </div>
                    <div className="products-listing__sidebar">
                        <Sidebar setCategoriesFilters={handleFilters} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingContent;