import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderBottom.module.scss';
import Tippy from '@tippyjs/react/headless';
import { NavLink } from 'react-router-dom';

import * as httpsRequest from '../../../../utils/request';
import { PopperWrapper } from '../../../../components/Popper/Popper';
import JobItem from './JobItem/JobItem';

const cx = classNames.bind(styles);

export default function HeaderBottom() {
    const [menuLoaiCV, setMenuLoaiCV] = useState([]);

    useEffect(() => {
        httpsRequest
            .get('cong-viec/lay-menu-loai-cong-viec')
            .then((res) => setMenuLoaiCV(res.content))
            .catch((err) => console.log(err));
    }, []);

    const [show, setShow] = useState(false);

    const controlShow = () => {
        if (window.scrollY > 50) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', controlShow);
        return () => {
            window.removeEventListener('scroll', controlShow);
        };
    }, []);

    const renderMenuLoaiCV = () => {
        return menuLoaiCV.map((loaiCV) => {
            return (
                // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
                <div key={loaiCV.id}>
                    <Tippy
                        interactive="true"
                        placement="bottom"
                        render={(attrs) => (
                            <PopperWrapper>
                                <div
                                    className={cx('jobCategoryItem')}
                                    tabIndex="-1"
                                    {...attrs}
                                >
                                    <JobItem loaiCV={loaiCV} />
                                </div>
                            </PopperWrapper>
                        )}
                    >
                        <NavLink
                            to={`/job-category/${loaiCV.id}`}
                            className={cx('jobCategory')}
                        >
                            {loaiCV.tenLoaiCongViec}
                        </NavLink>
                    </Tippy>
                </div>
            );
        });
    };

    return (
        <>
            {show && (
                <header className={cx('wrapper')}>
                    <div className={cx('inner')}>{renderMenuLoaiCV()}</div>
                </header>
            )}
        </>
    );
}
