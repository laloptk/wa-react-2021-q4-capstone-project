import { useState } from "react";
import { useProduct } from "../utils/hooks/useProduct";
import { useParams } from "react-router";
import Slider from "react-slick";
import Label from "./Label";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { addCartProduct } from "../redux/slices/CartSlice";

const GALLERY_SETTINGS = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true    
};

const ProductDetail = () => {
    const [itemQty, setItemQTY] = useState(1);
    const { id } = useParams();
    const { product, productLoading } = useProduct(id);
    const dispatch = useDispatch();

    const handleAddToCart = (item) => {
        dispatch(addCartProduct({item}));
        setItemQTY(1);
    }
    
    return(
        <div className="product">
            <div className="container">
                {
                    productLoading 
                    ? <FontAwesomeIcon icon={faSpinner} pulse />
                    :
                        <>
                            {
                                // This conditional should not be necessary, maybe something related with useEffect params, ask.
                                product.results !== undefined &&
                                    <>
                                        <h1>{product.results[0].data.name}</h1>
                                        <div className="product__gallery">
                                            <Slider {...GALLERY_SETTINGS }>
                                                {
                                                    product.results[0].data.images.map((item) => {
                                                        return (
                                                            <div className="product__gallery--item" key={item.image.url}>
                                                                <img src={item.image.url} alt=""/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Slider>
                                        </div>
                                        <Label text={`Price: US$ ${product.results[0].data.price}`} />
                                        <Label text={`SKU: ${product.results[0].data.sku}`} />
                                        <Label text={`Category: ${product.results[0].data.category.slug}`} />
                                        <div className="product__tags">
                                            <div className="product__tags--header">
                                                <h3>Tags:</h3>
                                            </div>
                                            <div className="product__tags--body">
                                                {
                                                    product.results[0].tags.map((tag) => {
                                                        return <Label text={tag} key={tag}/>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="product__description">
                                            <h3>Description: </h3>
                                            <p>
                                                {product.results[0].data.description[0].text}
                                            </p>
                                        </div>
                                        <input 
                                            type="number" 
                                            onChange={(event) => setItemQTY(parseInt(event.target.value))}
                                            value={itemQty >= 1 ? itemQty : 1} 
                                        />
                                        <button 
                                            onClick={ () => handleAddToCart({[product.results[0].id]: {
                                                qty: itemQty,
                                                data: product.results[0].data
                                            }})}
                                        >
                                            Add To Cart
                                        </button>
                                        <div className="product__specs">
                                            <div className="product__specs--header">
                                                <h3>Specs:</h3>
                                            </div>
                                            <div className="product__specs--body">
                                                <ul>
                                                    {
                                                        product.results[0].data.specs.map((spec) => {
                                                            return <li key={spec.spec_name}>{<><div className="name">{spec.spec_name}</div><div className="value">{spec.spec_value}</div></>}</li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>                     
                                    </>
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default ProductDetail;