import React from 'react';
import classNames from 'classnames/bind';
import styles from './SignInPage.module.scss';
import Modal from 'react-modal';

import SignInForm from './SignInForm';

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid rgba(0,0,0,.05)',
        borderRadius: '20px',
        boxShadow: '0 15px 16.83px 0.17px rgba(0,0,0,.05)',
    },
};

export default function SignInPage() {
    return (
        <div>
            <Modal isOpen={true} style={customStyles}>
                <div className={cx('wrapper', 'grid grid-cols-2')}>
                    <div className={cx('left')}>
                        <img
                            src="https://demo5.cybersoft.edu.vn/static/media/signin.6f1c72291c1ec0817ded.jpg"
                            alt="Sign In"
                        />
                    </div>
                    <div className={cx('right')}>
                        <SignInForm />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
