import React from 'react';
import classNames from 'classnames/bind';
import styles from './Marketplace.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Marketplace() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Explore the marketplace</h2>
            <ul className={cx('items', 'grid grid-cols-5 gap-20')}>
                <li>
                    <NavLink>
                        <img
                            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                            alt="Graphics & Design"
                            loading="lazy"
                        />
                        Graphics & Design
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        <img
                            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                            alt="Digital Marketing"
                            loading="lazy"
                        />
                        Digital Marketing
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        <img
                            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                            alt="Writing & Translation"
                            loading="lazy"
                        />
                        Writing & Translation
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        <img
                            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                            alt="Video & Animation"
                            loading="lazy"
                        />
                        Video & Animation
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        <img
                            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                            alt="Music & Audio"
                            loading="lazy"
                        />
                        Music & Audio
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        <img
                            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                            alt="Programming & Tech"
                            loading="lazy"
                        />
                        Programming & Tech
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        <img
                            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                            alt="Business"
                            loading="lazy"
                        />
                        Business
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        <img
                            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                            alt="Lifestyle"
                            loading="lazy"
                        />
                        Lifestyle
                    </NavLink>
                </li>
                <li>
                    <NavLink>
                        <img
                            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                            alt="Data"
                            loading="lazy"
                        />
                        Data
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
