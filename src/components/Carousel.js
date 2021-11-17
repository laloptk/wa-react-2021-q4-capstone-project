import Slider from "react-slick";
import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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

const Carousel = ({items, isLoading}) => {
    return (
        <>
            {
                isLoading
                ?   <FontAwesomeIcon icon={faSpinner} pulse />
                :   <Slider {...CAROUSEL_SETTINGS }>
                        {
                            items.results.map((item) => {
                                return <Card {...item } key={item.id}/>
                            })
                        }
                    </Slider>
            }
        </>
    )
}

export default Carousel;