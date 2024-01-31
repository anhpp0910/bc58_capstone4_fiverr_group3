import React from 'react';
import classNames from 'classnames/bind';
import styles from './RelatedServices.module.scss';
import PropTypes from 'prop-types';

import Button from '../../../components/Button/Button';

const cx = classNames.bind(styles);

function RelatedServices({ tenLoaiCV }) {
    const relatedServices = [
        'Minimalist logo design',
        'Signature logo design',
        'Mascot logo design',
        '3D logo design',
        'Hand drawn logo design',
        'Vintage logo design',
        'Remove background',
        'Photo restoration',
        'Photo retouching',
        'Image resize',
        'Product label design',
        'Custom twitch overlay',
        'Custom twitch emotes',
        'Gaming logo',
        'Children book illustration',
        'Instagram design',
        'Movie poster design',
        'Box design',
        'Logo maker',
        'Logo ideas',
    ];

    const renderRelatedServices = () => {
        return relatedServices.map((service) => {
            return (
                <Button key={service} round>
                    {service}
                </Button>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h3>Services Related To {tenLoaiCV}</h3>
            <div>{renderRelatedServices()}</div>
        </div>
    );
}

RelatedServices.propTypes = {
    tenLoaiCV: PropTypes.string,
};

export default RelatedServices;
