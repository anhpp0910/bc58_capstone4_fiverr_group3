import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HeaderTop.module.scss';
import images from '../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/Button/Button';
import Tippy from '@tippyjs/react/headless';
import { PopperWrapper } from '../../../components/Popper/Popper';
import Avatar from '../../../components/Avatar/Avatar';

const cx = classNames.bind(styles);

export default function HeaderTop() {
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
                    <Button text to="/signIn">
                        Sign in
                    </Button>
                    <Button outline to="/register">
                        Join
                    </Button>
                </>
            );
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <NavLink className={cx('logo')} to="/">
                    <img src={images.darkLogoHeader} alt="fiverr" />
                </NavLink>
                <form className={cx('search')}>
                    <input
                        placeholder="What service are you looking for today?"
                        spellCheck="false"
                    />
                    <button className={cx('searchBtn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
                <div className={cx('actions')}>
                    <Button text className={cx('active')}>
                        Fiverr Business
                    </Button>
                    <Button text>Explore</Button>
                    <Button text leftIcon={<FontAwesomeIcon icon={faGlobe} />}>
                        English
                    </Button>
                    <Button text>US$ USD</Button>
                    <Button text>Become a Seller</Button>
                    {renderUserMenu()}
                </div>
            </div>
        </header>
    );
}