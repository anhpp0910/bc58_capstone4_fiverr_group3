import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobTab.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function JobItem({ dsChiTietLoai }) {
    const renderDSChiTietLoai = () => {
        return dsChiTietLoai.map((chiTietLoai) => {
            return (
                <NavLink
                    key={chiTietLoai.id}
                    to={`/jobListByCategory/${chiTietLoai.id}`}
                    className={cx('chiTietLoaiBtn')}
                >
                    {chiTietLoai.tenChiTiet}
                </NavLink>
            );
        });
    };

    return <div>{renderDSChiTietLoai()}</div>;
}
