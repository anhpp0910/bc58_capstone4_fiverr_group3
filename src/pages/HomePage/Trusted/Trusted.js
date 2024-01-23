import React from 'react';
import classNames from 'classnames/bind';
import styles from './Trusted.module.scss';

const cx = classNames.bind(styles);

export default function Trusted() {
    const trustedBy = [
        { name: 'Facebook', img: 'https://demo5.cybersoft.edu.vn/img/fb.png' },
        {
            name: 'Google',
            img: 'https://demo5.cybersoft.edu.vn/img/google.png',
        },
        {
            name: 'Netflix',
            img: 'https://demo5.cybersoft.edu.vn/img/netflix.png',
        },
        { name: 'P&G', img: 'https://demo5.cybersoft.edu.vn/img/pg.png' },
        {
            name: 'PayPal',
            img: 'https://demo5.cybersoft.edu.vn/img/paypal.png',
        },
    ];

    const renderTrustBy = () => {
        return trustedBy.map((company) => {
            return (
                <li key={company.name}>
                    <img src={company.img} alt={company.name} />
                </li>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <span className={cx('trustedText')}>Trusted by:</span>
            <ul className={cx('trustedList')}>{renderTrustBy()}</ul>
        </div>
    );
}
