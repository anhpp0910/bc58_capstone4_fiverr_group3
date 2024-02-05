import React from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';

import UserAvatar from './UserAvatar';

const cx = classNames.bind(styles);

export default function UserProfile() {
    return (
        <div className={cx('wrapper')}>
            <UserAvatar />
        </div>
    );
}
