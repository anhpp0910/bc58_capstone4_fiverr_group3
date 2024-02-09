import React from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { useSelector } from 'react-redux';

import UserAvatar from './UserAvatar';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import Button from '../../../components/Button/Button';

const cx = classNames.bind(styles);

export default function UserProfile() {
    let { email, name, phone, birthday, gender, certification, skill } =
        useSelector((state) => state.userSlice.user);

    const renderItem = (field) => {
        return field.map((item, index) => {
            return (
                <Button key={index} round className={cx('item')}>
                    {item}
                </Button>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <UserAvatar />
            <UpdateProfile />
            <div className={cx('userProfile')}>
                <div className={cx('userProfileItem')}>
                    <h5>Email:</h5>
                    <p>{email}</p>
                </div>
                <div className={cx('userProfileItem')}>
                    <h5>Name:</h5>
                    <p>{name}</p>
                </div>
                <div className={cx('userProfileItem')}>
                    <h5>Phone:</h5>
                    <p>{phone}</p>
                </div>
                <div className={cx('userProfileItem')}>
                    <h5>Birthday:</h5>
                    <p>{birthday}</p>
                </div>

                <div className={cx('userProfileItem')}>
                    <h5>Gender:</h5>
                    <p>{gender ? 'Male' : 'Female'}</p>
                </div>
                <div className={cx('certification')}>
                    <h5>Certification:</h5>
                    <div className={cx('certificationContent')}>
                        {renderItem(certification)}
                    </div>
                </div>
                <div className={cx('skill')}>
                    <h5>Skill:</h5>
                    <div className={cx('skillContent')}>
                        {renderItem(skill)}
                    </div>
                </div>
                <div className={cx('userProfileItem')}>
                    <h5>Booking Job:</h5>
                    <p></p>
                </div>
            </div>
        </div>
    );
}
