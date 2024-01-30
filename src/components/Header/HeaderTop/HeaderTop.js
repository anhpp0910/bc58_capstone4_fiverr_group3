import React from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderTop.module.scss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../components/Button/Button';
import { PopperWrapper } from '../../../components/Popper/Popper';
import Avatar from '../../../components/Avatar/Avatar';
import images from '../../../assets/images';

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
                    <Button text to="/sign-in">
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
