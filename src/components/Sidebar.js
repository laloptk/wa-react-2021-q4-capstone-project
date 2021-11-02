const Sidebar = (props) => {

    const handleClick = (event) => {
        // This was one of the things Paco told me it has to be done the React way
        let classExists = event.target.classList.contains("active");
        
        if(!classExists) {
            event.target.classList.add("active");
        } else {
            event.target.classList.remove("active");
        }

        props.setCategoriesFilters(event.target.dataset.id);
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
                                    data-id={category.id}
                                    onClick={ event => handleClick(event) }
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