import React from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfile.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

import * as httpsRequest from '../../../utils/request';
import { setUser } from '../../../redux/userSlice';
import Avatar from '../../../components/Avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function UserAvatar() {
    let dispatch = useDispatch();
    let user = useSelector((state) => state.userSlice.user);

    const handleGetUserProfile = () => {
        httpsRequest
            .get(`users/${user.id}`)
            .then((res) => {
                // Đẩy data lên redux
                dispatch(setUser(res.content));
                // Lưu data xuống localStorage để user load trang sẽ không mất data
                let userInfo = JSON.stringify(res.content);
                localStorage.setItem('USER_INFO', userInfo);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUploadAvatar = (e) => {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('formFile', file);
        httpsRequest
            .post('users/upload-avatar', formData)
            .then((res) => {
                handleGetUserProfile();
                message.success({
                    content: 'Avatar updated!',
                    duration: 5,
                    style: {
                        fontSize: '1.6rem',
                        color: 'var(--text-color)',
                        fontFamily: '"Montserrat", sans-serif',
                    },
                });
            })
            .catch((err) => {
                console.log(err);
                message.error({
                    content: err.response.data.content,
                    duration: 5,
                    style: {
                        fontSize: '1.6rem',
                        color: 'var(--text-color)',
                        fontFamily: '"Montserrat", sans-serif',
                    },
                });
            });
    };

    return (
        <div className={cx('userAvatarWrapper')}>
            <div className={cx('userAvatarInner')}>
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
                    className={cx('userAvatar')}
                    src={user.avatar}
                    alt={user.name}
                />
            </div>
        </div>
    );
}
