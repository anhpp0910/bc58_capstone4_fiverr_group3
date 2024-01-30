import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobTab.module.scss';

import JobItem from './JobItem';

const cx = classNames.bind(styles);

export default function JobTab({ tenLoaiCV, dsNhomChiTietLoai }) {
    const renderDSNhomChiTietLoai = () => {
        if (dsNhomChiTietLoai) {
            return dsNhomChiTietLoai.map((nhomChiTietLoai) => {
                return (
                    <div key={nhomChiTietLoai.id} className={cx('item')}>
                        <img
                            src={nhomChiTietLoai.hinhAnh}
                            alt={nhomChiTietLoai.tenNhom}
                        />
                        <h4>{nhomChiTietLoai.tenNhom}</h4>
                        <JobItem
                            dsChiTietLoai={nhomChiTietLoai.dsChiTietLoai}
                        />
                    </div>
                );
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3>Explore {tenLoaiCV}</h3>
            <div className={cx('content')}>{renderDSNhomChiTietLoai()}</div>
        </div>
    );
}
