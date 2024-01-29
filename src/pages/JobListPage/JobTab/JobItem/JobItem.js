import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobItem.module.scss';
import Avatar from '../../../../components/Avatar/Avatar';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const JobItem = ({ infoCV }) => {
    console.log('info', infoCV);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cardTop')}>
                <img
                    src={infoCV.congViec.hinhAnh}
                    alt={infoCV.congViec.tenCongViec}
                />
            </div>
            <div className={cx('cardBody')}>
                <div className={cx('sellerInfo')}>
                    <Avatar
                        className={cx('sellerAvatar')}
                        src={infoCV.avatar}
                        alt={infoCV.tenNguoiTao}
                    />
                    <div>
                        <NavLink className={cx('sellerName')}>
                            {infoCV.tenNguoiTao}
                        </NavLink>
                        <p className={cx('sellerLevel')}>
                            Level {infoCV.congViec.nguoiTao} seller
                        </p>
                    </div>
                </div>
                <div className={cx('jobInfo')}>
                    <NavLink>{infoCV.congViec.tenCongViec}</NavLink>
                    <p className={cx('rating')}>
                        <FontAwesomeIcon
                            icon={faStar}
                            className={cx('iconStar')}
                        />
                        <span className={cx('soSao')}>
                            {infoCV.congViec.saoCongViec}
                        </span>
                        <span className={cx('danhGia')}>
                            ({infoCV.congViec.danhGia})
                        </span>
                    </p>
                </div>
            </div>
            <div className={cx('cardBottom')}>sfdhgf</div>
        </div>
    );
};
export default JobItem;
