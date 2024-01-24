import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderTop.module.scss';
import images from '../../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../../components/Button/Button';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function HeaderTop() {
    const [show, setShow] = useState(false);

    const controlShow = () => {
        if (window.scrollY > 50) {
            setShow(true);
        } else {
            setShow(false);
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
                            <img src={images.darkLogoHeader} alt="fiverr" />
                        </NavLink>
                        <form className={cx('search')}>
                            <input
                                placeholder="What service are you looking for?"
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
                            <Button
                                text
                                leftIcon={<FontAwesomeIcon icon={faGlobe} />}
                            >
                                English
                            </Button>
                            <Button text>US$ USD</Button>
                            <Button text>Become a Seller</Button>
                            <Button text>Explore</Button>
                            <Button text to="/signIn">
                                Sign in
                            </Button>
                            <Button outline to="/register">
                                Join
                            </Button>
                        </div>
                    </div>
                </header>
            )}
        </>
    );
}
