import useQuery from "../utils/hooks/useQuery";
import { Link } from "react-router-dom";

const Pagination = ({size, pageSlug, currentPage, total}) => {
    const pages = [];
    const query = useQuery();
    const searchQuery = query.get('q') ? `?q=${query.get('q')}` : "";
    
    if(total > 1) {
        for(let i = currentPage; i < size + currentPage; i++) {
            let current = false;
            if(currentPage !== 1 && i === currentPage) {
                pages.push(
                    <li 
                        className="pagination__item prev" 
                        key={new Date().getTime()}
                    >
                        <Link to={`/${pageSlug}/${i - 1}${searchQuery}`}>{`<< Prev Page`}</Link>
                    </li>
                );
            }

            if(i === currentPage) {
                current = true;
            }

            if(total <= 2) {
                pages.push(
                    <li 
                        className={`pagination__item ${current ? 'current' : ''}`} 
                        key={new Date().getTime() + i}
                    >
                        <Link to={`/${pageSlug}/${i}${searchQuery}`}>{i}</Link>
                    </li>
                );
            }

            if(i === total) {
                break;
            }

            if(i === (size + currentPage - 1)) {
                pages.push(
                    <li 
                        className="pagination__item next" 
                        key={new Date().getTime()}
                    >
                        <Link to={`/${pageSlug}/${i + 1}${searchQuery}`}>{`Next Page >>`}</Link>
                    </li>
                );
            }
        }
    }

    return(
        <div className="pagination">
            <ul>
                {pages}
            </ul>
        </div>
    )
}

export default Pagination;