import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import HeaderTop from '../../../components/Header/HeaderTop/HeaderTop';
import HeaderTopTransparent from '../../../components/Header/HeaderTopTransparent/HeaderTopTransparent';
import HeaderBottom from '../../../components/Header/HeaderBottom/HeaderBottom';

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
