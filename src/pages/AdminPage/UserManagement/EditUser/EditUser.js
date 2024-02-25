import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditUser.module.scss';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPenToSquare,
    faCake,
    faEnvelope,
    faPhone,
    faUser,
    faVenusMars,
    faCertificate,
    faRibbon,
    faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../../utils/request';
import Button from '../../../../components/Button/Button';
import Avatar from '../../../../components/Avatar/Avatar';
import FormInput from '../../../../components/FormInput/FormInput';

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

function EditUser({ userId, handleGetUserList, handleSearch }) {
    const { id: currentUserId } = useSelector((state) => state.userSlice.user);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({});

    const handleGetUserProfile = () => {
        httpsRequest
            .get(`users/${userId}`)
            .then((res) => {
                const {
                    avatar,
                    email,
                    name,
                    phone,
                    birthday,
                    gender,
                    certification,
                    skill,
                    role,
                } = res.content;
                setValues({
                    avatar,
                    email,
                    name,
                    phone,
                    birthday: moment(birthday).format('YYYY-MM-DD'),
                    gender,
                    certification,
                    skill,
                    role,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const openModal = () => {
        handleGetUserProfile();
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

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
            disabled: true,
        },
        {
            id: 3,
            name: 'phone',
            type: 'text',
            labelIcon: faPhone,
            disabled: true,
        },
        {
            id: 4,
            name: 'birthday',
            type: 'date',
            labelIcon: faCake,
            disabled: true,
        },
    ];

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
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
                </Button>
            );
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        httpsRequest
            .put(`users/${userId}`, values)
            .then((res) => {
                setIsOpen(false);
                handleGetUserList();
                handleSearch();
                message.success({
                    content: 'Profile edited!',
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
                setIsOpen(false);
                message.error({
                    content: 'Profile edit failed!',
                    duration: 5,
                    style: {
                        fontSize: '1.6rem',
                        color: 'var(--text-color)',
                        fontFamily: '"Montserrat", sans-serif',
                    },
                });
            });
    };

    return (
        <div className={cx('wrapper')}>
            <Button
                primary
                disabled={currentUserId === userId ? true : false}
                onClick={openModal}
            >
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className={cx('modalWrapper')}>
                        <h2 className={cx('modalHeading')}>User Profile</h2>
                        <div className={cx('userAvatarWrapper')}>
                            <Avatar
                                className={cx('userAvatar')}
                                src={values.avatar}
                                alt={values.name}
                            />
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className={cx('formInputRadio')}>
                                <div className={cx('radioWrapper')}>
                                    <label className={cx('labelIcon')}>
                                        <FontAwesomeIcon
                                            icon={faShieldHalved}
                                        />
                                    </label>
                                    <div className={cx('radio', 'roleRadio')}>
                                        <div>
                                            <input
                                                id="admin"
                                                type="radio"
                                                name="role"
                                                value="ADMIN"
                                                defaultChecked={
                                                    values.role === 'ADMIN'
                                                        ? 'checked'
                                                        : null
                                                }
                                                onChange={handleChange}
                                            />
                                            <label
                                                className={cx('radioLabel')}
                                                htmlFor="admin"
                                            >
                                                Admin
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                id="user"
                                                type="radio"
                                                name="role"
                                                value="USER"
                                                defaultChecked={
                                                    values.role === 'USER'
                                                        ? 'checked'
                                                        : null
                                                }
                                                onChange={handleChange}
                                            />
                                            <label
                                                className={cx('radioLabel')}
                                                htmlFor="user"
                                            >
                                                User
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {inputs.map((input) => (
                                <FormInput
                                    key={input.id}
                                    {...input}
                                    type={input.type}
                                    value={values[input.name]}
                                    disabled={input.disabled}
                                />
                            ))}
                            <div className={cx('formInputRadio')}>
                                <div className={cx('radioWrapper')}>
                                    <label className={cx('labelIcon')}>
                                        <FontAwesomeIcon icon={faVenusMars} />
                                    </label>
                                    <div className={cx('radio', 'genderRadio')}>
                                        <div>
                                            <input
                                                id="male"
                                                type="radio"
                                                name="gender"
                                                defaultChecked={
                                                    values.gender === true
                                                        ? 'checked'
                                                        : null
                                                }
                                                disabled={true}
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
                                                defaultChecked={
                                                    values.gender === false
                                                        ? 'checked'
                                                        : null
                                                }
                                                disabled={true}
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
                                <label className={cx('labelIcon')}>
                                    <FontAwesomeIcon icon={faCertificate} />
                                </label>
                                {values.certification &&
                                    values.certification.length == 0 && (
                                        <Button
                                            round
                                            className={cx('item')}
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                        >
                                            No certificate shown
                                        </Button>
                                    )}
                                {values.certification &&
                                    values.certification.length > 0 &&
                                    renderItem('certification')}
                            </div>
                            <div className={cx('skill')}>
                                <label className={cx('labelIcon')}>
                                    <FontAwesomeIcon icon={faRibbon} />
                                </label>
                                {values.skill && values.skill.length == 0 && (
                                    <Button
                                        round
                                        className={cx('item')}
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        No skill shown
                                    </Button>
                                )}
                                {values.skill &&
                                    values.skill.length > 0 &&
                                    renderItem('skill')}
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
        </div>
    );
}

EditUser.propTypes = {
    userId: PropTypes.number,
    handleGetUserList: PropTypes.func,
    handleSearch: PropTypes.func,
};

export default EditUser;
