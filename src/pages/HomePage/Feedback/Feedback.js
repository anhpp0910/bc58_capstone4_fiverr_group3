import React from 'react';
import classNames from 'classnames/bind';
import styles from './Feedback.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import VideoModal from '../../../components/VideoModal/VideoModal';

const cx = classNames.bind(styles);

export default function Feedback() {
    const feedbackContent = [
        {
            name: 'Kay Kim, Co-Founder',
            quote: `"It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working."`,
            companyLogo:
                'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/rooted-logo-x2.321d79d.png',
            thumbnailImg: 'https://demo5.cybersoft.edu.vn/img/testimonial1.png',
            video: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw',
        },
        {
            name: 'Caitlin Tormey, Chief Commercial Officer',
            quote: `"We've used Fiverr for Shopify web development, graphic design, and backend web development. Working with Fiverr makes my job a little easier every day."`,
            companyLogo:
                'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/naadam-logo-x2.0a3b198.png',
            thumbnailImg: 'https://demo5.cybersoft.edu.vn/img/testimonial2.png',
            video: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl',
        },
        {
            name: 'Brighid Gannon (DNP, PMHNP-BC), Co-Founder',
            quote: `"We used Fiverr for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world."`,
            companyLogo:
                'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lavender-logo-x2.89c5e2e.png',
            thumbnailImg: 'https://demo5.cybersoft.edu.vn/img/testimonial3.png',
            video: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/rb8jtakrisiz0xtsffwi',
        },
        {
            name: 'Tim and Dan Joo, Co-Founders',
            quote: `"When you want to create a business bigger than yourself, you need a lot of help. That's what Fiverr does."`,
            companyLogo:
                'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/haerfest-logo-x2.03fa5c5.png',
            thumbnailImg: 'https://demo5.cybersoft.edu.vn/img/testimonial4.png',
            video: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun',
        },
    ];

    const settingsSlider = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const renderFeedback = () => {
        return feedbackContent.map((content, index) => {
            return (
                <div key={index} className={cx('inner')}>
                    <VideoModal
                        thumbnailImg={content.thumbnailImg}
                        thumnailAlt={content.name}
                        videoSrc={content.video}
                    />
                    <div className={cx('right')}>
                        <div className={cx('nameLogo')}>
                            <h5>{content.name}</h5>
                            <span className={cx('logo')}>
                                <img
                                    src={content.companyLogo}
                                    alt="companyLogo"
                                />
                            </span>
                        </div>
                        <div className={cx('quote')}>
                            <i>{content.quote}</i>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <Slider {...settingsSlider}>{renderFeedback()}</Slider>
        </div>
    );
}
