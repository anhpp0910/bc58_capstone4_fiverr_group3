import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

export default function Search() {
    let navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');

    const handleToJobSearchResultPage = (searchValue) => {
        if (searchValue) {
            navigate(`/job-search-result/${searchValue}`);
        }
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <form className={cx('search')}>
            <input
                value={searchValue}
                placeholder="What service are you looking for today?"
                spellCheck="false"
                onChange={handleChange}
            />
            <button
                className={cx('searchBtn')}
                onClick={(e) => {
                    e.preventDefault();
                    handleToJobSearchResultPage(searchValue);
                }}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    );
}
