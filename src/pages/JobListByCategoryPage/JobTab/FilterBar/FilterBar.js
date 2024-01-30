import React from 'react';
import classNames from 'classnames/bind';
import styles from './FilterBar.module.scss';

import Dropdown from '../../../../components/Dropdown/Dropdown';
import Toogle from '../../../../components/Toogle/Toggle';

const cx = classNames.bind(styles);

export default function FilterBar({ dsCVTheoChiTietLoai }) {
    let tenChiTietLoai = dsCVTheoChiTietLoai[0]?.tenChiTietLoai;

    return (
        <div className={cx('wrapper')}>
            <h2>{tenChiTietLoai}</h2>
            <div className={cx('filterBar')}>
                <div className={cx('filterDropdown')}>
                    <Dropdown>Category</Dropdown>
                    <Dropdown>Service Options</Dropdown>
                    <Dropdown>Seller Details</Dropdown>
                    <Dropdown>Delivery Time</Dropdown>
                </div>
                <div className={cx('filterToogle')}>
                    <div>
                        <Toogle />
                        <span className={cx('title')}>Pro services</span>
                    </div>
                    <div>
                        <Toogle />
                        <span className={cx('title')}>Local sellers</span>
                    </div>
                    <div>
                        <Toogle />
                        <span className={cx('title')}>Online sellers</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
