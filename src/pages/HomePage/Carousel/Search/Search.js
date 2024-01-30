import React from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import Button from '../../../../components/Button/Button';

const cx = classNames.bind(styles);

export default function Search() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <h1 className={cx('title')}>
                    Find the perfect <i> freelance </i> services for your
                    business
                </h1>
                <form className={cx('search')}>
                    <input
                        placeholder='Try "building mobile app"'
                        spellCheck="false"
                    />
                    <button className={cx('searchBtn')}>Search</button>
                </form>
                <div className={cx('popular')}>
                    <span className={cx('popularText')}>Popular: </span>
                    <Button text className={cx('popularBtn')}>
                        Website Design
                    </Button>
                    <Button text className={cx('popularBtn')}>
                        WordPress
                    </Button>
                    <Button text className={cx('popularBtn')}>
                        Logo Design
                    </Button>
                    <Button text className={cx('popularBtn')}>
                        Video Editing
                    </Button>
                </div>
            </div>
        </div>
    );
}
