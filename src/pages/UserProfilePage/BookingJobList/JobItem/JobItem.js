import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobItem.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../../components/Button/Button';

const cx = classNames.bind(styles);

function JobItem({ detailCVDaThue }) {
    console.log(detailCVDaThue);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img
                    src={detailCVDaThue.congViec.hinhAnh}
                    alt={detailCVDaThue.congViec.tenCongViec}
                />
                <div className={cx('jobDetail')}>
                    <strong className={cx('tenCongViec')}>
                        {detailCVDaThue.congViec.tenCongViec}
                    </strong>
                    <p className={cx('moTaNgan')}>
                        {detailCVDaThue.congViec.moTaNgan}
                    </p>
                    <div className={cx('jobSubDetail')}>
                        <p className={cx('rating')}>
                            <FontAwesomeIcon
                                icon={faStar}
                                className={cx('starIcon')}
                            />
                            <span className={cx('soSao')}>
                                {detailCVDaThue.congViec.saoCongViec}
                            </span>
                            <span className={cx('danhGia')}>
                                ({detailCVDaThue.congViec.danhGia})
                            </span>
                        </p>
                        <p className={cx('price')}>
                            STARTING AT{' '}
                            <span>${detailCVDaThue.congViec.giaTien}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className={cx('btn')}>
                <Button
                    primary
                    to={`/job-detail/${detailCVDaThue.congViec.id}`}
                >
                    View detail
                </Button>
                <Button danger>Delete</Button>
            </div>
        </div>
    );
}

JobItem.propTypes = {
    detailCVDaThue: PropTypes.object,
};

export default JobItem;
