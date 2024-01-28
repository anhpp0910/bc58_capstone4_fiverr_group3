import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { https } from '../../service/api';
import classNames from 'classnames/bind';
import styles from './JobCategoryPage.module.scss';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Banner from './Banner/Banner';
import RelatedServices from './RelatedServices/RelatedServices';
import JobCategory from './JobCategory/JobCategory';

const cx = classNames.bind(styles);

export default function JobCategoryPage() {
    let { jobCategoryId } = useParams();

    const [chiTietLoaiCV, setChiTietLoaiCV] = useState([]);

    useEffect(() => {
        https
            .get(`/api/cong-viec/lay-chi-tiet-loai-cong-viec/${jobCategoryId}`)
            .then((res) => {
                setChiTietLoaiCV(res.data.content[0]);
                console.log('id', jobCategoryId);

                console.log('detail', chiTietLoaiCV);
            })
            .catch((err) => console.log(err));
    }, [jobCategoryId]);

    return (
        <div>
            <Header />
            <Banner tenLoaiCV={chiTietLoaiCV.tenLoaiCongViec} />
            <JobCategory />
            <RelatedServices tenLoaiCV={chiTietLoaiCV.tenLoaiCongViec} />
            <Footer />
        </div>
    );
}
