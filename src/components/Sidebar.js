import {useState, useEffect} from 'react';
import { fetchData } from '../utils/helpers';

const Sidebar = (props) => {
    const [categories, setCategories] = useState([]);

    const getData = async () => {
        const categoriesData = await fetchData('./product-categories.json');

        if(categoriesData !== false) {
            setCategories(categoriesData.results);
        }
    }

    useEffect(() => {
        getData();
    }, []);
    
    return (
        <aside>
            <div className="sidebar__filters">
                <ul>
                    {
                        categories.map((category) => {
                            return (
                                <li 
                                    key={category.id}
                                    data-id={category.id}
                                    onClick={event => props.setCategoriesFilters(event.target.dataset.id)}
                                >                            
                                    {category.data.name}
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