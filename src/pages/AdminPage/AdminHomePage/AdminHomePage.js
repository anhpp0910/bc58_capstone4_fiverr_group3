import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminHomePage.module.scss';

import images from '../../../assets/images';

const cx = classNames.bind(styles);

export default function AdminHomePage() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('thumbnailImg')}
                src={images.admin}
                alt="admin"
            />
        </div>
    );
}
