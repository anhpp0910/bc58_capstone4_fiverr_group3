import React from 'react';
import classNames from 'classnames/bind';
import styles from './SellingProposition.module.scss';

import VideoModal from '../../../components/VideoModal/VideoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

export default function SellingProposition() {
    const SellingProposition = [
        {
            point: 'The best for every budget',
            desc: 'Find high-quality services at every price point. No hourly rates, just project-based pricing.',
        },
        {
            point: 'Quality work done quickly',
            desc: 'Find the right freelancer to begin working on your project within minutes.',
        },
        {
            point: 'Protected payments, every time',
            desc: `Always know what you'll pay upfront. Your payment isn't released until you approve the work.`,
        },
        {
            point: '24/7 support',
            desc: 'Questions? Our round-the-clock support team is available to help anytime, anywhere.',
        },
    ];

    const renderSellingProposition = () => {
        return SellingProposition.map((item, index) => {
            return (
                <div key={index}>
                    <h5>
                        <span className={cx('checkIcon')}>
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </span>
                        {item.point}
                    </h5>
                    <p>{item.desc}</p>
                </div>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <h2>
                        A whole world of freelance talent at your fingertips
                    </h2>
                    {renderSellingProposition()}
                </div>
                <div className={cx('right')}>
                    <VideoModal
                        wholeScreen
                        thumbnailImg="https://demo5.cybersoft.edu.vn/img/selling.png"
                        thumnailAlt="Our Selling Proposition"
                        videoSrc="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7"
                    />
                </div>
            </div>
        </div>
    );
}
