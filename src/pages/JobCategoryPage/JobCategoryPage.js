import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import * as httpsRequest from '../../utils/request';
import Header from '../../components/Header/Header';
import Banner from './Banner/Banner';
import MostPopular from './MostPopular/MostPopular';
import JobTab from './JobTab/JobTab';
import RelatedServices from './RelatedServices/RelatedServices';
import Footer from '../../components/Footer/Footer';

export default function JobCategoryPage() {
    let { jobCategoryId } = useParams();
    const [chiTietLoaiCV, setChiTietLoaiCV] = useState({});

    useEffect(() => {
        httpsRequest
            .get(`cong-viec/lay-chi-tiet-loai-cong-viec/${jobCategoryId}`)
            .then((res) => {
                setChiTietLoaiCV(res.content[0]);
            })
            .catch((err) => console.log(err));
    }, [jobCategoryId]);

    return (
        <div>
            <Header />
            <Banner tenLoaiCV={chiTietLoaiCV.tenLoaiCongViec} />
            <MostPopular tenLoaiCV={chiTietLoaiCV.tenLoaiCongViec} />
            <JobTab
                tenLoaiCV={chiTietLoaiCV.tenLoaiCongViec}
                dsNhomChiTietLoai={chiTietLoaiCV.dsNhomChiTietLoai}
            />
            <RelatedServices tenLoaiCV={chiTietLoaiCV.tenLoaiCongViec} />
            <Footer />
        </div>
    );
}
