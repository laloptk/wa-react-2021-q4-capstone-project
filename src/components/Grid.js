import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";

const Grid = (props) => {  
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [props.products]);

    return(        
        <div className="grid" > 
            <div className="grid__wrap">
                {
                    isLoading 
                    ? <FontAwesomeIcon icon={faSpinner} pulse />
                    :
                    <>
                        {
                            props.products.map((gridItem) => {
                                return <Card {...gridItem } key={gridItem.id}/>
                            })
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Grid;