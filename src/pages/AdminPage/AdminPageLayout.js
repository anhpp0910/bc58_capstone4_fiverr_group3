import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from './Header/Header';

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
                    duration: 5,
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
                <Outlet />
            </>
        )
    );
}
