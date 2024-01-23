import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderTopTransparent.module.scss';
import images from '../../../assets/images';
import Button from '../../Button/Button';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function HeaderTopActive() {
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
                        <div className={cx('actions')}>
                            <Button
                                text
                                to="/register"
                                className={cx('signIn')}
                            >
                                Sign in
                            </Button>
                            <Button outline to="/login">
                                Join
                            </Button>
                        </div>
                    </div>
                </header>
            )}
        </>
    );
}
