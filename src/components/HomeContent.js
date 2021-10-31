import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Grid from "./Grid";
import Section from "./Section";
import { useFeaturedBanners } from "../utils/hooks/useFeaturedBanners";
import { useFeaturedCategories } from "../utils/hooks/useFeaturedCategories";
import { fetchData } from "../utils/helpers";
import Slider from "react-slick";

const HomeContent = (props) => {
    const {data: banners, isLoading: bannersLoading} = useFeaturedBanners({});
    const {data: categories, isLoading: categoriesLoading} = useFeaturedCategories({});
    const [featuredProducts, setFeaturedProducts] = useState([]);
    
    const sliderSettings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1        
    };

    const carouselSettings = {
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

    const getData = async () => {
        const featuredProductsData = await fetchData('./featured-products.json');

        if(featuredProductsData !== false) {
            setFeaturedProducts(featuredProductsData.results);
        }
    }
    
    useEffect(() => {
        getData();
    }, []);

    return(
        <div className="home">
            <Section sectionName="home__slider" sectionTitle="The Best of the Best...">
                {
                    bannersLoading
                    ?   "Loading..."
                    :   <Slider {...sliderSettings}>
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
                    ? "Loading..."
                    :   <Slider {...carouselSettings}>
                            {
                                categories.results.map((carouselItem) => {
                                    return <Card {...carouselItem } key={carouselItem.id}/>
                                })
                            }
                        </Slider>
                }
            </Section>
            <Section sectionName="home__grid" sectionTitle="Featured Products">
                <Grid title="Featured Products" products={featuredProducts} />
                <Link to="/products">View All Products</Link>
            </Section>
        </div>
    )
}

export default HomeContent;
