import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './BookingJobList.module.scss';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuildingUser,
    faChevronRight,
    faClose,
} from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../utils/request';
import Button from '../../../components/Button/Button';
import JobItem from './JobItem/JobItem';

const cx = classNames.bind(styles);

export default function BookingJobList() {
    const [dsCVDaThue, setDSCVDaThue] = useState([]);

    useEffect(() => {
        getDSCVDaThue();
    }, []);

    const getDSCVDaThue = () => {
        httpsRequest
            .get('thue-cong-viec/lay-danh-sach-da-thue')
            .then((res) => setDSCVDaThue(res.content))
            .catch((err) => console.log(err));
    };

    const renderDSCVDaThue = () => {
        return dsCVDaThue.map((CV) => {
            return (
                <JobItem key={CV.id} detailCVDaThue={CV} deleteCV={deleteCV} />
            );
        });
    };

    const deleteCV = (id) => {
        httpsRequest
            ._delete(`thue-cong-viec/${id}`)
            .then((res) => {
                getDSCVDaThue();
                message.success({
                    content: 'Your booking has been deleted!',
                    duration: 5,
                    style: {
                        fontSize: '1.6rem',
                        color: 'var(--text-color)',
                        fontFamily: '"Montserrat", sans-serif',
                    },
                });
            })
            .catch((err) => {
                console.log(err);
                message.error({
                    content: 'Delete failed! Please try again!',
                    duration: 5,
                    style: {
                        fontSize: '1.6rem',
                        color: 'var(--text-color)',
                        fontFamily: '"Montserrat", sans-serif',
                    },
                });
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('buyServices')}>
                <div className={cx('closeBtn')}>
                    <span>
                        <FontAwesomeIcon icon={faClose} />
                    </span>
                </div>
                <div className={cx('content')}>
                    <div className={cx('buildingIcon')}>
                        <span>
                            <FontAwesomeIcon icon={faBuildingUser} />
                        </span>
                    </div>
                    <div>
                        <p className={cx('text')}>
                            <strong>Buying services for work?</strong>
                            &nbsp; Help us tailor your experiences to fit your
                            needs.
                        </p>
                        <Button
                            className={cx('tellUsMore')}
                            text
                            rightIcon={
                                <FontAwesomeIcon icon={faChevronRight} />
                            }
                        >
                            Tell us more about your business
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('gig')}>
                <p>
                    It seems that you don't have any active Gigs. Get selling!
                </p>
                <Button primary>Create a New Gig</Button>
            </div>
            <div>{renderDSCVDaThue()}</div>
        </div>
    );
}
