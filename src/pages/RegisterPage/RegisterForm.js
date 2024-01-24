import React from 'react';
import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss';
import { Form, Input, message } from 'antd';
import { https } from '../../service/api';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function SignInForm() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const onFinish = (values) => {
        https
            .post('/api/auth/signin', values)
            .then((res) => {
                // Đẩy data lên redux
                dispatch(setUser(res.data.content));
                // Chuyển hướng user về home sau khi đăng nhập thành công
                navigate('/');
                // Lưu data xuống localStorage để user load trang sẽ không mất data
                let dataJson = JSON.stringify(res.data.content);
                localStorage.setItem('USER_INFO', dataJson);
                message.success(res.data.message);
            })
            .catch((err) => {
                console.log(err);
                message.error(err.response.data.content);
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleToSignInPage = () => {
        navigate('/signIn');
    };

    return (
        <div className={cx('registerForm')}>
            <h2 className={cx('registerText')}>Register</h2>
            <form>
                <div className={cx('inputField')}>
                    <label htmlFor="email">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </label>
                    <input
                        type="text"
                        placeholder="Your Email"
                        spellCheck="false"
                    />
                </div>

                <div className={cx('inputField')}>
                    <label htmlFor="password">
                        <FontAwesomeIcon icon={faLock} />
                    </label>
                    <input type="password" placeholder="Your Password" />
                </div>
                <div className={cx('inputField')}>
                    <label htmlFor="email">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input
                        type="text"
                        placeholder="Your Email"
                        spellCheck="false"
                    />
                </div>
                <div className={cx('inputField')}>
                    <label htmlFor="email">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input
                        type="text"
                        placeholder="Your Email"
                        spellCheck="false"
                    />
                </div>
                <div className={cx('inputField')}>
                    <label htmlFor="email">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input
                        type="text"
                        placeholder="Your Email"
                        spellCheck="false"
                    />
                </div>
                <div className={cx('inputField')}>
                    <label htmlFor="email">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input
                        type="text"
                        placeholder="Your Email"
                        spellCheck="false"
                    />
                </div>
                <div className={cx('inputField')}>
                    <label htmlFor="email">
                        <FontAwesomeIcon icon={faUser} />
                    </label>
                    <input
                        type="text"
                        placeholder="Your Email"
                        spellCheck="false"
                    />
                </div>
                <div className={cx('btn')}>
                    <Button primary>Submit</Button>
                    <div>
                        <span className={cx('isMember')}>
                            Already a member?
                        </span>
                        <Button outline onClick={handleToSignInPage}>
                            Sign in
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
