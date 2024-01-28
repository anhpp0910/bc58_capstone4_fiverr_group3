import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import HeaderTop from './HeaderTop/HeaderTop';
import HeaderBottom from './HeaderBottom/HeaderBottom';

const cx = classNames.bind(styles);

export default function Header() {
    return (
        <header className={cx('wrapper')}>
            <HeaderTop />
            <HeaderBottom />
        </header>
    );
}
