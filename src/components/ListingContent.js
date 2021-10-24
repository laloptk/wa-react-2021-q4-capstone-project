import {useState, useEffect} from 'react';
import Grid from "./Grid";
import { fetchData } from '../utils/helpers';

const ListingContent = (props) => {
    const [products, setProducts] = useState([]);

    const getData = async () => {
        const productsData = await fetchData('./products.json');

        if(productsData !== false) {
            setProducts(productsData.results);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <div className="products-listing">
            <div className="container">
                <h1>Products</h1>
                <Grid products={products} />
            </div>
        </div>
    )
}

export default ListingContent;