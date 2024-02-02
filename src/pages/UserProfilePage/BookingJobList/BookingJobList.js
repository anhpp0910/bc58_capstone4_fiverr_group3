import React from 'react';
import classNames from 'classnames/bind';
import styles from './BookingJobList.module.scss';
import Button from '../../../components/Button/Button';
import JobItem from './JobItem/JobItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuildingUser,
    faChevronRight,
    faClose,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function BookingJobList() {
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
            <div>
                <JobItem />
                <JobItem />
                <JobItem />
                <JobItem />
                <JobItem />
            </div>
        </div>
    );
}
