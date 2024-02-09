import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderTopTransparent.module.scss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import { PopperWrapper } from '../../../../components/Popper/Popper';
import Button from '../../../../components/Button/Button';
import Avatar from '../../../../components/Avatar/Avatar';
import images from '../../../../assets/images';

const cx = classNames.bind(styles);

export default function HeaderTopTransparent() {
    let { user } = useSelector((state) => state.userSlice);

    const handleSignOut = () => {
        // xoá localStorage
        localStorage.removeItem('USER_INFO');
        localStorage.removeItem('USER_TOKEN');
        window.location.reload();
    };

    // Render menu user if signed in else render sign in/join button
    const renderUserMenu = () => {
        if (user) {
            const { id: userId, name: userName, avatar: userAvatar } = user;
            return (
                // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
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
            );
        } else {
            return (
                <>
                    <Button text to="/sign-in" className={cx('signIn')}>
                        Sign in
                    </Button>
                    <Button outline to="/register">
                        Join
                    </Button>
                </>
            );
        }
    };

    // Show different header when scroll down
    const [show, setShow] = useState(true);

    const controlShow = () => {
        if (window.scrollY > 100) {
            setShow(false);
        } else {
            setShow(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', controlShow);
        return () => {
            window.removeEventListener('scroll', controlShow);
        };
    }, []);

    return (
        <>
            {show && (
                <header className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <NavLink className={cx('logo')} to="/">
                            <img src={images.lightLogoHeader} alt="fiverr" />
                        </NavLink>
                        <div className={cx('actions')}>{renderUserMenu()}</div>
                    </div>
                </header>
            )}
        </>
    );
}
