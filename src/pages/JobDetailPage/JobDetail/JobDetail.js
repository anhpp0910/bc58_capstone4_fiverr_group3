import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobDetail.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Rate } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../../../components/Avatar/Avatar';
import Button from '../../../components/Button/Button';

const cx = classNames.bind(styles);

const faq = [
    {
        question: 'Do you provide regular updates on order?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        question: 'How do you guarantee product quality and reliability?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        question: 'Do you give post-development support?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        question: 'Do you convert PSD to HTML?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
];

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
                <div className={cx('jobTitle')}>
                    <h2>{jobDetail.congViec?.tenCongViec}</h2>
                </div>
                <div className={cx('sellerInfo1')}>
                    <Avatar
                        className={cx('sellerAvatar')}
                        src={jobDetail.avatar}
                        alt={jobDetail.tenNguoiTao}
                    />
                    <NavLink className={cx('sellerName')}>
                        {jobDetail.tenNguoiTao}
                    </NavLink>
                    <p className={cx('sellerLevel')}>
                        Level {jobDetail.congViec?.nguoiTao} seller
                    </p>
                    <div className={cx('rating')}>
                        <Rate
                            className={cx('rate')}
                            disabled
                            value={jobDetail.congViec?.saoCongViec}
                        />
                        <span className={cx('soSao')}>
                            {jobDetail.congViec?.saoCongViec}
                        </span>
                        <span className={cx('danhGia')}>
                            ({jobDetail.congViec?.danhGia})
                        </span>
                    </div>
                    <p className={cx('queue')}>4 Orders in Queue</p>
                </div>
                <div className={cx('thumbnailImg')}>
                    <img
                        src={jobDetail.congViec?.hinhAnh}
                        alt={jobDetail.congViec?.tenCongViec}
                    />
                </div>
                <div className={cx('aboutGig')}>
                    <h3>About This Gig</h3>
                    <p>{jobDetail.congViec?.moTa}</p>
                </div>
                <div className={cx('aboutSeller')}>
                    <h3>About The Seller</h3>
                    <div className={cx('content')}>
                        <Avatar
                            className={cx('sellerAvatar')}
                            src={jobDetail.avatar}
                            alt={jobDetail.tenNguoiTao}
                        />
                        <div className={cx('sellerInfo2')}>
                            <NavLink className={cx('sellerName')}>
                                {jobDetail.tenNguoiTao}
                            </NavLink>
                            <p className={cx('sellerMajor')}>
                                {jobDetail.tenChiTietLoai}
                            </p>
                            <div className={cx('rating')}>
                                <Rate
                                    className={cx('rate')}
                                    disabled
                                    value={jobDetail.congViec?.saoCongViec}
                                />
                                <span className={cx('soSao')}>
                                    {jobDetail.congViec?.saoCongViec}
                                </span>
                                <span className={cx('danhGia')}>
                                    ({jobDetail.congViec?.danhGia})
                                </span>
                            </div>
                            <Button outline className={cx('contactBtn')}>
                                Contact Me
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('faq')}>
                    <h3>FAQ</h3>
                </div>
            </div>
        </div>
    );
}

JobDetail.propTypes = {
    jobDetail: PropTypes.object,
};

export default JobDetail;
