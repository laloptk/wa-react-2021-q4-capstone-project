const Sidebar = ({categories, setCategoriesFilters, activeFilters}) => {

    const handleClick = (event) => {
        setCategoriesFilters(event.target.dataset.id);
    }
    
    return (
        <aside className="sidebar">
            <div className="sidebar__filters">
                <ul>
                    {
                        categories.map((category) => {
                            return (
                                <li 
                                    key={category.id}
                                    data-id={category.id}
                                    onClick={ event => handleClick(event) }
                                    className={activeFilters.indexOf(category.id) !== -1 ? 'active' : ''}
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