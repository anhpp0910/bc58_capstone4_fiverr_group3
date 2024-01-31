import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './FooterTop.module.scss';

const cx = classNames.bind(styles);

export default function FooterTop() {
    const footerTopContent = [
        {
            title: 'Categories',
            items: [
                { name: 'Graphics & Design' },
                { name: 'Digital Marketing' },
                { name: 'Writing & Translation' },
                { name: 'Video & Animation' },
                { name: 'Music & Audio' },
                { name: 'Programming & Tech' },
                { name: 'Data' },
                { name: 'Business' },
                { name: 'Lifestyle' },
                { name: 'Sitemap' },
            ],
        },
        {
            title: 'About',
            items: [
                { name: 'Careers' },
                { name: 'Press & News' },
                { name: 'Partnerships' },
                { name: 'Privacy Policy' },
                { name: 'Terms of Service' },
                { name: 'Intellectual Property Claims' },
                { name: 'Investor Relations' },
            ],
        },
        {
            title: 'Support',
            items: [
                { name: 'Help & Support' },
                { name: 'Trust & Safety' },
                { name: 'Selling on Fiverr' },
                { name: 'Buying on Fiverr' },
            ],
        },
        {
            title: 'Community',
            items: [
                { name: 'Events' },
                { name: 'Blog' },
                { name: 'Forum' },
                { name: 'Community Standards' },
                { name: 'Podcast' },
                { name: 'Affiliates' },
                { name: 'Invite a Friend' },
                { name: 'Become a Seller' },
                { name: 'Fiverr Elevate', subDesc: 'Exclusive Benefits' },
            ],
        },
        {
            title: 'More From Fiverr',
            items: [
                { name: 'Fiverr Business' },
                { name: 'Fiverr Pro' },
                { name: 'Fiverr Studios' },
                { name: 'Fiverr Logo Maker' },
                { name: 'Fiverr Guides' },
                { name: 'Get Inspired' },
                { name: 'ClearVoice', subDesc: 'Content Marketing' },
                { name: 'AND CO', subDesc: 'Invoice Software' },
                { name: 'Learn', subDesc: 'Online Courses' },
            ],
        },
    ];

    const renderFooterTopContent = () => {
        return footerTopContent.map((content) => {
            return (
                <div key={content.title} className={cx('item')}>
                    <h4 className={cx('title')}>{content.title}</h4>
                    <ul>
                        {content.items.map((item) => {
                            return (
                                <li key={item.name}>
                                    <NavLink>{item.name}</NavLink>
                                    <p>{item?.subDesc}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        });
    };

    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>{renderFooterTopContent()}</div>
        </footer>
    );
}
