import { Link } from "react-router-dom";
import Card from "./Card";
import Grid from "./Grid";
import Section from "./Section";
import { useFeaturedBanners } from "../utils/hooks/useFeaturedBanners";
import { useFeaturedCategories } from "../utils/hooks/useFeaturedCategories";
import { useFeaturedProducts } from "../utils/hooks/useFeaturedProducts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";

const SLIDER_SETTINGS = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1        
};

const CAROUSEL_SETTINGS = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
    ]
};

const HomeContent = (props) => {
    // All of this might be better in the main component, ask.
    const {banners, bannersLoading} = useFeaturedBanners();
    const {categories, categoriesLoading} = useFeaturedCategories({});
    const {products, productsLoading} = useFeaturedProducts({});
    
    return(
        <div className="home">
            <Section sectionName="home__slider" sectionTitle="The Best of the Best...">
                {
                    bannersLoading
                    ?   <FontAwesomeIcon icon={faSpinner} pulse />
                    :   <Slider {...SLIDER_SETTINGS }>
                            {
                                banners.results.map((banner) => {
                                    return <Card {...banner } key={banner.id}/>
                                })
                            }
                        </Slider>
                }
            </Section>
            <Section sectionName="home__carousel" sectionTitle="Featured Categories">
                {
                    categoriesLoading 
                    ?   <FontAwesomeIcon icon={faSpinner} pulse />
                    :   <Slider {...CAROUSEL_SETTINGS}>
                            {
                                categories.results.map((carouselItem) => {
                                    return <Card {...carouselItem } key={carouselItem.id}/>
                                })
                            }
                        </Slider>
                }
            </Section>
            <Section sectionName="home__grid" sectionTitle="Featured Products">                   
                <Grid title="Featured Products" products={products.results} isLoading={productsLoading}/>
                <Link to="/products">View All Products</Link>                        
            </Section>
        </div>
    )
}

export default HomeContent;
