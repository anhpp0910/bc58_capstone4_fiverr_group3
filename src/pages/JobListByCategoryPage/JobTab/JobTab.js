import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './JobTab.module.scss';
import { useParams } from 'react-router';

import { https } from '../../../services/api';
import JobItem from './JobItem/JobItem';
import FilterBar from './FilterBar/FilterBar';

const cx = classNames.bind(styles);

export default function JobTab() {
    let { chiTietLoaiId } = useParams();

    const [dsCVTheoChiTietLoai, setDSCVTheoChiTietLoai] = useState([]);

    useEffect(() => {
        https
            .get(
                `/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${chiTietLoaiId}`,
            )
            .then((res) => {
                setDSCVTheoChiTietLoai(res.data.content);
            })
            .catch((err) => console.log(err));
    }, [chiTietLoaiId]);

    const renderJobItem = () => {
        return dsCVTheoChiTietLoai.map((CV, index) => {
            return <JobItem key={index} infoCV={CV} />;
        });
    };

    return (
        <div className={cx('wrapper')}>
            <FilterBar dsCVTheoChiTietLoai={dsCVTheoChiTietLoai} />
            <div className={cx('sortByBar')}>
                <p className={cx('title')}>
                    {dsCVTheoChiTietLoai.length} services available
                </p>
                <div>
                    <span className={cx('title')}>Sort by</span>
                    <select>
                        <option>Relevance</option>
                        <option value="bestSelling">Best Selling</option>
                        <option value="newArrivals">New Arrivals</option>
                    </select>
                </div>
            </div>
            <div className={cx('grid grid-cols-4 gap-2')}>
                {renderJobItem()}
            </div>
        </div>
    );
}
