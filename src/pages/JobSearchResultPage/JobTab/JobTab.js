import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './JobTab.module.scss';
import { useParams } from 'react-router';

import * as httpsRequest from '../../../utils/request';
import JobItem from './JobItem/JobItem';
import FilterBar from './FilterBar/FilterBar';

const cx = classNames.bind(styles);

export default function JobTab() {
    let { searchValue } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        httpsRequest
            .get(`cong-viec/lay-danh-sach-cong-viec-theo-ten/${searchValue}`)
            .then((res) => {
                setSearchResults(res.content);
            })
            .catch((err) => console.log(err));
    }, [searchValue]);

    const renderJobItem = () => {
        return searchResults.map((CV) => {
            return <JobItem key={CV.id} infoCV={CV} />;
        });
    };

    return (
        <div className={cx('wrapper')}>
            <FilterBar searchValue={searchValue} />
            <div className={cx('sortByBar')}>
                <p className={cx('title')}>
                    {searchResults.length} services available
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
            <div className={cx('jobTab')}>{renderJobItem()}</div>
        </div>
    );
}
