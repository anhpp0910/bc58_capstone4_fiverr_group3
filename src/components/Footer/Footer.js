import React, { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import FooterTop from './FooterTop/FooterTop';
import FooterBottom from './FooterBottom/FooterBottom';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <FooterTop />
            <FooterBottom />
        </footer>
    );
}

export default memo(Footer);
