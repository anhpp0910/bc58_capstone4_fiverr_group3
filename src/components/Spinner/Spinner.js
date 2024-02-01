import React from 'react';
import { useSelector } from 'react-redux';
import { MoonLoader } from 'react-spinners';

export default function Spinner() {
    let { isLoading } = useSelector((state) => state.spinnerSlice);

    return isLoading ? (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                background: 'var(--white)',
                top: 0,
                left: 0,
                zIndex: 10002,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <MoonLoader
                color="var(--primary)"
                loading
                size="150px"
                speedMultiplier="0.5"
            />
        </div>
    ) : (
        <></>
    );
}
