import React, { useState, useEffect, Fragment } from 'react';
import { https } from '../../../service/api';
import classNames from 'classnames/bind';
import styles from './HeaderBottom.module.scss';
import Tippy from '@tippyjs/react/headless';
import { NavLink } from 'react-router-dom';
import { PopperWrapper } from '../../Popper/Popper';
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
                <Tippy
                    interactive="true"
                    placement="bottom"
                    key={loaiCV.id}
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
                        text
                        to="/jobCategory"
                        className={cx('jobCategory')}
                    >
                        {loaiCV.tenLoaiCongViec}
                    </NavLink>
                </Tippy>
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
