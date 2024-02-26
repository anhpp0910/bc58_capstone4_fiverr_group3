import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditJob.module.scss';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { message, Rate } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCamera } from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../../utils/request';
import Button from '../../../../components/Button/Button';
import FormInput from '../../../../components/FormInput/FormInput';
import Image from '../../../../components/Image/Image';

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

function EditJob({ jobId, dsChiTiet, handleGetJobList }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({});
    const [jobImg, setJobImg] = useState(null);
    const [file, setFile] = useState(null);

    const handleGetJobDetail = () => {
        httpsRequest
            .get(`cong-viec/${jobId}`)
            .then((res) => {
                const {
                    id,
                    tenCongViec,
                    hinhAnh,
                    maChiTietLoaiCongViec,
                    danhGia,
                    giaTien,
                    nguoiTao,
                    saoCongViec,
                    moTa,
                    moTaNgan,
                } = res.content;
                console.log(res.content);
                setJobImg(hinhAnh);
                setValues({
                    id,
                    tenCongViec,
                    maChiTietLoaiCongViec,
                    danhGia: danhGia.toString(),
                    giaTien: giaTien.toString(),
                    nguoiTao,
                    saoCongViec,
                    moTa,
                    moTaNgan,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const openModal = () => {
        handleGetJobDetail();
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setValues({});
        setErrors({});
    };

    const handleChangeImage = async (e) => {
        setFile(e.target.files[0]);
        setJobImg(URL.createObjectURL(e.target.files[0]));
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
            name: 'id',
            type: 'text',
            labelText: 'ID',
            disabled: true,
        },
        {
            id: 2,
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
            id: 3,
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
            id: 4,
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

    // handle API post cong-viec/id
    const handleEditJobDetail = () => {
        httpsRequest
            .put(`cong-viec/${jobId}`, values)
            .then((res) => {
                setIsOpen(false);
                handleGetJobList();
                message.success({
                    content: 'Job edited!',
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle upload image first
        if (file) {
            let formData = new FormData();
            formData.append('formFile', file);
            httpsRequest
                .post(`cong-viec/upload-hinh-cong-viec/${values.id}`, formData)
                .then((res) => {
                    // if upload image is successfully then continue to upload form
                    if (handleValidation()) {
                        handleEditJobDetail();
                    }
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
        } else if (handleValidation()) {
            handleEditJobDetail();
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
                        <h2 className={cx('modalHeading')}>Job Detail</h2>
                        <div className={cx('jobImgWrapper')}>
                            <div className={cx('jobImgInner')}>
                                <label
                                    className={cx('cameraOverlay')}
                                    htmlFor="upload"
                                >
                                    <span>
                                        <FontAwesomeIcon icon={faCamera} />
                                    </span>
                                    <input
                                        className={cx('uploadImage')}
                                        id="upload"
                                        type="file"
                                        onChange={handleChangeImage}
                                    />
                                </label>
                                <Image
                                    className={cx('jobImg')}
                                    src={jobImg}
                                    alt={values.tenCongViec}
                                />
                            </div>
                        </div>
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
                                        disabled={input.disabled}
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
                                                value={values.nguoiTao || ''}
                                                selected
                                                disabled
                                                hidden
                                            >
                                                {values?.nguoiTao ||
                                                    'Choose here'}
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
                                                value={
                                                    values.maChiTietLoaiCongViec ||
                                                    ''
                                                }
                                                selected
                                                disabled
                                                hidden
                                            >
                                                {dsChiTiet.find(
                                                    (chiTietLoaiCongViec) =>
                                                        chiTietLoaiCongViec.id ==
                                                        values.maChiTietLoaiCongViec,
                                                )?.tenChiTiet || 'Choose here'}
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
                                            {errors['maChiTietLoaiCongViec']}
                                        </span>
                                    </div>
                                    <div className={cx('ratingInputWrapper')}>
                                        <div className={cx('ratingInput')}>
                                            <label className={cx('labelText')}>
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
                                            <span>{errors['saoCongViec']}</span>
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
                                            onBlur={handleValidationDescription}
                                        />
                                    </div>
                                    <div className={cx('errorMessage')}>
                                        <span>{errors['moTa']}</span>
                                    </div>
                                </div>
                                <div className={cx('btn')}>
                                    <Button primary>Update</Button>
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
    );
}

EditJob.propTypes = {
    jobId: PropTypes.number,
    dsChiTiet: PropTypes.array,
    handleGetJobList: PropTypes.func,
};

export default EditJob;
