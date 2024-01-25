import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignInPage.module.scss';
import { message } from 'antd';
import { https } from '../../service/api';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import Button from '../../components/Button/Button';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
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
    const [errors, setErrors] = useState({});

    const inputs = [
        {
            id: 1,
            name: 'email',
            type: 'text',
            labelIcon: faEnvelope,
            placeholder: 'Your Email',
            errorMessage: errors['email'],
            spellcheck: 'false',
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            labelIcon: faLock,
            placeholder: 'Your Password',
            errorMessage: errors['password'],
            setEyeIcon: true,
        },
    ];

    const handleValidation = () => {
        const formValues = { ...values };
        const formErrors = {};
        let formIsValid = true;

        // Email
        if (!formValues['email']) {
            formIsValid = false;
            formErrors['email'] = 'Please fill out this field!';
        }

        // Password
        if (!formValues['password']) {
            formIsValid = false;
            formErrors['password'] = 'Please fill out this field!';
        }

        setErrors(formErrors);
        return formIsValid;
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
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
                    message.success('Sign in sucessfully!');
                })
                .catch((err) => {
                    console.log(err);
                    message.error('Your email or password is incorrect!');
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
