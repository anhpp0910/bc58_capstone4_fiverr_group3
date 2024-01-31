import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobTab.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function JobItem({ dsChiTietLoai }) {
    const renderDSChiTietLoai = () => {
        return dsChiTietLoai.map((chiTietLoai) => {
            return (
                <NavLink
                    key={chiTietLoai.id}
                    to={`/job-list-by-category/${chiTietLoai.id}`}
                    className={cx('chiTietLoaiBtn')}
                >
                    {chiTietLoai.tenChiTiet}
                </NavLink>
            );
        });
    };

    return <div>{renderDSChiTietLoai()}</div>;
}

JobItem.propTypes = {
    dsChiTietLoai: PropTypes.array,
};

export default JobItem;
