import React from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderTop.module.scss';
import images from '../../../assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button/Button';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function HeaderTop() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <NavLink className={cx('logo')} to="/">
                    <img src={images.logoHeader} alt="fiverr" />
                </NavLink>
                <div className={cx('search')}>
                    <input
                        placeholder="What service are you looking for?"
                        spellCheck="false"
                    />
                    <button className={cx('searchBtn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
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
                    <Button text>Explore</Button>
                    <Button text to="/register">
                        Sign in
                    </Button>
                    <Button outline to="/login">
                        Join
                    </Button>
                </div>
            </div>
        </header>
    );
}
