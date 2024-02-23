import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFolderOpen,
    faFolderTree,
    faNoteSticky,
    faSuitcase,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../../../components/Button/Button';
import { PopperWrapper } from '../../../components/Popper/Popper';
import Avatar from '../../../components/Avatar/Avatar';
import images from '../../../assets/images';

const cx = classNames.bind(styles);

export default function AdminPage() {
    let {
        id: userId,
        name: userName,
        avatar: userAvatar,
    } = useSelector((state) => state.userSlice.user);

    const handleSignOut = () => {
        // xoá localStorage
        localStorage.removeItem('USER_INFO');
        localStorage.removeItem('USER_TOKEN');
        window.location.href = '/';
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <NavLink className={cx('logo')} to="/">
                    <img src={images.darkLogoHeader} alt="fiverr" />
                </NavLink>
                <div className={cx('actions')}>
                    <nav>
                        <Button
                            to="/admin/user"
                            text
                            leftIcon={<FontAwesomeIcon icon={faUser} />}
                        >
                            User
                        </Button>
                        <Button
                            to="/admin/job-category"
                            text
                            leftIcon={<FontAwesomeIcon icon={faFolderTree} />}
                        >
                            Job Category
                        </Button>
                        <Button
                            to="/admin/job-sub-category"
                            text
                            leftIcon={<FontAwesomeIcon icon={faFolderOpen} />}
                        >
                            Job Sub Category
                        </Button>
                        <Button
                            to="/admin/job"
                            text
                            leftIcon={<FontAwesomeIcon icon={faSuitcase} />}
                        >
                            Job
                        </Button>
                        <Button
                            to="/admin/booking"
                            text
                            leftIcon={<FontAwesomeIcon icon={faNoteSticky} />}
                        >
                            Booking
                        </Button>
                    </nav>
                    <div>
                        <Tippy
                            hideOnClick="false"
                            interactive="true"
                            placement="bottom"
                            render={(attrs) => (
                                <PopperWrapper>
                                    <div tabIndex="-1" {...attrs}>
                                        <NavLink
                                            to={`/user-profile/${userId}`}
                                            className={cx('userAction')}
                                        >
                                            View profile
                                        </NavLink>
                                        <NavLink
                                            className={cx('userAction')}
                                            onClick={handleSignOut}
                                        >
                                            Sign out
                                        </NavLink>
                                    </div>
                                </PopperWrapper>
                            )}
                        >
                            <Avatar
                                src={userAvatar}
                                alt={userName}
                                className={cx('userAvatar')}
                            />
                        </Tippy>
                    </div>
                </div>
            </div>
        </header>
    );
}
