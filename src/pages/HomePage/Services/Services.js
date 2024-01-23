import React from 'react';
import classNames from 'classnames/bind';
import styles from './Services.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cx = classNames.bind(styles);

export default function Services() {
    const services = [
        {
            name: 'Logo Design',
            desc: 'Build your brand',
            img: 'https://demo5.cybersoft.edu.vn/img/crs1.png',
        },
        {
            name: 'WordPress',
            desc: 'Customize your site',
            img: 'https://demo5.cybersoft.edu.vn/img/crs2.png',
        },
        {
            name: 'Voice Over',
            desc: 'Share your message',
            img: 'https://demo5.cybersoft.edu.vn/img/crs3.png',
        },
        {
            name: 'Video Explainer',
            desc: 'Engage your audience',
            img: 'https://demo5.cybersoft.edu.vn/img/crs4.png',
        },
        {
            name: 'Social Media',
            desc: 'Reach more customers',
            img: 'https://demo5.cybersoft.edu.vn/img/crs5.png',
        },
        {
            name: 'Logo Design',
            desc: 'Build your brand',
            img: 'https://demo5.cybersoft.edu.vn/img/crs6.png',
        },
        {
            name: 'WordPress',
            desc: 'Customize your site',
            img: 'https://demo5.cybersoft.edu.vn/img/crs7.png',
        },
        {
            name: 'Voice Over',
            desc: 'Share your message',
            img: 'https://demo5.cybersoft.edu.vn/img/crs8.png',
        },
        {
            name: 'Video Explainer',
            desc: 'Engage your audience',
            img: 'https://demo5.cybersoft.edu.vn/img/crs9.png',
        },
        {
            name: 'Social Media',
            desc: 'Reach more customers',
            img: 'https://demo5.cybersoft.edu.vn/img/crs10.png',
        },
    ];

    const settingsSlider = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };

    const renderServices = () => {
        return services.map((service, index) => {
            return (
                <div key={index} className={cx('service')}>
                    <img src={service.img} alt={service.name} />
                    <figcaption className={cx('overlay')}>
                        <p>{service.desc}</p>
                        <h5>{service.name}</h5>
                    </figcaption>
                </div>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Popular professional services</h2>
            <Slider {...settingsSlider}>{renderServices()}</Slider>
        </div>
    );
}
