import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobItem.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../../components/Button/Button';
import Avatar from '../../../../components/Avatar/Avatar';

const cx = classNames.bind(styles);

const JobItem = ({ infoCV }) => {
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
                            className={cx('starIcon')}
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
            <div className={cx('cardBottom')}>
                <Button
                    className={cx('heartIcon')}
                    text
                    leftIcon={<FontAwesomeIcon icon={faHeart} />}
                ></Button>
                <p className={cx('price')}>
                    STARTING AT &nbsp; <span>${infoCV.congViec.giaTien}</span>
                </p>
            </div>
        </div>
    );
};
export default JobItem;
