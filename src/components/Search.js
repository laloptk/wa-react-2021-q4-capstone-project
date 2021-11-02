import Grid from "./Grid";
import { useSearch } from "../utils/hooks/useSearch";
import useQuery from "../utils/hooks/useQuery";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";

const Search = (props) => {
    const query = useQuery();
    const searchQuery = query.get('q');
    const { page } = useParams();    
    const {data: products, isLoading: productsLoading} = useSearch(searchQuery, page);

    return (
        <div className="search">
            <div className="container">
                <Grid products={products.results} isLoading={productsLoading}/>
            </div>
            {
                !productsLoading &&
                    <Pagination size={5} pageSlug="search" currentPage={page ? parseInt(page) : 1} total={products.total_pages}/>
            }
        </div>
    )
}

export default Search;