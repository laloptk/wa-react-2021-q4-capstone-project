import { Link } from "react-router-dom";
import useQuery from '../utils/hooks/useQuery';

const Sidebar = (props) => {

    const query = useQuery();


    const queryCats = query.get('category');
    console.log(queryCats);

    const handleCatQueryParams = (newQuery) => {
        
    }
    
    return (
        <aside className="sidebar">
            <div className="sidebar__filters">
                <ul>
                    {
                        props.categories.map((category) => {
                            return (
                                <li 
                                    key={category.id}
                                >                            
                                    <Link 
                                        to={`/products?category=${JSON.stringify(category.slugs.join(","))}`}
                                    >
                                        {category.data.name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar;