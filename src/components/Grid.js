import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getCategoryById } from "../utils/helpers";

const Grid = (props) => {  
    return(        
        <div className="grid" > 
            <div className="grid__wrap">
                {
                    props.isLoading 
                    ? <FontAwesomeIcon icon={faSpinner} pulse />
                    :
                    <>
                        {
                            props.products.map((gridItem) => {
                                const category = props.categories !== null 
                                ? getCategoryById(gridItem.data.category.id, props.categories)
                                : undefined;
                                return <Card {...gridItem } key={gridItem.id} category={category}/>
                            })
                        }
                    </>
                }
            </div>
        </div>
    )
}

Grid.defaultProps = {
    products: {},
    categories: null
}

export default Grid;