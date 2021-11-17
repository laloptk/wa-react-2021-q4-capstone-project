import Slider from "react-slick";
import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SLIDER_SETTINGS = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1        
};

const SimpleSlider = ({items, isLoading}) => {
    return (
        <>
            {
                isLoading
                ?   <FontAwesomeIcon icon={faSpinner} pulse />
                :   <Slider {...SLIDER_SETTINGS }>
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

export default SimpleSlider;