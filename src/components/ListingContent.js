import Grid from "./Grid";
import Sidebar from "./Sidebar";
import Pagination from './Pagination';
import { useFeaturedCategories } from '../utils/hooks/useFeaturedCategories';
import { useProducts } from '../utils/hooks/useProducts';
import useQuery from '../utils/hooks/useQuery';
import { useParams } from "react-router-dom";

const ListingContent = (props) => {
    // All of this might be better in the main component, ask.
    const { page } = useParams();
    const {data: products, isLoading: productsLoading} = useProducts(page);
    const {data: categories, isLoading: categoriesLoading} = useFeaturedCategories({});
    const query = useQuery();

    const filterData = () => {   
        const catQuery = query.get('category');
        let filteredProducts = [];    
        
        if(catQuery) {
            filteredProducts = products.results.filter((product) => {
                return catQuery.split(",").includes(product.data.category.slug);
            });
        } else {
            filteredProducts = products.results;
        }

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
                        {
                            !categoriesLoading &&
                            <Sidebar categories={ categories.results }/>
                        }                        
                    </div>
                    <div className="products-listing__content">
                        {
                            !productsLoading &&
                                <>
                                    <Grid 
                                        products={ filterData() } 
                                        categories={ categories.results }
                                    />
                                    <Pagination pageSlug="products" currentPage={page ? parseInt(page) : 1} size={5} total={products.total_pages} />
                                </>
                        }                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingContent;