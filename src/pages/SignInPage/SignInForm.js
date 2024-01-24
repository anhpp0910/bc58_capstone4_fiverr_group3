import React from 'react';
import classNames from 'classnames/bind';
import styles from './SignInPage.module.scss';
import { Form, Input, message } from 'antd';
import { https } from '../../service/api';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

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

    const handleToRegisterPage = () => {
        navigate('/register');
    };

    return (
        <div className={cx('signInForm')}>
            <h2 className={cx('signInText')}>Sign In to Fiverr</h2>
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
                <div className={cx('btn')}>
                    <Button primary>Sign in</Button>
                    <div>
                        <span className={cx('isMember')}>
                            Not a member yet?
                        </span>
                        <Button outline onClick={handleToRegisterPage}>
                            Join now
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
