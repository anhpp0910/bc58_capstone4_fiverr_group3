import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditJobCategory.module.scss';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../../utils/request';
import Button from '../../../../components/Button/Button';
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

function EditJobCategory({ jobCategoryId, handleGetJobCategoryList }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({});

    const handleGetJobCategoryDetail = () => {
        httpsRequest
            .get(`loai-cong-viec/${jobCategoryId}`)
            .then((res) => {
                const { id, tenLoaiCongViec } = res.content;
                setValues({
                    id,
                    tenLoaiCongViec,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const openModal = () => {
        handleGetJobCategoryDetail();
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setValues({});
        setErrors({});
    };

    // Handle validation for input field
    let formIsValid = true;
    const [errors, setErrors] = useState({});
    const formValues = { ...values };
    const formErrors = {};

    const handleValidationJobCategoryName = () => {
        if (!formValues['tenLoaiCongViec']) {
            formIsValid = false;
            formErrors['tenLoaiCongViec'] = 'Please fill out this field!';
        } else if (typeof formValues['tenLoaiCongViec'] !== 'undefined') {
            if (!formValues['tenLoaiCongViec'].match(/^[A-Za-z& ]+$/)) {
                formIsValid = false;
                formErrors['tenLoaiCongViec'] = 'Please enter a valid name!';
            } else if (
                !formValues['tenLoaiCongViec'].match(/^[A-Za-z& ]{0,25}$/)
            ) {
                formIsValid = false;
                formErrors['tenLoaiCongViec'] =
                    'Name can not exceeds 25 characters!';
            } else formErrors['tenLoaiCongViec'] = '';
        }
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidation = () => {
        handleValidationJobCategoryName();
        return formIsValid;
    };
    // End validation

    const inputs = [
        {
            id: 1,
            name: 'id',
            type: 'text',
            labelText: 'ID',
            disabled: true,
        },
        {
            id: 2,
            name: 'tenLoaiCongViec',
            type: 'text',
            labelText: 'Name',
            errorMessage: errors['tenLoaiCongViec'],
            spellCheck: 'false',
            handleValidation: () => {
                handleValidationJobCategoryName();
            },
        },
    ];

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            httpsRequest
                .put(`loai-cong-viec/${jobCategoryId}`, values)
                .then((res) => {
                    setIsOpen(false);
                    handleGetJobCategoryList();
                    message.success({
                        content: 'Job category edited!',
                        duration: 3,
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
                        content: err.response.data.content,
                        duration: 3,
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
        <div className={cx('wrapper')}>
            <Button primary onClick={openModal}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className={cx('modalWrapper')}>
                        <h2 className={cx('modalHeading')}>
                            Job Category Detail
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
                                    handleValidation={input.handleValidation}
                                    disabled={input.disabled}
                                />
                            ))}
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

EditJobCategory.propTypes = {
    jobCategoryId: PropTypes.number,
    handleGetJobCategoryList: PropTypes.func,
};

export default EditJobCategory;
