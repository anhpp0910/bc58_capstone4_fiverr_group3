import React from 'react';
import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';
import Slider from 'react-slick';

import Search from './Search/Search';

const cx = classNames.bind(styles);

export default function MyCarousel() {
    const carouselImg = [
        'https://demo5.cybersoft.edu.vn/img/1.png',
        'https://demo5.cybersoft.edu.vn/img/2.png',
        'https://demo5.cybersoft.edu.vn/img/3.png',
        'https://demo5.cybersoft.edu.vn/img/4.png',
        'https://demo5.cybersoft.edu.vn/img/5.png',
    ];

    const renderCarousel = () => {
        return carouselImg.map((img, index) => {
            return (
                <div key={index} className={cx('carouselItem')}>
                    <img src={img} alt="" />
                </div>
            );
        });
    };

    const settingsSlider = {
        arrows: false,
        autoplay: true,
        infinite: true,
        draggable: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className={cx('wrapper')}>
            <Slider {...settingsSlider}>{renderCarousel()}</Slider>
            <Search />
        </div>
    );
}
