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

    return (
        <div className="search">
            <div className="container">
                <h1>{`Search Results for: ${searchQuery}`}</h1>
                <Grid products={search.results} isLoading={searchLoading}/>
            </div>
            {
                !searchLoading &&
                    <Pagination size={5} pageSlug="search" currentPage={page ? parseInt(page) : 1} total={search.total_pages}/>
            }
        </div>
    )
}

export default Search;