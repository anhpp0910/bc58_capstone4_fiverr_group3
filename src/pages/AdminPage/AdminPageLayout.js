import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminPageLayout.module.scss';
import { Outlet } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from './Header/Header';

const cx = classNames.bind(styles);

export default function AdminPageLayout() {
    const navigate = useNavigate();
    const hasRunEffect = useRef(false);
    const { user } = useSelector((state) => state.userSlice);

    useEffect(() => {
        // kiểm tra user có phải là admin không
        if (!user || user.role !== 'ADMIN') {
            if (!hasRunEffect.current) {
                // Only run this block once
                navigate('/');
                message.error({
                    content: 'Unauthorized!',
                    duration: 3,
                    style: {
                        fontSize: '1.6rem',
                        color: 'var(--text-color)',
                        fontFamily: '"Montserrat", sans-serif',
                    },
                });
                hasRunEffect.current = true;
            }
        }
    }, [user, navigate]);

    return (
        user &&
        user.role == 'ADMIN' && (
            <>
                <Header />
                <div className={cx('outletWrapper')}>
                    <Outlet />
                </div>
            </>
        )
    );
}
