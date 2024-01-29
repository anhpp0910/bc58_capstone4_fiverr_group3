import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { https } from '../../../service/api';
import classNames from 'classnames/bind';
import styles from './JobTab.module.scss';
import JobItem from './JobItem/JobItem';

const cx = classNames.bind(styles);

export default function JobTab() {
    let { chiTietLoaiId } = useParams();
    console.log('chiTietLoaiId: ', chiTietLoaiId);

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
        <div className={cx('wrapper', 'grid grid-cols-4 gap-2')}>
            {renderJobItem()}
        </div>
    );
}
