import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { useSelector } from 'react-redux';

import * as httpsRequest from '../../../utils/request';
import Avatar from '../../../components/Avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function UserAvatar() {
    const [newAvatar, setNewAvatar] = useState('');
    let user = useSelector((state) => state.userSlice.user);
    let formData = new FormData();

    const handleUploadAvatar = (e) => {
        let file = URL.createObjectURL(e.target.files[0]);
        setNewAvatar(file);
        // console.log(newAvatar);
        formData = ('formFile', newAvatar);
    };

    useEffect(() => {
        if (newAvatar) {
            httpsRequest
                .post('users/upload-avatar', formData)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }
    }, [newAvatar]);

    return (
        <div className={cx('userAvatar')}>
            <div className={cx('userAvatar2')}>
                <label className={cx('cameraOverlay')} htmlFor="upload">
                    <span>
                        <FontAwesomeIcon icon={faCamera} />
                    </span>
                    <input
                        className={cx('uploadAvatar')}
                        id="upload"
                        type="file"
                        onChange={handleUploadAvatar}
                    />
                </label>
                <Avatar
                    className={cx('userAvatar3')}
                    src={user.avatar}
                    alt={user.name}
                />
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
