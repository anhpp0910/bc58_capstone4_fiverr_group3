import React from 'react';
import classNames from 'classnames/bind';
import styles from './PopperWrapper.module.scss';

const cx = classNames.bind(styles);

export default function PopperWrapper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}
