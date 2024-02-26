import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './JobManagement.module.scss';
import Modal from 'react-modal';
import { Table, ConfigProvider, message, Rate } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../utils/request';
import Button from '../../../components/Button/Button';
import EditJob from './EditJob/EditJob';
import FormInput from '../../../components/FormInput/FormInput';
import Image from '../../../components/Image/Image';

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

const dsChiTiet = [
    {
        id: 11,
        tenChiTiet: 'Social Media Advertising',
    },
    {
        id: 14,
        tenChiTiet: 'Articles & Blog Posts',
    },
    {
        id: 20,
        tenChiTiet: 'Short Video Ads',
    },
    {
        id: 21,
        tenChiTiet: 'Social Media Videos',
    },
    {
        id: 22,
        tenChiTiet: 'Video Editing & Post-Production',
    },
    {
        id: 23,
        tenChiTiet: 'Video Editing',
    },
    {
        id: 24,
        tenChiTiet: 'Visual Effects',
    },
    {
        id: 25,
        tenChiTiet: 'Music Production & Writing',
    },
    {
        id: 26,
        tenChiTiet: 'Producers & Composers',
    },
    {
        id: 27,
        tenChiTiet: 'Songwriters',
    },
];

export default function JobManagement() {
    const [jobList, setJobList] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({
        tenCongViec: '',
        danhGia: null,
        giaTien: null,
        nguoiTao: null,
        moTa: '',
        maChiTietLoaiCongViec: null,
        moTaNgan: '',
        saoCongViec: null,
    });

    const handleGetJobList = () => {
        httpsRequest
            .get('cong-viec')
            .then((res) => {
                setJobList(res.content);
                console.log(res.content);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleGetJobList();
    }, []);

    const handleDelete = (id) => {
        httpsRequest
            ._delete(`cong-viec/${id}`)
            .then((res) => {
                handleGetJobList();
                message.success({
                    content: 'Job deleted!',
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
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'tenCongViec',
            key: 'tenCongViec',
        },
        {
            title: 'Image',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            render: (_, record) => (
                <Image
                    className={cx('jobImg')}
                    src={record.hinhAnh}
                    alt={record.tenCongViec}
                />
            ),
        },
        {
            title: 'Category',
            dataIndex: 'maChiTietLoaiCongViec',
            key: 'maChiTietLoaiCongViec',
            render: (maChiTietLoaiCongViec) => {
                let chiTietLoaiCongViec = dsChiTiet.find(
                    (chiTiet) => chiTiet.id == maChiTietLoaiCongViec,
                );
                if (chiTietLoaiCongViec) {
                    return <span>{chiTietLoaiCongViec.tenChiTiet}</span>;
                } else return <span></span>;
            },
        },
        {
            title: 'Description',
            dataIndex: 'moTa',
            key: 'moTa',
        },
        {
            title: 'Price',
            dataIndex: 'giaTien',
            key: 'giaTien',
            render: (giaTien) => <span>${giaTien}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <EditJob
                        jobId={record.id}
                        dsChiTiet={dsChiTiet}
                        handleGetJobList={handleGetJobList}
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

    // handle add job
    const openModal = () => {
        setIsOpen(true);
        setValues({
            tenCongViec: '',
            danhGia: null,
            giaTien: null,
            nguoiTao: null,
            moTa: '',
            maChiTietLoaiCongViec: null,
            moTaNgan: '',
            saoCongViec: null,
        });
    };

    const closeModal = () => {
        setIsOpen(false);
        setValues({
            tenCongViec: '',
            danhGia: null,
            giaTien: null,
            nguoiTao: null,
            moTa: '',
            maChiTietLoaiCongViec: null,
            moTaNgan: '',
            saoCongViec: null,
        });
        setErrors({});
    };

    // Handle validation for input field
    let formIsValid = true;
    const [errors, setErrors] = useState({});
    const formValues = { ...values };
    const formErrors = {};

    const handleValidationJobName = () => {
        if (!formValues['tenCongViec']) {
            formIsValid = false;
            formErrors['tenCongViec'] = 'Please fill out this field!';
        } else if (typeof formValues['tenCongViec'] !== 'undefined') {
            if (!formValues['tenCongViec'].match(/^[A-Za-z& ]+$/)) {
                formIsValid = false;
                formErrors['tenCongViec'] = 'Please enter a valid name!';
            } else if (
                !formValues['tenCongViec'].match(/^[A-Za-z& ]{0,100}$/)
            ) {
                formIsValid = false;
                formErrors['tenCongViec'] =
                    'Name can not exceeds 100 characters!';
            } else formErrors['tenCongViec'] = '';
        }
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationPrice = () => {
        if (!formValues['giaTien']) {
            formIsValid = false;
            formErrors['giaTien'] = 'Please fill out this field!';
        } else if (typeof formValues['giaTien'] !== 'undefined') {
            if (!formValues['giaTien'].match(/^[0-9]*$/)) {
                formIsValid = false;
                formErrors['giaTien'] = 'Please enter a valid price!';
            } else formErrors['giaTien'] = '';
        }
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationReviews = () => {
        if (!formValues['danhGia']) {
            formIsValid = false;
            formErrors['danhGia'] = 'Please fill out this field!';
        } else if (typeof formValues['danhGia'] !== 'undefined') {
            if (!formValues['danhGia'].match(/^[0-9]*$/)) {
                formIsValid = false;
                formErrors['danhGia'] = 'Please enter number of reviews!';
            } else formErrors['danhGia'] = '';
        }
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationSelectSellerLevel = () => {
        if (!formValues['nguoiTao']) {
            formIsValid = false;
            formErrors['nguoiTao'] = 'Please choose seller level!';
        } else formErrors['nguoiTao'] = '';
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationSelectCategory = () => {
        if (!formValues['maChiTietLoaiCongViec']) {
            formIsValid = false;
            formErrors['maChiTietLoaiCongViec'] =
                'Please choose category for this job!';
        } else formErrors['maChiTietLoaiCongViec'] = '';
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationSelectRating = () => {
        if (!formValues['saoCongViec']) {
            formIsValid = false;
            formErrors['saoCongViec'] = 'Please rate this job!';
        } else formErrors['saoCongViec'] = '';
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationShortDescription = () => {
        if (!formValues['moTaNgan']) {
            formIsValid = false;
            formErrors['moTaNgan'] = 'Please fill out this field!';
        } else formErrors['moTaNgan'] = '';
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidationDescription = () => {
        if (!formValues['moTa']) {
            formIsValid = false;
            formErrors['moTa'] = 'Please fill out this field!';
        } else formErrors['moTa'] = '';
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidation = () => {
        handleValidationJobName();
        handleValidationPrice();
        handleValidationReviews();
        handleValidationSelectSellerLevel();
        handleValidationSelectCategory();
        handleValidationSelectRating();
        handleValidationShortDescription();
        handleValidationDescription();
        return formIsValid;
    };
    // End validation

    const inputs = [
        {
            id: 1,
            name: 'tenCongViec',
            type: 'text',
            labelText: 'Name',
            errorMessage: errors['tenCongViec'],
            spellCheck: 'false',
            handleValidation: () => {
                handleValidationJobName();
            },
        },
        {
            id: 2,
            name: 'giaTien',
            type: 'text',
            labelText: 'Price ($)',
            errorMessage: errors['giaTien'],
            spellCheck: 'false',
            handleValidation: () => {
                handleValidationPrice();
            },
        },
        {
            id: 3,
            name: 'danhGia',
            type: 'text',
            labelText: 'Reviews',
            errorMessage: errors['danhGia'],
            spellCheck: 'false',
            handleValidation: () => {
                handleValidationReviews();
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
                .post(`cong-viec`, values)
                .then((res) => {
                    handleGetJobList();
                    setIsOpen(false);
                    message.success({
                        content: 'Job added!',
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
                        content: 'Job add failed!',
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
    // end handle add job

    return (
        <div>
            <div className={cx('addBtn')}>
                <Button
                    primary
                    leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                    onClick={openModal}
                >
                    Add Job
                </Button>
                <div>
                    <Modal
                        isOpen={modalIsOpen}
                        style={customStyles}
                        ariaHideApp={false}
                    >
                        <div className={cx('modalWrapper')}>
                            <h2 className={cx('modalHeading')}>Add Job</h2>
                            <form
                                className={cx('form')}
                                onSubmit={(e) => handleSubmit(e)}
                            >
                                <div className={cx('left')}>
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
                                    <div className={cx('formInputDropdown')}>
                                        <div className={cx('dropdownWrapper')}>
                                            <label
                                                className={cx('labelText')}
                                                for="nguoiTao"
                                            >
                                                Seller Level
                                            </label>
                                            <select
                                                name="nguoiTao"
                                                id="nguoiTao"
                                                onChange={handleChange}
                                                onBlur={
                                                    handleValidationSelectSellerLevel
                                                }
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                    hidden
                                                >
                                                    Choose here
                                                </option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div className={cx('errorMessage')}>
                                            <span>{errors['nguoiTao']}</span>
                                        </div>
                                    </div>
                                    <div className={cx('formInputDropdown')}>
                                        <div className={cx('dropdownWrapper')}>
                                            <label
                                                className={cx('labelText')}
                                                for="maChiTietLoaiCongViec"
                                            >
                                                Category
                                            </label>
                                            <select
                                                name="maChiTietLoaiCongViec"
                                                id="maChiTietLoaiCongViec"
                                                onChange={handleChange}
                                                onBlur={
                                                    handleValidationSelectCategory
                                                }
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                    hidden
                                                >
                                                    Choose here
                                                </option>
                                                {dsChiTiet.map(
                                                    (chiTietLoaiCongViec) => {
                                                        return (
                                                            <option
                                                                key={
                                                                    chiTietLoaiCongViec.id
                                                                }
                                                                value={
                                                                    chiTietLoaiCongViec.id
                                                                }
                                                            >
                                                                {
                                                                    chiTietLoaiCongViec.tenChiTiet
                                                                }
                                                            </option>
                                                        );
                                                    },
                                                )}
                                            </select>
                                        </div>
                                        <div className={cx('errorMessage')}>
                                            <span>
                                                {
                                                    errors[
                                                        'maChiTietLoaiCongViec'
                                                    ]
                                                }
                                            </span>
                                        </div>
                                        <div
                                            className={cx('ratingInputWrapper')}
                                        >
                                            <div className={cx('ratingInput')}>
                                                <label
                                                    className={cx('labelText')}
                                                >
                                                    Rating
                                                </label>
                                                <Rate
                                                    value={values.saoCongViec}
                                                    className={cx('rating')}
                                                    onChange={(e) =>
                                                        setValues({
                                                            ...values,
                                                            saoCongViec: e,
                                                        })
                                                    }
                                                    onBlur={
                                                        handleValidationSelectRating
                                                    }
                                                />
                                            </div>
                                            <div className={cx('errorMessage')}>
                                                <span>
                                                    {errors['saoCongViec']}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('right')}>
                                    <div className={cx('textAreaInputWrapper')}>
                                        <div className={cx('textAreaInput')}>
                                            <label className={cx('labelText')}>
                                                Short Description
                                            </label>
                                            <textarea
                                                value={values.moTaNgan}
                                                name="moTaNgan"
                                                cols="30"
                                                rows="3"
                                                spellCheck={false}
                                                onChange={handleChange}
                                                onBlur={
                                                    handleValidationShortDescription
                                                }
                                            />
                                        </div>
                                        <div className={cx('errorMessage')}>
                                            <span>{errors['moTaNgan']}</span>
                                        </div>
                                    </div>
                                    <div className={cx('textAreaInputWrapper')}>
                                        <div className={cx('textAreaInput')}>
                                            <label className={cx('labelText')}>
                                                Description
                                            </label>
                                            <textarea
                                                value={values.moTa}
                                                name="moTa"
                                                cols="30"
                                                rows="6"
                                                spellCheck={false}
                                                onChange={handleChange}
                                                onBlur={
                                                    handleValidationDescription
                                                }
                                            />
                                        </div>
                                        <div className={cx('errorMessage')}>
                                            <span>{errors['moTa']}</span>
                                        </div>
                                    </div>
                                    <div className={cx('btn')}>
                                        <Button primary>Add</Button>
                                        <Button danger onClick={closeModal}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
            <div>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                fontWeightStrong: '700',
                                headerColor: 'var(--gray)',
                                colorText: 'var(--text-color)',
                                borderColor: 'var(--border-color)',
                                headerBg: 'var(--background-gray)',
                            },
                        },
                    }}
                >
                    <Table columns={columns} dataSource={jobList} />
                </ConfigProvider>
            </div>
        </div>
    );
}
