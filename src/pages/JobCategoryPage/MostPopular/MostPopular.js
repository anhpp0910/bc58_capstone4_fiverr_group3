import React from 'react';
import classNames from 'classnames/bind';
import styles from './MostPopular.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MostPopular({ tenLoaiCV }) {
    const popularItems = [
        {
            name: 'Minimalist Logo Design',
            img: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101614/Logo%20design_2x.png',
        },
        {
            name: 'Architecture & Interior Design',
            img: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101618/Architecture%20_%20Interior%20Design_2x.png',
        },
        {
            name: 'Image Editing',
            img: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101624/Photoshop%20Editing_2x.png',
        },
        {
            name: 'NFT Art',
            img: 'https://fiverr-res.cloudinary.com/f_auto,q_auto/v1/attachments/generic_asset/asset/fc6c7b8c1d155625e7878252a09c4437-1653222039380/Nft%20Art%20%281%29.png',
        },
        {
            name: 'T-Shirts & Merchandise',
            img: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101623/T-Shirts%20_%20Merchandise_2x.png',
        },
    ];

    const renderPopularItems = () => {
        return popularItems.map((item) => {
            return (
                <div key={item.name} className={cx('item')}>
                    <img src={item.img} alt={item.name} />
                    <span>{item.name} </span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h3>Most popular in {tenLoaiCV}</h3>
            <div className={cx('content')}>{renderPopularItems()}</div>
        </div>
    );
}

MostPopular.propTypes = {
    tenLoaiCV: PropTypes.string,
};

export default MostPopular;
