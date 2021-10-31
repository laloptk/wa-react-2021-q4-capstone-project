import { useState, useEffect } from 'react';
import Grid from "./Grid";
import Sidebar from "./Sidebar";
import Pagination from './Pagination';
import { fetchData } from '../utils/helpers';

const ListingContent = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState([]);

    const getData = async () => {
        const productsData = await fetchData('./products.json');
        const categoriesData = await fetchData('./product-categories.json');

        if(productsData !== false) {
            setProducts(productsData.results);
        }

        if(categoriesData !== false) {
            setCategories(categoriesData.results);
        }
    }

    useEffect(() => {
        getData();        
    }, []);

    const handleFilters = (filter) => {
        const filterPos = filters.indexOf(filter);
        
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
                    <div className="products-listing__sidebar">
                        <Sidebar setCategoriesFilters={handleFilters} categories={ categories }/>
                    </div>
                    <div className="products-listing__content">
                        <Grid 
                            products={ filters.length > 0 ? filterData() : products } 
                            categories={ categories }
                        />
                        <Pagination start={1} size={5} totalPages={20} />                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingContent;