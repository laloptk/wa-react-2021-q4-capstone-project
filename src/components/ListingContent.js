import { useState, useEffect} from 'react';
import Grid from "./Grid";
import Sidebar from "./Sidebar";
import { fetchData } from '../utils/helpers';

const ListingContent = (props) => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);

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
                <h1>Products</h1>
                <Grid products={ filters.length > 0 ? filterData() : products} />
                <Sidebar setCategoriesFilters={handleFilters} />
            </div>
        </div>
    )
}

export default ListingContent;