import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobItem.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function JobItem({ loaiCV }) {
    const dsNhomChiTietLoai = loaiCV.dsNhomChiTietLoai;

    const renderDanhSachCV = () => {
        if (dsNhomChiTietLoai.length > 0) {
            return dsNhomChiTietLoai.map((nhomChiTietLoai) => {
                return (
                    <div key={nhomChiTietLoai.id} className={cx('wrapper')}>
                        <p className={cx('tenNhom')}>
                            {nhomChiTietLoai.tenNhom}
                        </p>
                        {renderChiTietLoai(nhomChiTietLoai.dsChiTietLoai)}
                    </div>
                );
            });
        }
    };

    const renderChiTietLoai = (dsChiTietLoai) => {
        if (dsChiTietLoai.length > 0) {
            return dsChiTietLoai.map((chiTietLoai) => {
                return (
                    <div key={chiTietLoai.id} className={cx('chiTietLoai')}>
                        <NavLink to={`/job-list-by-category/${chiTietLoai.id}`}>
                            {chiTietLoai.tenChiTiet}
                        </NavLink>
                    </div>
                );
            });
        }
    };

    return <>{renderDanhSachCV()}</>;
}

JobItem.propTypes = {
    loaiCV: PropTypes.object,
};

export default JobItem;
