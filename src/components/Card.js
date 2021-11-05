import Button from './Button.js';
import { Link } from 'react-router-dom';

const Card = (props) => {
    return(
        <div className="card">
            <div className="card_img">
            <Link to={`/product/${props.id}`} >
                <img 
                    src={
                        props.data.mainimage !== undefined 
                        ? props.data.mainimage.url 
                        : props.data.main_image.url
                    } 
                    alt={props.data.mainimage !== undefined 
                        ? props.data.mainimage.alt
                        : props.data.main_image.alt
                    } 
                />
            </Link>
            </div>            
            <div className="card__title">
                <h3>
                    {
                        <Link to={`/product/${props.id}`} >
                            {
                                props.data.name !== undefined 
                                ? props.data.name 
                                : props.data.title
                            }
                        </Link>
                    }
                </h3>             
            </div>
            <div className="card__info">
                {   props.data.price !== undefined &&
                    <div className="card__price">
                        {`Price: US$${props.data.price}`}
                    </div> 
                }
                {   
                    props.category !== undefined &&
                        <div className="card__category">
                            {`Category: ${props.category.data.name}`}
                        </div> 
                }
            </div> 
            {     
                props.type === 'category' 
                ? <Button link={`/products?category=${props.slugs[0]}`} text="Go to Category" btnModifier="btn--ghost" />
                : props.type === 'product' && <Button link={`/product/${props.id}`} text="View Product" btnModifier="btn--ghost" />
            }
        </div>
    )
}

export default Card;