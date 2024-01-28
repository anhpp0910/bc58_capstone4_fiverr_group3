import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss';
import { message } from 'antd';
import { https } from '../../service/api';
import { useNavigate } from 'react-router';
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

    const handleToSignInPage = () => {
        navigate('/signIn');
    };

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        birthday: '',
        gender: '',
    });

    // Handle validation for input field
    let formIsValid = true;
    const [errors, setErrors] = useState({});
    const formValues = { ...values };
    const formErrors = {};

    const handleValidationName = () => {
        if (!formValues['name']) {
            formIsValid = false;
            formErrors['name'] = 'Please fill out this field!';
        } else if (typeof formValues['name'] !== 'undefined') {
            if (
                !formValues['name'].match(
                    /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/,
                )
            ) {
                formIsValid = false;
                formErrors['name'] = 'Please enter a valid name!';
            } else formErrors['name'] = '';
        }
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationEmail = () => {
        if (!formValues['email']) {
            formIsValid = false;
            formErrors['email'] = 'Please fill out this field!';
        } else if (typeof formValues['email'] !== 'undefined') {
            if (
                !formValues['email'].match(
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                )
            ) {
                formIsValid = false;
                formErrors['email'] = 'Please enter a valid email address!';
            } else formErrors['email'] = '';
        }
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationPassword = () => {
        if (!formValues['password']) {
            formIsValid = false;
            formErrors['password'] = 'Please fill out this field!';
        } else if (typeof formValues['password'] !== 'undefined') {
            if (
                !formValues['password'].match(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                )
            ) {
                formIsValid = false;
                formErrors['password'] =
                    'Password must be minimum of 6 characters with at least one uppercase letter, one lowercase letter, one number and one special character!';
            } else formErrors['password'] = '';
        }
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationPasswordConfirm = () => {
        if (!formValues['passwordConfirm']) {
            formIsValid = false;
            formErrors['passwordConfirm'] = 'Please fill out this field!';
        } else if (typeof formValues['passwordConfirm'] !== 'undefined') {
            if (!(formValues['passwordConfirm'] === formValues['password'])) {
                formIsValid = false;
                formErrors['passwordConfirm'] =
                    'Password confirm does not match!';
            } else formErrors['passwordConfirm'] = '';
        }
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationPhone = () => {
        if (!formValues['phone']) {
            formIsValid = false;
            formErrors['phone'] = 'Please fill out this field!';
        } else if (typeof formValues['phone'] !== 'undefined') {
            if (
                !formValues['phone'].match(
                    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                )
            ) {
                formIsValid = false;
                formErrors['phone'] = 'Please enter a valid phone number!';
            } else formErrors.phone = '';
        }
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationBirthday = () => {
        if (!formValues['birthday']) {
            formIsValid = false;
            formErrors['birthday'] = 'Please fill out this field!';
        } else formErrors['birthday'] = '';
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationGender = () => {
        if (!formValues['gender']) {
            formIsValid = false;
            formErrors['gender'] = 'Please fill out this field!';
        } else formErrors['gender'] = '';
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidation = () => {
        handleValidationName();
        handleValidationEmail();
        handleValidationPassword();
        handleValidationPasswordConfirm();
        handleValidationPhone();
        handleValidationBirthday();
        handleValidationGender();
        return formIsValid;
    };
    // End validation

    const inputs = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            labelIcon: faUser,
            placeholder: 'Your Name',
            errorMessage: errors['name'],
            spellCheck: 'false',
            handleValidation: () => {
                handleValidationName();
            },
        },
        {
            id: 2,
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
            id: 3,
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
        {
            id: 4,
            name: 'passwordConfirm',
            type: 'password',
            labelIcon: faKey,
            placeholder: 'Repeat your password',
            errorMessage: errors['passwordConfirm'],
            setEyeIcon: true,
            handleValidation: () => {
                handleValidationPasswordConfirm();
            },
        },
        {
            id: 5,
            name: 'phone',
            type: 'text',
            labelIcon: faPhone,
            placeholder: 'Your Phone',
            errorMessage: errors['phone'],
            handleValidation: () => {
                handleValidationPhone();
            },
        },
        {
            id: 6,
            name: 'birthday',
            type: 'date',
            labelIcon: faCake,
            placeholder: 'Your Birthday',
            errorMessage: errors['birthday'],
            handleValidation: () => {
                handleValidationBirthday();
            },
        },
    ];

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            https
                .post('/api/auth/signup', values)
                .then((res) => {
                    // Chuyển hướng user về signIn sau khi đăng ký thành công
                    navigate('/signIn');
                    message.success({
                        content: 'Register sucessfully! Please sign in!',
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
                        content:
                            'Email address already in use! Please sign in instead!',
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
                        handleValidation={input.handleValidation}
                    />
                ))}
                <div className={cx('formInputGender')}>
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
                                    value={true}
                                    onChange={onChange}
                                    onBlur={handleValidationGender}
                                />
                                <label
                                    className={cx('radioLabel')}
                                    htmlFor="male"
                                >
                                    Male
                                </label>
                            </div>
                            <div>
                                <input
                                    id="female"
                                    type="radio"
                                    name="gender"
                                    value={false}
                                    onChange={onChange}
                                    onBlur={handleValidationGender}
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
                    <div className={cx('errorMessage')}>
                        <span>{errors['gender']}</span>
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
