import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../../utils/request';
import Button from '../../../../components/Button/Button';
import { PopperWrapper } from '../../../../components/Popper/Popper';
import SearchResult from './SearchResult/SearchResult';
import { useDebounce } from '../../../../hooks';

const cx = classNames.bind(styles);

export default function Search() {
    let navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        httpsRequest
            .get(`cong-viec/lay-danh-sach-cong-viec-theo-ten/${debouncedValue}`)
            .then((res) => {
                setSearchResults(res.content);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [debouncedValue]);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const renderSearchResults = () => {
        return searchResults.slice(0, 3).map((result) => {
            return <SearchResult key={result.id} jobDetail={result} />;
        });
    };

    const handleToJobSearchResultPage = (searchValue) => {
        if (searchValue) {
            navigate(`/job-search-result/${searchValue}`);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResults([]);
        inputRef.current.focus();
    };

    const handleHideResults = () => {
        setShowResults(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                <h1 className={cx('title')}>
                    Find the perfect <i> freelance </i> services for your
                    business
                </h1>
                {/* Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context. */}
                <div>
                    <Tippy
                        visible={showResults && searchResults.length > 0}
                        interactive="true"
                        placement="bottom-start"
                        onClickOutside={handleHideResults}
                        render={(attrs) => (
                            <div
                                className={cx('searchResult')}
                                tabIndex="-1"
                                {...attrs}
                            >
                                <PopperWrapper>
                                    {renderSearchResults()}
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <form className={cx('search')}>
                            <input
                                ref={inputRef}
                                value={searchValue}
                                placeholder='Try "building mobile app"'
                                spellCheck="false"
                                onChange={handleChange}
                            />
                            {!!searchValue && !loading && (
                                <button
                                    className={cx('clear')}
                                    onClick={handleClear}
                                >
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            )}
                            {loading && (
                                <FontAwesomeIcon
                                    className={cx('loading')}
                                    icon={faSpinner}
                                />
                            )}
                            <button
                                className={cx('searchBtn')}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleToJobSearchResultPage(searchValue);
                                }}
                            >
                                Search
                            </button>
                        </form>
                    </Tippy>
                </div>
                <div className={cx('popular')}>
                    <span className={cx('popularText')}>Popular: </span>
                    <Button text className={cx('popularBtn')}>
                        Website Design
                    </Button>
                    <Button text className={cx('popularBtn')}>
                        WordPress
                    </Button>
                    <Button text className={cx('popularBtn')}>
                        Logo Design
                    </Button>
                    <Button text className={cx('popularBtn')}>
                        Video Editing
                    </Button>
                </div>
            </div>
        </div>
    );
}
