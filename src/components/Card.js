const Card = (props) => {
    return(
        <div className="card">
            <div className="card_img">
            <a href={props.href} >
                <img src={
                    props.data.mainimage !== undefined 
                    ? props.data.mainimage.url 
                    : props.data.main_image.url
                } 
                alt={props.data.mainimage !== undefined 
                    ? props.data.mainimage.alt
                    : props.data.main_image.alt
                } 
            />
            </a>
            </div>            
            <div className="card__title">
                <h3>
                    {
                        <a href={props.href} >
                            {
                                props.data.name !== undefined 
                                ? props.data.name 
                                : props.data.title
                            }
                        </a>
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
        </div>
    )
}

export default Card;