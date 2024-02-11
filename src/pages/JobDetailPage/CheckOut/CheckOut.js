import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CheckOut.module.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faArrowsSpin, faCheck } from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../utils/request';
import Button from '../../../components/Button/Button';

const cx = classNames.bind(styles);

function CheckOut({ jobDetail }) {
    let user = useSelector((state) => state.userSlice.user);

    const BASIC = 'Basic';
    const STANDARD = 'Standard';
    const PREMIUM = 'Premium';

    const handleCheckOut = () => {
        if (user) {
            let thongTinCongViec = {
                maCongViec: jobDetail.id,
                maNguoiThue: user.id,
                ngayThue: new Date(),
            };
            httpsRequest
                .post('thue-cong-viec', thongTinCongViec)
                .then((res) => {
                    message.success({
                        content: 'Thank you! Your booking is successful!',
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
                        content:
                            'Booking failed! Please check your account and try again!',
                        duration: 5,
                        style: {
                            fontSize: '1.6rem',
                            color: 'var(--text-color)',
                            fontFamily: '"Montserrat", sans-serif',
                        },
                    });
                });
        } else {
            message.warning({
                content: `You are not signed in yet. Please sign in to continue!`,
                duration: 5,
                style: {
                    fontSize: '1.6rem',
                    color: 'var(--text-color)',
                    fontFamily: '"Montserrat", sans-serif',
                },
            });
        }
    };

    const renderTabContent = (serviceType) => {
        if (jobDetail) {
            return (
                <>
                    <div className={cx('price')}>
                        <p>{serviceType}</p>
                        <span>${jobDetail.giaTien}</span>
                    </div>
                    <div className={cx('desc')}>{jobDetail.moTaNgan}</div>
                    <div className={cx('subDesc')}>
                        <p>
                            <span>
                                <FontAwesomeIcon icon={faClock} />
                            </span>
                            30 Days Delivery
                        </p>
                        <p>
                            <span>
                                <FontAwesomeIcon icon={faArrowsSpin} />
                            </span>
                            1 Revision
                        </p>
                    </div>
                    <div className={cx('features')}>
                        <p>
                            <span className={cx('checked')}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            Design Customization
                        </p>
                        <p>
                            <span>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            Content Upload
                        </p>
                        <p>
                            <span className={cx('checked')}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            Responsive Design
                        </p>
                        <p>
                            <span className={cx('checked')}>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            Include Source Code
                        </p>
                        <p>
                            <span>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            1 Page
                        </p>
                    </div>
                    <div className={cx('btn')}>
                        <Button primary onClick={handleCheckOut}>
                            Continue (${jobDetail.giaTien})
                        </Button>
                        <Button text className={cx('compare')}>
                            Compare Packages
                        </Button>
                    </div>
                </>
            );
        } else return;
    };

    const tabs = [
        { id: '1', tabTitle: BASIC, tabContent: renderTabContent(BASIC) },
        {
            id: '2',
            tabTitle: STANDARD,
            tabContent: renderTabContent(STANDARD),
        },
        {
            id: '3',
            tabTitle: PREMIUM,
            tabContent: renderTabContent(PREMIUM),
        },
    ];

    const [visibleTab, setVisibleTab] = useState(tabs[0].id);

    const listTitles = tabs.map((item) => (
        <div
            key={item.id}
            onClick={() => setVisibleTab(item.id)}
            className={
                visibleTab === item.id
                    ? cx('tabTitle', 'active')
                    : cx('tabTitle')
            }
        >
            {item.tabTitle}
        </div>
    ));

    const listContent = tabs.map((item) => (
        <div
            key={item.id}
            style={visibleTab === item.id ? {} : { display: 'none' }}
        >
            {item.tabContent}
        </div>
    ));

    return jobDetail ? (
        <div className={cx('wrapper')}>
            <div className={cx('checkOutTab')}>
                <div className={cx('tabTitles')}>{listTitles}</div>
                <div className={cx('tabContent')}>{listContent}</div>
            </div>
            <div className={cx('requirements')}>
                <strong>Do you have any special requirements?</strong>
                <div>
                    <Button outline>Get a Quote</Button>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
}

CheckOut.propTypes = {
    jobDetail: PropTypes.object,
};

export default CheckOut;
