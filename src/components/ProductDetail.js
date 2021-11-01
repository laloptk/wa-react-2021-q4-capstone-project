import { useProduct } from "../utils/hooks/useProduct";
import { useParams } from "react-router";
import Gallery from "./Gallery";
import Label from "./Label";
import Button from "./Button";

const ProductDetail = (props) => {
    const { id } = useParams();
    const { data: product, isloading: productLoading } = useProduct(id);
    console.log(product);
    
    return(
        <div className="product">
            <div className="container">
                {
                    productLoading 
                    ? 'Loading...'
                    :
                        <>
                            {
                                // This conditional should not be necessary, maybe something related with useEffect params, ask.
                                product.results !== undefined &&
                                    <>
                                        <h1>{product.results[0].data.name}</h1>
                                        <div className="product__gallery">
                                            <Gallery images={product.results[0].data.images} />
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
                                        <div className="product__specs">
                                            <div className="product__specs--header">
                                                <h3>Specs:</h3>
                                            </div>
                                            <div className="product__specs--body">
                                                <ul>
                                                    {
                                                        product.results[0].data.specs.map((spec) => {
                                                            console.log(spec)
                                                            return <li key={spec.spec_name}>{<><span className="name">{spec.spec_name}</span><span className="value">{spec.spec_value}</span></>}</li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>                     
                                    </>
                            }
                        </>
                }

                <input type="number" />
                <Button link="#" text="Add To Cart" btnModifier="btn-cart" />
            </div>
        </div>
    )
}

export default ProductDetail;