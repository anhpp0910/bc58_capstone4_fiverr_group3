import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './HeaderTopTransparent.module.scss';
import images from '../../../../assets/images';
import Button from '../../../../components/Button/Button';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { PopperWrapper } from '../../../../components/Popper/Popper';
import Avatar from '../../../../components/Avatar/Avatar';

const cx = classNames.bind(styles);

export default function HeaderTopActive() {
    let { user } = useSelector((state) => state.userSlice);

    const handleSignOut = () => {
        // xoá localStorage
        localStorage.removeItem('USER_INFO');
        window.location.reload();
    };

    // Render menu user if signed in else render sign in/join button
    const renderUserMenu = () => {
        if (user) {
            const {
                id: userId,
                name: userName,
                avatar: userAvatar,
            } = user.user;
            return (
                <Tippy
                    interactive="true"
                    placement="bottom"
                    render={(attrs) => (
                        <PopperWrapper>
                            <div tabIndex="-1" {...attrs}>
                                <NavLink
                                    to={`/userProfile/${userId}`}
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
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlmDNpxHtYYbGJmNIyUVxlfNRZmvQiHMYY6g&usqp=CAU"
                        alt={userName}
                        className={cx('userAvatar')}
                    />
                </Tippy>
            );
        } else {
            return (
                <>
                    <Button text to="/signIn" className={cx('signIn')}>
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
        if (window.scrollY > 50) {
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
