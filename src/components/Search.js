import Grid from "./Grid";
import { useSearch } from "../utils/hooks/useSearch";
import useQuery from "../utils/hooks/useQuery";

const Search = (props) => {
    const query = useQuery();
    const searchQuery = query.get('q');
    const {data: products, isLoading: productsLoading} = useSearch(searchQuery);

    return (
        <div className="search">
            <div className="container">
                <Grid products={products.results} isLoading={productsLoading}/>
            </div>
        </div>
    )
}

export default Search;