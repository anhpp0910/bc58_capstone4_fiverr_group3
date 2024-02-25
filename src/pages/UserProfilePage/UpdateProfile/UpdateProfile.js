import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './UpdateProfile.module.scss';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPenToSquare,
    faCake,
    faEnvelope,
    faPhone,
    faUser,
    faVenusMars,
    faCertificate,
    faPlusCircle,
    faCircleXmark,
    faRibbon,
} from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../utils/request';
import { setUser } from '../../../redux/userSlice';
import Button from '../../../components/Button/Button';
import FormInput from '../../../components/FormInput/FormInput';

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

export default function UpdateProfile() {
    let dispatch = useDispatch();
    let user = useSelector((state) => state.userSlice.user);
    const certificationRef = useRef();
    const skillRef = useRef();
    const [certification, setCertification] = useState('');
    const [skill, setSkill] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({
        email: user.email,
        name: user.name,
        phone: user.phone,
        birthday: user.birthday,
        gender: user.gender,
        certification: user.certification,
        skill: user.skill,
    });

    const openModal = () => {
        setIsOpen(true);
        setValues({
            email: user.email,
            name: user.name,
            phone: user.phone,
            birthday: user.birthday,
            gender: user.gender,
            certification: user.certification,
            skill: user.skill,
        });
        setCertification('');
        setSkill('');
    };

    const closeModal = () => {
        setIsOpen(false);
        setValues({
            name: user.name,
            email: user.email,
            phone: user.phone,
            birthday: user.birthday,
            gender: user.gender,
            certification: user.certification,
            skill: user.skill,
        });
        setErrors({});
        setCertification('');
        setSkill('');
    };

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

    const handleValidationPhone = () => {
        if (!formValues['phone']) {
            formIsValid = false;
            formErrors['phone'] = 'Please fill out this field!';
        } else if (typeof formValues['phone'] !== 'undefined') {
            if (
                !formValues['phone'].match(
                    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
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

    const handleValidation = () => {
        handleValidationName();
        handleValidationPhone();
        handleValidationBirthday();
        return formIsValid;
    };
    // End validation

    const inputs = [
        {
            id: 1,
            name: 'email',
            type: 'text',
            labelIcon: faEnvelope,
            disabled: true,
        },
        {
            id: 2,
            name: 'name',
            type: 'text',
            labelIcon: faUser,
            errorMessage: errors['name'],
            spellCheck: 'false',
            handleValidation: () => {
                handleValidationName();
            },
        },
        {
            id: 3,
            name: 'phone',
            type: 'text',
            labelIcon: faPhone,
            errorMessage: errors['phone'],
            handleValidation: () => {
                handleValidationPhone();
            },
        },
        {
            id: 4,
            name: 'birthday',
            type: 'date',
            labelIcon: faCake,
            errorMessage: errors['birthday'],
            handleValidation: () => {
                handleValidationBirthday();
            },
        },
    ];

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Handle add item for certification and skill
    const handleAddItem = (e, field) => {
        e.preventDefault();
        switch (field) {
            case certification:
                if (certification) {
                    setValues({
                        ...values,
                        certification: [...values.certification, field],
                    });
                    setCertification('');
                    certificationRef.current.focus();
                    break;
                }
            case skill:
                if (skill) {
                    setValues({
                        ...values,
                        skill: [...values.skill, field],
                    });
                    setSkill('');
                    skillRef.current.focus();
                    break;
                }
        }
    };

    const renderItem = (field) => {
        return values[field].map((item, index) => {
            return (
                <Button
                    key={index}
                    round
                    className={cx('item')}
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    {item}
                    <span
                        className={cx('removeBtn')}
                        onClick={() => handleRemoveItem(field, index)}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </span>
                </Button>
            );
        });
    };

    const handleRemoveItem = (field, index) => {
        setValues({
            ...values,
            [field]: values[field].filter((item, i) => i != index),
        });
    };
    // End handle add item for certification and skill

    const handleGetUserProfile = () => {
        httpsRequest
            .get(`users/${user.id}`)
            .then((res) => {
                // Đẩy data lên redux
                dispatch(setUser(res.content));
                // Lưu data xuống localStorage để user load trang sẽ không mất data
                let userInfo = JSON.stringify(res.content);
                localStorage.setItem('USER_INFO', userInfo);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            httpsRequest
                .put(`users/${user.id}`, values)
                .then((res) => {
                    handleGetUserProfile();
                    setIsOpen(false);
                    message.success({
                        content: 'Profile updated!',
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
                        content:
                            'Profile update failed! Please check your account and try again!',
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
        <>
            <div className={cx('updateProfile')}>
                <Button text className={cx('updateIcon')} onClick={openModal}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
            </div>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className={cx('wrapper')}>
                        <h2 className={cx('updateProfileText')}>
                            Your Profile
                        </h2>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            {inputs.map((input) => (
                                <FormInput
                                    key={input.id}
                                    {...input}
                                    type={input.type}
                                    value={values[input.name]}
                                    onChange={handleChange}
                                    errorMessage={input.errorMessage}
                                    disabled={input?.disabled}
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
                                                defaultChecked={
                                                    values.gender === true
                                                        ? 'checked'
                                                        : null
                                                }
                                                onChange={handleChange}
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
                                                defaultChecked={
                                                    values.gender === false
                                                        ? 'checked'
                                                        : null
                                                }
                                                onChange={handleChange}
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
                            </div>
                            <div className={cx('certification')}>
                                <div className={cx('formInput')}>
                                    <div className={cx('inputField')}>
                                        <label className={cx('labelIcon')}>
                                            <FontAwesomeIcon
                                                icon={faCertificate}
                                            />
                                        </label>
                                        <input
                                            ref={certificationRef}
                                            value={certification}
                                            type="text"
                                            name="certification"
                                            placeholder="Add your certification"
                                            spellCheck="false"
                                            onChange={(e) => {
                                                setCertification(
                                                    e.target.value,
                                                );
                                            }}
                                        />
                                        <Button
                                            text
                                            className={cx('addIcon')}
                                            onClick={(e) => {
                                                handleAddItem(e, certification);
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlusCircle}
                                            />
                                        </Button>
                                    </div>
                                </div>
                                <div className={cx('certificationContent')}>
                                    {renderItem('certification')}
                                </div>
                            </div>
                            <div className={cx('skill')}>
                                <div className={cx('formInput')}>
                                    <div className={cx('inputField')}>
                                        <label className={cx('labelIcon')}>
                                            <FontAwesomeIcon icon={faRibbon} />
                                        </label>
                                        <input
                                            ref={skillRef}
                                            value={skill}
                                            type="text"
                                            name="skill"
                                            placeholder="Add your skill"
                                            spellCheck="false"
                                            onChange={(e) => {
                                                setSkill(e.target.value);
                                            }}
                                        />
                                        <Button
                                            text
                                            className={cx('addIcon')}
                                            onClick={(e) => {
                                                handleAddItem(e, skill);
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlusCircle}
                                            />
                                        </Button>
                                    </div>
                                </div>
                                <div className={cx('skillContent')}>
                                    {renderItem('skill')}
                                </div>
                            </div>
                            <div className={cx('btn')}>
                                <Button primary>Update</Button>
                                <Button danger onClick={closeModal}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </>
    );
}
