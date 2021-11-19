import Grid from "./Grid";
import { useSearch } from "../utils/hooks/useSearch";
import useQuery from "../utils/hooks/useQuery";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";

const Search = (props) => {
    const query = useQuery();
    const searchQuery = query.get('q');
    const { page } = useParams();    
    const {search, searchLoading} = useSearch(searchQuery, page);

    console.log(search.page);

    return (
        <div className="search">
            <div className="container">
                <h1>{`Search Results for: ${searchQuery}`}</h1>
                {
                    !searchLoading && search.results.length > 0 
                    ? <Grid products={search.results} isLoading={searchLoading}/>
                    : <h2>There are no results for this search term.</h2>
                }
                
            </div>
            {
                !searchLoading &&
                    <Pagination current={search.page} total={search.total_pages}/>
            }
        </div>
    )
}

export default Search;