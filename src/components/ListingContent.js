import { useEffect, useState } from "react";
import Grid from "./Grid";
import Sidebar from "./Sidebar";
import Pagination from './Pagination';
import { useFeaturedCategories } from '../utils/hooks/useFeaturedCategories';
import { useProducts } from '../utils/hooks/useProducts';
import { useParams } from "react-router-dom";
import useQuery from "../utils/hooks/useQuery";

const ListingContent = (props) => {
    // All of this might be better in the main component, ask.
    // This whole component is rerendering too many times, why? [Probably I can use memoization hooks and custom hooks]
    // All fetching hooks are too similar between them, I feel like I'm breaking DRY
    const { page } = useParams();
    const {data: products, isLoading: productsLoading} = useProducts(page);
    const {data: categories, isLoading: categoriesLoading} = useFeaturedCategories({});
    const [filters, setFilters] = useState([]);
    const query = useQuery();
    const catQuery = query.get('category');    

    useEffect(() => {      
        if(catQuery && !categoriesLoading) {  
            const categoryBySlug = categories.results.filter((category) => {                
                return category.slugs.indexOf(catQuery) !== -1;
            });
            
            setFilters([categoryBySlug[0].id]);
        }

    }, [categories, categoriesLoading, catQuery]);  

    const filterData = () => {        
        const filteredProducts = products.results.filter((product) => {
            return filters.includes(product.data.category.id);
        });

        return filteredProducts;            
    }

    const handleFilters = (filter) => {
        const filterPos = filters.indexOf(filter);
        
        if(filterPos === -1) {
            setFilters([...filters, filter]);
        } else {
            setFilters([...filters.slice(0, filterPos), ...filters.slice(filterPos + 1)]);
        }        
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
                                <Sidebar 
                                    setCategoriesFilters={handleFilters} 
                                    categories={ categories.results }
                                    activeFilters={filters}
                                />
                        }                        
                    </div>
                    <div className="products-listing__content">
                        {
                            !productsLoading &&
                                <>
                                    <Grid 
                                        products={ filters.length > 0 ? filterData() : products.results } 
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