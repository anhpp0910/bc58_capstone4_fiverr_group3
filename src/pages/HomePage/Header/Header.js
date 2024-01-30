import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import HeaderTop from './HeaderTop/HeaderTop';
import HeaderTopTransparent from './HeaderTopTransparent/HeaderTopTransparent';
import HeaderBottom from './HeaderBottom/HeaderBottom';

const cx = classNames.bind(styles);

export default function Header() {
    return (
        <header className={cx('wrapper')}>
            <HeaderTopTransparent />
            <HeaderTop />
            <HeaderBottom />
        </header>
    );
}
