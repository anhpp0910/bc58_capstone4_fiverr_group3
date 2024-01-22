import React from 'react';
import classNames from 'classnames/bind';
import styles from './FooterTop.module.scss';

const cx = classNames.bind(styles);

export default function FooterTop() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner', 'grid grid-cols-6 gap-5')}>
                <div className={cx('item')}>
                    <h4 className={cx('title')}>Categories</h4>
                    <ul>
                        <li>
                            <a href="#">Graphics & Design</a>
                        </li>
                        <li>
                            <a href="#">Digital Marketing</a>
                        </li>
                        <li>
                            <a href="#">Writing & Translation</a>
                        </li>
                        <li>
                            <a href="#">Video & Animation</a>
                        </li>
                        <li>
                            <a href="#">Music & Audio</a>
                        </li>
                        <li>
                            <a href="#">Programming & Tech</a>
                        </li>
                        <li>
                            <a href="#">Data</a>
                        </li>
                        <li>
                            <a href="#">Business</a>
                        </li>
                        <li>
                            <a href="#">Lifestyle</a>
                        </li>
                        <li>
                            <a href="#">Sitemap</a>
                        </li>
                    </ul>
                </div>
                <div className={cx('item')}>
                    <h4 className={cx('title')}>About</h4>
                    <ul>
                        <li>
                            <a href="#">Careers</a>
                        </li>
                        <li>
                            <a href="#">Press & News</a>
                        </li>
                        <li>
                            <a href="#">Partnerships</a>
                        </li>
                        <li>
                            <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#">Terms of Service</a>
                        </li>
                        <li>
                            <a href="#">Intellectual Property Claims</a>
                        </li>
                        <li>
                            <a href="#">Investor Relations</a>
                        </li>
                    </ul>
                </div>
                <div className={cx('item')}>
                    <h4 className={cx('title')}>Support</h4>
                    <ul>
                        <li>
                            <a href="#">Help & Support</a>
                        </li>
                        <li>
                            <a href="#">Trust & Safety</a>
                        </li>
                        <li>
                            <a href="#">Selling on Fiverr</a>
                        </li>
                        <li>
                            <a href="#">Buying on Fiverr</a>
                        </li>
                    </ul>
                </div>
                <div className={cx('item')}>
                    <h4 className={cx('title')}>Community</h4>
                    <ul>
                        <li>
                            <a href="#">Events</a>
                        </li>
                        <li>
                            <a href="#">Blog</a>
                        </li>
                        <li>
                            <a href="#">Forum</a>
                        </li>
                        <li>
                            <a href="#">Community Standards</a>
                        </li>
                        <li>
                            <a href="#">Podcast</a>
                        </li>
                        <li>
                            <a href="#">Affiliates</a>
                        </li>
                        <li>
                            <a href="#">Invite a Friend</a>
                        </li>
                        <li>
                            <a href="#">Become a Seller</a>
                        </li>
                        <li>
                            <a href="#">Fiverr Elevate</a>
                            <p>Exclusive Benefits</p>
                        </li>
                    </ul>
                </div>
                <div className={cx('item')}>
                    <h4 className={cx('title')}>More From Fiverr</h4>
                    <ul>
                        <li>
                            <a href="#">Fiverr Business</a>
                        </li>
                        <li>
                            <a href="#">Fiverr Pro</a>
                        </li>
                        <li>
                            <a href="#">Fiverr Studios</a>
                        </li>
                        <li>
                            <a href="#">Fiverr Logo Maker</a>
                        </li>
                        <li>
                            <a href="#">Fiverr Guides</a>
                        </li>
                        <li>
                            <a href="#">Get Inspired</a>
                        </li>
                        <li>
                            <a href="#">ClearVoice</a>
                            <p>Content Marketing</p>
                        </li>
                        <li>
                            <a href="#">AND CO</a>
                            <p>Invoice Software</p>
                        </li>
                        <li>
                            <a href="#">Learn</a>
                            <p>Online Courses</p>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
