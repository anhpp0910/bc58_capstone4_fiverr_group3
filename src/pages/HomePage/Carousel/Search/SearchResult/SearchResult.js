import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../../../../../components/Avatar/Avatar';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchResult({ jobDetail }) {
    return (
        <NavLink
            to={`/job-detail/${jobDetail.congViec.id}`}
            className={cx('wrapper')}
        >
            <Avatar
                className={cx('sellerAvatar')}
                src={jobDetail.avatar}
                alt={jobDetail.tenNguoiTao}
            />
            <div className={cx('jobInfo')}>
                <p className={cx('jobName')}>
                    {jobDetail.congViec.tenCongViec}
                </p>
                <div className={cx('jobSubInfo')}>
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
                    <p className={cx('price')}>
                        STARTING AT <span>${jobDetail.congViec.giaTien}</span>
                    </p>
                </div>
            </div>
        </NavLink>
    );
}

SearchResult.propTypes = {
    jobDetail: PropTypes.object,
};

export default SearchResult;
