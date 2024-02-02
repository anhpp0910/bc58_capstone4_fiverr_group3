import React from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfilePage.module.scss';

import Header from '../../components/Header/Header';
import UserProfile from './UserProfile/UserProfile';
import Footer from '../../components/Footer/Footer';
import BookingJobList from './BookingJobList/BookingJobList';

const cx = classNames.bind(styles);

export default function UserProfilePage() {
    return (
        <>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <UserProfile />
                    <BookingJobList />
                </div>
            </div>
            <Footer />
        </>
    );
}
