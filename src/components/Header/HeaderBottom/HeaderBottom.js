import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderBottom.module.scss';
import Tippy from '@tippyjs/react/headless';
import { NavLink } from 'react-router-dom';

import { https } from '../../../services/api';
import { PopperWrapper } from '../../../components/Popper/Popper';
import JobItem from './JobItem/JobItem';

const cx = classNames.bind(styles);

export default function HeaderBottom() {
    const [menuLoaiCV, setMenuLoaiCV] = useState([]);

    useEffect(() => {
        https
            .get('/api/cong-viec/lay-menu-loai-cong-viec')
            .then((res) => setMenuLoaiCV(res.data.content))
            .catch((err) => console.log(err));
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
        <header className={cx('wrapper')}>
            <div className={cx('inner', 'grid grid-cols-6 gap-5')}>
                {renderMenuLoaiCV()}
            </div>
        </header>
    );
}
