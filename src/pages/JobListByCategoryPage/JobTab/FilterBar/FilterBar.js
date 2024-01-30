import React from 'react';
import classNames from 'classnames/bind';
import styles from './FilterBar.module.scss';

const cx = classNames.bind(styles);

export default function FilterBar({ dsCVTheoChiTietLoai }) {
    let tenChiTietLoai = dsCVTheoChiTietLoai[0]?.tenChiTietLoai;

    return (
        <div className={cx('wrapper')}>
            <h2>{tenChiTietLoai}</h2>
            <div className={cx('filterBar')}>
                <div className={cx('filterDropdown')}>sfdsfd</div>
                <div className={cx('filterToogle')}>fgfdhfdh</div>
            </div>
        </div>
    );
}
