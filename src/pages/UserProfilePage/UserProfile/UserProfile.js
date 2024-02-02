import React from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { useSelector } from 'react-redux';

import * as httpsRequest from '../../../utils/request';
import Avatar from '../../../components/Avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function UserProfile() {
    let { user } = useSelector((state) => state.userSlice.user);

    const handleChangeAvatar = (e) => {
        let file = URL.createObjectURL(e.target.files[0]);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('profileAvatar')}>
                <div className={cx('profileAvatar2')}>
                    <label className={cx('cameraOverlay')} htmlFor="upload">
                        <span>
                            <FontAwesomeIcon icon={faCamera} />
                        </span>
                        <input
                            className={cx('uploadAvatar')}
                            id="upload"
                            type="file"
                            // onChange={handleChangeAvatar}
                        />
                    </label>
                    <Avatar
                        className={cx('userAvatar')}
                        src={user.avatar}
                        alt={user.name}
                    />
                </div>
            </div>
        </div>
    );
}

// Avatar
// Post đẩy hình lên API
// Đẩy data lên redux
// Load lại trang

// Info
//
