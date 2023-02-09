import React from 'react'

import './HeaderSlider.scss';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderImage } from '../../utils/images';


// Slide in Home to scrolling images

const HeaderSlider = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="slider">
            <div className='container'>
                <div className='slider-content overflow-x-hidden'>
                    <Slider {...settings}>
                        <div className='slider-item'>
                            <img src={sliderImage[0]} alt="" />
                        </div>
                        <div className='slider-item'>
                            <img src={sliderImage[1]} alt="" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}


export default HeaderSlider;
<div></div>