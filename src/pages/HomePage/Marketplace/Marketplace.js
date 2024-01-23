import React from 'react';
import classNames from 'classnames/bind';
import styles from './Marketplace.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Marketplace() {
    const marketplaceItems = [
        {
            name: 'Graphics & Design',
            img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg',
        },
        {
            name: 'Digital Marketing',
            img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg',
        },
        {
            name: 'Writing & Translation',
            img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg',
        },
        {
            name: 'Video & Animation',
            img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg',
        },
        {
            name: 'Music & Audio',
            img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg',
        },
        {
            name: 'Programming & Tech',
            img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg',
        },
        {
            name: 'Business',
            img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg',
        },
        {
            name: 'Lifestyle',
            img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg',
        },
        {
            name: 'Data',
            img: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg',
        },
    ];

    const renderMarketplace = () => {
        return marketplaceItems.map((item) => {
            return (
                <li key={item.name}>
                    <NavLink>
                        <img src={item.img} alt={item.name} loading="lazy" />
                        {item.name}
                    </NavLink>
                </li>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Explore the marketplace</h2>
            <ul className={cx('items', 'grid grid-cols-5 gap-20')}>
                {renderMarketplace()}
            </ul>
        </div>
    );
}
