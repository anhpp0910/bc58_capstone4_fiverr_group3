import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobTab.module.scss';
import PropTypes from 'prop-types';

import JobItem from './JobItem';

const cx = classNames.bind(styles);

function JobTab({ tenLoaiCV, dsNhomChiTietLoai }) {
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

JobTab.propTypes = {
    tenLoaiCV: PropTypes.string,
    dsNhomChiTietLoai: PropTypes.array,
};

export default JobTab;
