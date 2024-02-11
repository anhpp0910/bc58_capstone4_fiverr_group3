import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobDetail.module.scss';

const cx = classNames.bind(styles);

export default function JobDetail() {
    return <div className={cx('wrapper')}>JobDetail</div>;
}
