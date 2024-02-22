import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './JobCategoryManagement.module.scss';
import Modal from 'react-modal';
import { Table, ConfigProvider, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../utils/request';
import Button from '../../../components/Button/Button';
import EditJobCategory from './EditJobCategory/EditJobCategory';
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

function JobCategoryManagement() {
    const [jobCategoryList, setJobCategoryList] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({ tenLoaiCongViec: '' });

    const handleGetJobCategoryList = () => {
        httpsRequest
            .get('loai-cong-viec')
            .then((res) => {
                setJobCategoryList(res.content);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleGetJobCategoryList();
    }, []);

    const handleDelete = (id) => {
        httpsRequest
            ._delete(`loai-cong-viec/${id}`)
            .then((res) => {
                handleGetJobCategoryList();
                message.success({
                    content: 'Job category deleted!',
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
                    content: 'Job category delete failed!',
                    duration: 5,
                    style: {
                        fontSize: '1.6rem',
                        color: 'var(--text-color)',
                        fontFamily: '"Montserrat", sans-serif',
                    },
                });
            });
    };

    const columns = [
        {
            title: 'Category ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Category Name',
            dataIndex: 'tenLoaiCongViec',
            key: 'tenLoaiCongViec',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <EditJobCategory
                        jobCategoryId={record.id}
                        handleGetJobCategoryList={handleGetJobCategoryList}
                    />
                    <Button
                        danger
                        onClick={() => {
                            handleDelete(record.id);
                        }}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </>
            ),
        },
    ];

    // handle add job category
    const openModal = () => {
        setIsOpen(true);
        setValues({
            tenLoaiCongViec: '',
        });
    };

    const closeModal = () => {
        setIsOpen(false);
        setValues({
            tenLoaiCongViec: '',
        });
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
            name: 'tenLoaiCongViec',
            type: 'text',
            labelText: 'Cat Name',
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
                .post(`loai-cong-viec`, values)
                .then((res) => {
                    handleGetJobCategoryList();
                    setIsOpen(false);
                    message.success({
                        content: 'Job category added!',
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
                        content: 'Job category add failed!',
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
    // end handle add job category

    return (
        <div>
            <div className={cx('addBtn')}>
                <Button
                    primary
                    leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                    onClick={openModal}
                >
                    Add Category
                </Button>
                <div>
                    <Modal
                        isOpen={modalIsOpen}
                        style={customStyles}
                        ariaHideApp={false}
                    >
                        <div className={cx('modalWrapper')}>
                            <h2 className={cx('modalHeading')}>
                                Add Job Category
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
                                        handleValidation={
                                            input.handleValidation
                                        }
                                    />
                                ))}
                                <div className={cx('btn')}>
                                    <Button primary>Add</Button>
                                    <Button danger onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            fontWeightStrong: '700',
                            headerColor: 'var(--gray)',
                            colorText: 'var(--text-color)',
                            borderColor: 'var(--border-color)',
                            headerBg: 'var(--background-gray)',
                            rowHoverBg: 'var(--background-gray)',
                        },
                    },
                }}
            >
                <Table columns={columns} dataSource={jobCategoryList} />
            </ConfigProvider>
        </div>
    );
}

export default JobCategoryManagement;
