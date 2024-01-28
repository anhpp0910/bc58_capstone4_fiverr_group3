import React from 'react';
import classNames from 'classnames/bind';
import styles from './RelatedServices.module.scss';
import Button from '../../../components/Button/Button';

const cx = classNames.bind(styles);

export default function RelatedServices({ tenLoaiCV }) {
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
            return <Button round>{service}</Button>;
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Services Related To {tenLoaiCV}</h2>
            <div>{renderRelatedServices()}</div>
        </div>
    );
}
