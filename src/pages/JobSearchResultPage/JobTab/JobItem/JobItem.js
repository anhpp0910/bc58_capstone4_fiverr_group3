import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobItem.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../../components/Button/Button';
import Avatar from '../../../../components/Avatar/Avatar';

const cx = classNames.bind(styles);

function JobItem({ jobDetail }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('cardTop')}>
                <img
                    src={jobDetail.congViec.hinhAnh}
                    alt={jobDetail.congViec.tenCongViec}
                />
            </div>
            <div className={cx('cardBody')}>
                <div className={cx('sellerInfo')}>
                    <Avatar
                        className={cx('sellerAvatar')}
                        src={jobDetail.avatar}
                        alt={jobDetail.tenNguoiTao}
                    />
                    <div>
                        <NavLink className={cx('sellerName')}>
                            {jobDetail.tenNguoiTao}
                        </NavLink>
                        <p className={cx('sellerLevel')}>
                            Level {jobDetail.congViec.nguoiTao} seller
                        </p>
                    </div>
                </div>
                <div className={cx('jobInfo')}>
                    <NavLink to={`/job-detail/${jobDetail.congViec.id}`}>
                        {jobDetail.congViec.tenCongViec}
                    </NavLink>
                    <p className={cx('rating')}>
                        <FontAwesomeIcon
                            icon={faStar}
                            className={cx('starIcon')}
                        />
                        <span className={cx('soSao')}>
                            {jobDetail.congViec.saoCongViec}
                        </span>
                        <span className={cx('danhGia')}>
                            ({jobDetail.congViec.danhGia})
                        </span>
                    </p>
                </div>
            </div>
            <div className={cx('cardBottom')}>
                <Button className={cx('heartIcon')} text>
                    <FontAwesomeIcon icon={faHeart} />
                </Button>
                <p className={cx('price')}>
                    STARTING AT &nbsp;{' '}
                    <span>${jobDetail.congViec.giaTien}</span>
                </p>
            </div>
        </div>
    );
}

JobItem.propTypes = {
    jobDetail: PropTypes.object,
};

export default JobItem;
