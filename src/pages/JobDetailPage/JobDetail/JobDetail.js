import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobDetail.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function JobDetail({ jobDetail }) {
    console.log(jobDetail);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('link')}>
                    <NavLink className={cx('navlink')}>
                        {jobDetail.tenLoaiCongViec}
                    </NavLink>
                    <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faChevronRight}
                    />
                    <NavLink className={cx('navlink')}>
                        {jobDetail.tenNhomChiTietLoai}
                    </NavLink>
                    <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faChevronRight}
                    />
                    <NavLink className={cx('navlink')}>
                        {jobDetail.tenChiTietLoai}
                    </NavLink>
                </div>
                <div className={cx('title')}>
                    {/* <h2>{jobDetail.congViec.tenCongViec}</h2> */}
                </div>
            </div>
        </div>
    );
}

JobDetail.propTypes = {
    jobDetail: PropTypes.object,
};

export default JobDetail;
