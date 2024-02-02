import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchResult.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../../Avatar/Avatar';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchResult({ infoCV }) {
    return (
        <NavLink
            to={`/job-detail/${infoCV.congViec.id}`}
            className={cx('wrapper')}
        >
            <Avatar
                className={cx('sellerAvatar')}
                src={infoCV.avatar}
                alt={infoCV.tenNguoiTao}
            />
            <div className={cx('jobInfo')}>
                <p className={cx('jobName')}>{infoCV.congViec.tenCongViec}</p>
                <div className={cx('jobSubInfo')}>
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
                    <p className={cx('price')}>
                        STARTING AT <span>${infoCV.congViec.giaTien}</span>
                    </p>
                </div>
            </div>
        </NavLink>
    );
}

SearchResult.propTypes = {
    infoCV: PropTypes.object,
};

export default SearchResult;
