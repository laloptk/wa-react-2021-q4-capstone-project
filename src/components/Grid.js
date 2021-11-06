import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getCategoryById } from "../utils/helpers";

const Grid = ({products, isLoading, categories}) => {  
    return(        
        <div className="grid" > 
            <div className="grid__wrap">
                {
                    isLoading 
                    ? <FontAwesomeIcon icon={faSpinner} pulse />
                    :
                    <>
                        {
                            products.map((gridItem) => {
                                const category = categories !== null 
                                ? getCategoryById(gridItem.data.category.id, categories)
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