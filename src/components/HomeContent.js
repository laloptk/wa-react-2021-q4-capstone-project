import { useEffect, useState } from "react";
import Card from "./Card";
import Grid from "./Grid";
import Section from "./Section";
import { fetchData } from "../utils/helpers";
import Slider from "react-slick";

const HomeContent = (props) => {
    const [banners, setBanners] = useState([]);
    const [carousel, setCarousel] = useState([]);
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
        const bannersData = await fetchData('./featured-banners.json');
        const carouselData = await fetchData('./product-categories.json');
        const featuredProductsData = await fetchData('./featured-products.json');

        if(bannersData !== false) {
            setBanners(bannersData.results);
        }

        if(carouselData !== false) {
            setCarousel(carouselData.results);
        }

        if(featuredProductsData !== false) {
            setFeaturedProducts(featuredProductsData.results);
        }
    }
    
    useEffect(() => {
        getData();
    }, []);

    return(
        <div className="content">
            <div className="container">
                <Section sectionName="home-slider" sectionTitle="The Best of the Best...">
                    <Slider {...sliderSettings}>
                        {
                            banners.map((banner) => {
                                return <Card {...banner } key={banner.id}/>
                            })
                        }
                    </Slider>
                </Section>
                <Section sectionName="home-carousel" sectionTitle="Featured Categories">
                    <Slider {...carouselSettings}>
                        {
                            carousel.map((carouselItem) => {
                                return <Card {...carouselItem } key={carouselItem.id}/>
                            })
                        }
                    </Slider>
                </Section>
                <Section sectionName="home-grid" sectionTitle="Featured Products">
                    <Grid title="Featured Products" products={featuredProducts} />
                </Section>
            </div>
        </div>
    )
}

export default HomeContent;
