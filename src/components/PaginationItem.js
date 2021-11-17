import { Link } from "react-router-dom";

const PaginationItem = ({classModifier = '', slug, text}) => {
    return(
        <li className ={`pagination__item ${classModifier}`}>
            <Link to={slug}>{text}</Link>
        </li>
    )
}

export default PaginationItem;