import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import FooterTop from './FooterTop/FooterTop';
import FooterBottom from './FooterBottom/FooterBottom';

const cx = classNames.bind(styles);

export default function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <FooterTop />
            <FooterBottom />
        </footer>
    );
}
