import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignInPage.module.scss';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import { setUser } from '../../redux/userSlice';
import * as httpsRequest from '../../utils/request';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';

const cx = classNames.bind(styles);

export default function SignInForm() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const handleToRegisterPage = () => {
        navigate('/register');
    };

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    // Handle validation for input field
    let formIsValid = true;
    const [errors, setErrors] = useState({});
    const formValues = { ...values };
    const formErrors = {};

    const handleValidationEmail = () => {
        if (!formValues['email']) {
            formIsValid = false;
            formErrors['email'] = 'Please fill out this field!';
        } else formErrors['email'] = '';
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationPassword = () => {
        if (!formValues['password']) {
            formIsValid = false;
            formErrors['password'] = 'Please fill out this field!';
        } else formErrors['password'] = '';
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidation = () => {
        handleValidationEmail();
        handleValidationPassword();
        return formIsValid;
    };
    // End validation

    const inputs = [
        {
            id: 1,
            name: 'email',
            type: 'text',
            labelIcon: faEnvelope,
            placeholder: 'Your Email',
            errorMessage: errors['email'],
            spellCheck: 'false',
            handleValidation: () => {
                handleValidationEmail();
            },
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            labelIcon: faLock,
            placeholder: 'Your Password',
            errorMessage: errors['password'],
            setEyeIcon: true,
            handleValidation: () => {
                handleValidationPassword();
            },
        },
    ];

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            httpsRequest
                .post('auth/signin', values)
                .then((res) => {
                    // Đẩy data lên redux
                    dispatch(setUser(res.content));
                    // Chuyển hướng user về home sau khi đăng nhập thành công
                    navigate('/');
                    // Lưu data xuống localStorage để user load trang sẽ không mất data
                    let dataJson = JSON.stringify(res.content);
                    localStorage.setItem('USER_INFO', dataJson);
                    message.success({
                        content: 'Sign in sucessfully!',
                        duration: 5,
                        style: {
                            fontSize: '1.6rem',
                            color: 'var(--text-color)',
                            fontFamily: '"Montserrat", sans-serif',
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                    message.error({
                        content: 'Your email or password is incorrect!',
                        duration: 5,
                        style: {
                            fontSize: '1.6rem',
                            color: 'var(--text-color)',
                            fontFamily: '"Montserrat", sans-serif',
                        },
                    });
                });
        }
    };

    return (
        <div className={cx('signInForm')}>
            <h2 className={cx('signInText')}>Sign In to Fiverr</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        type={input.type}
                        value={values[input.name]}
                        onChange={onChange}
                        errorMessage={input.errorMessage}
                        handleValidation={input.handleValidation}
                    />
                ))}

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
