import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './JobDetailPage.module.scss';
import { useParams } from 'react-router-dom';

import * as httpsRequest from '../../utils/request';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import JobDetail from './JobDetail/JobDetail';
import CheckOut from './CheckOut/CheckOut';

const cx = classNames.bind(styles);

export default function JobDetailPage() {
    let { jobId } = useParams();
    const [jobDetail, setJobDetail] = useState({});

    useEffect(() => {
        httpsRequest
            .get(`cong-viec/lay-cong-viec-chi-tiet/${jobId}`)
            .then((res) => setJobDetail(res.content[0]))
            .catch((err) => console.log(err));
    }, [jobId]);

    return (
        <div>
            <Header />
            <div className={cx('inner')}>
                <JobDetail jobDetail={jobDetail} />
                <CheckOut jobDetail={jobDetail.congViec} />
            </div>
            <Footer />
        </div>
    );
}
