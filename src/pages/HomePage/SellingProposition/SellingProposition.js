import React from 'react';
import classNames from 'classnames/bind';
import styles from './SellingProposition.module.scss';

import VideoModal from '../../../components/VideoModal/VideoModal';

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
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z"></path>
                                <path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z"></path>
                            </svg>
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
            <div className={cx('inner', 'grid grid-cols-3')}>
                <div className={cx('left')}>
                    <h2>
                        A whole world of freelance talent at your fingertips
                    </h2>
                    {renderSellingProposition()}
                </div>
                <div className={cx('right', 'col-span-2 flex justify-end')}>
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
