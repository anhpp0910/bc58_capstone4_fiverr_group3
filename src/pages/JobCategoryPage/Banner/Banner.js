import React from 'react';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

export default function Banner({ tenLoaiCV }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}></div>
            <div className={cx('mostPopular')}>
                <h2>Most popular in {tenLoaiCV}</h2>
            </div>
        </div>
    );
}
