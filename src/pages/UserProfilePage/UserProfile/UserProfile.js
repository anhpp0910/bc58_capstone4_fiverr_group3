import React from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { useSelector } from 'react-redux';

import UserAvatar from './UserAvatar';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import Button from '../../../components/Button/Button';

const cx = classNames.bind(styles);

export default function UserProfile() {
    let user = useSelector((state) => state.userSlice.user);

    return (
        <div className={cx('wrapper')}>
            <UserAvatar />
            <UpdateProfile />
            <div className={cx('userProfile')}>
                <div className={cx('userProfileItem')}>
                    <h5>Email:</h5>
                    <p>{user.email}</p>
                </div>
                <div className={cx('userProfileItem')}>
                    <h5>Name:</h5>
                    <p>{user.name}</p>
                </div>
                <div className={cx('userProfileItem')}>
                    <h5>Phone:</h5>
                    <p>{user.phone}</p>
                </div>
                <div className={cx('userProfileItem')}>
                    <h5>Birthday:</h5>
                    <p>{user.birthday}</p>
                </div>

                <div className={cx('userProfileItem')}>
                    <h5>Gender:</h5>
                    <p>{user.gender ? 'Male' : 'Female'}</p>
                </div>
                <div className={cx('certification')}>
                    <h5>Certification:</h5>
                    <div>
                        {user.certification.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    round
                                    className={cx('certificationItem')}
                                >
                                    {item}
                                </Button>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('skill')}>
                    <h5>Skill:</h5>
                    <div>
                        <Button round className={cx('skillItem')}>
                            JLPT N1
                        </Button>
                        <Button round className={cx('skillItem')}>
                            TOEIC 890
                        </Button>
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
