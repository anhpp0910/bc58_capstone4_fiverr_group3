import React from 'react';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../components/Button/Button';

const cx = classNames.bind(styles);

function Banner({ tenLoaiCV }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <h1>{tenLoaiCV}</h1>
                    <p>Designs to make you stand out.</p>
                    <Button
                        className={cx('howFiverrWorksBtn')}
                        leftIcon={<FontAwesomeIcon icon={faCirclePlay} />}
                    >
                        How Fiverr Works
                    </Button>
                </div>
            </div>
        </div>
    );
}

Banner.propTypes = {
    tenLoaiCV: PropTypes.string,
};

export default Banner;
