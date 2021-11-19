import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const Pagination = ({current, total}) => {
    const location = useLocation();
    const pathNameParts = location.pathname.split("/");
    const slug = pathNameParts[1];

    return(
        <div className="pagination">
            {
                (current > 1 && total > 1) && (
                    <Link to={`/${slug}/${current - 1}${location.search}`}>
                        Prev Page
                    </Link>
                ) 
            }
            {
                (current < total && total > 1) && (
                    <Link to={`/${slug}/${current + 1}${location.search}`}>
                        Next Page
                    </Link>
                )
            }
        </div>
    )
}

export default Pagination;