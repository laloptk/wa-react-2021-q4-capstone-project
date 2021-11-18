import { useEffect, useState } from "react";
import Grid from "./Grid";
import Sidebar from "./Sidebar";
import Pagination from './Pagination';
import { useFeaturedCategories } from '../utils/hooks/useFeaturedCategories';
import { useProducts } from '../utils/hooks/useProducts';
import { useParams } from "react-router-dom";
import useQuery from "../utils/hooks/useQuery";

const ListingContent = (props) => {
    const { page } = useParams();
    const [filters, setFilters] = useState([]);
    const {products, productsLoading} = useProducts(page, filters);
    const {categories, categoriesLoading} = useFeaturedCategories();    
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

    /*const filterData = () => {        
        const filteredProducts = products.results.filter((product) => {
            return filters.includes(product.data.category.id);
        });

        return filteredProducts;            
    }*/

    const handleFilters = (filter) => {
        //const filterPos = filters.indexOf(filter);
        setFilters([filter]);
        
        /*This was used to filter by several categories, but Prismic does not allow the query 
          with many categories, so, I'm refactoring to only allow one category filter at the time*/
        /*if(filterPos === -1) {
            setFilters([...filters, filter]);
        } else {
            setFilters([...filters.slice(0, filterPos), ...filters.slice(filterPos + 1)]);
        }*/        
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
                                        products={ products.results } 
                                        categories={ categories.results }
                                    />
                                    <Pagination current={products.page} total={products.total_pages}/>
                                </>
                        }                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingContent;