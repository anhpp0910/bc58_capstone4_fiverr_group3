import React from 'react';
import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss';
import Modal from 'react-modal';

import RegisterForm from './RegisterForm';

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

export default function RegisterPage() {
    return (
        <div>
            <Modal ariaHideApp={false} isOpen={true} style={customStyles}>
                <div className={cx('wrapper')}>
                    <div className={cx('left')}>
                        <RegisterForm />
                    </div>
                    <div className={cx('right')}>
                        <img
                            src="https://demo5.cybersoft.edu.vn/static/media/signup.bd994738c4eb8deb2801.jpg"
                            alt="Sign In Image"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
