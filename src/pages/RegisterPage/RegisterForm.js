import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss';
import { message } from 'antd';
import { https } from '../../service/api';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCake,
    faEnvelope,
    faKey,
    faLock,
    faPhone,
    faUser,
    faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import FormInput from '../../components/FormInput/FormInput';

const cx = classNames.bind(styles);

export default function SignInForm() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const handleToSignInPage = () => {
        navigate('/signIn');
    };

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        birthday: '',
        gender: true,
        role: 'string',
        skill: ['string'],
        certification: ['string'],
    });
    const [errors, setErrors] = useState({});

    const inputs = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            labelIcon: faUser,
            placeholder: 'Your Name',
            errorMessage: errors['name'],
            spellcheck: 'false',
        },
        {
            id: 2,
            name: 'email',
            type: 'text',
            labelIcon: faEnvelope,
            placeholder: 'Your Email',
            errorMessage: errors['email'],
            spellcheck: 'false',
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            labelIcon: faLock,
            placeholder: 'Your Password',
            errorMessage: errors['password'],
            setEyeIcon: true,
        },
        {
            id: 4,
            name: 'passwordConfirm',
            type: 'password',
            labelIcon: faKey,
            placeholder: 'Repeat your password',
            errorMessage: errors['passwordConfirm'],
            setEyeIcon: true,
        },
        {
            id: 5,
            name: 'phone',
            type: 'text',
            labelIcon: faPhone,
            placeholder: 'Your Phone',
            errorMessage: errors['phone'],
        },
        {
            id: 6,
            name: 'birthday',
            type: 'date',
            labelIcon: faCake,
            placeholder: 'Your Birthday',
            errorMessage: errors['birthday'],
        },
    ];

    const handleValidation = () => {
        const formValues = { ...values };
        const formErrors = {};
        let formIsValid = true;

        // Name
        if (!formValues['name']) {
            formIsValid = false;
            formErrors['name'] = 'Please fill out this field!';
        }

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

        // PasswordConfirm
        if (!formValues['passwordConfirm']) {
            formIsValid = false;
            formErrors['passwordConfirm'] = 'Please fill out this field!';
        }

        // Phone
        if (!formValues['phone']) {
            formIsValid = false;
            formErrors['phone'] = 'Please fill out this field!';
        }

        // Birthday
        if (!formValues['birthday']) {
            formIsValid = false;
            formErrors['birthday'] = 'Please fill out this field!';
        }

        setErrors(formErrors);
        return formIsValid;
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    console.log(values);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            https
                .post('/api/QuanLyNguoiDung/DangKy', values)
                .then((res) => {
                    // Chuyển hướng user về signIn sau khi đăng ký thành công
                    navigate('/signIn');
                    message.success('Đăng ký thành công! Vui lòng đăng nhập!');
                })
                .catch((err) => {
                    console.log(err);
                    message.error(err.response.data.content);
                });
        }
    };

    return (
        <div className={cx('registerForm')}>
            <h2 className={cx('registerText')}>Welcome to Fiverr</h2>
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
                <div className={cx('gender')}>
                    <label className={cx('labelIcon')}>
                        <FontAwesomeIcon icon={faVenusMars} />
                    </label>
                    <div className={cx('genderRadio')}>
                        <div>
                            <input
                                id="male"
                                type="radio"
                                name="gender"
                                value="true"
                                checked
                                onChange={console.log(123)}
                            />
                            <label className={cx('radioLabel')} htmlFor="male">
                                Male
                            </label>
                        </div>
                        <div>
                            <input
                                id="female"
                                type="radio"
                                name="gender"
                                value="false"
                                onChange={console.log(123)}
                            />
                            <label
                                className={cx('radioLabel')}
                                htmlFor="female"
                            >
                                Female
                            </label>
                        </div>
                    </div>
                </div>
                <div className={cx('btn')}>
                    <Button primary>Register</Button>
                    <div>
                        <span className={cx('isMember')}>
                            Alrealdy a member?
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
