import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditJobSubCategory.module.scss';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPenToSquare,
    faCamera,
    faPlusCircle,
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

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

function EditJobSubCategory({
    jobSubCategoryId,
    jobCategoryList,
    dsChiTiet,
    handleGetJobSubCategoryList,
}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({});

    const handleGetJobSubCategoryDetail = () => {
        httpsRequest
            .get(`chi-tiet-loai-cong-viec/${jobSubCategoryId}`)
            .then((res) => {
                const { id, tenNhom, hinhAnh, maLoaiCongviec, dsChiTietLoai } =
                    res.content;
                setValues({
                    id,
                    tenChiTiet: tenNhom,
                    maLoaiCongViec: maLoaiCongviec,
                    danhSachChiTiet: dsChiTietLoai.map(
                        (chiTietLoai) => chiTietLoai.id,
                    ),
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const openModal = () => {
        handleGetJobSubCategoryDetail();
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

    const handleValidationJobSubCategoryName = () => {
        if (!formValues['tenChiTiet']) {
            formIsValid = false;
            formErrors['tenChiTiet'] = 'Please fill out this field!';
        } else if (typeof formValues['tenChiTiet'] !== 'undefined') {
            if (!formValues['tenChiTiet'].match(/^[A-Za-z& ]+$/)) {
                formIsValid = false;
                formErrors['tenChiTiet'] = 'Please enter a valid name!';
            } else if (!formValues['tenChiTiet'].match(/^[A-Za-z& ]{0,25}$/)) {
                formIsValid = false;
                formErrors['tenChiTiet'] =
                    'Name can not exceeds 25 characters!';
            } else formErrors['tenChiTiet'] = '';
        }
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidation = () => {
        handleValidationJobSubCategoryName();
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
            name: 'tenChiTiet',
            type: 'text',
            labelText: 'Name',
            errorMessage: errors['tenChiTiet'],
            spellCheck: 'false',
            handleValidation: () => {
                handleValidationJobSubCategoryName();
            },
        },
    ];

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Handle add job sub category item
    const [item, setItem] = useState('');

    const handleChangeItem = (e) => {
        setItem(e.target.value);
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        if (item) {
            setValues({
                ...values,
                danhSachChiTiet: [...values.danhSachChiTiet, item],
            });
        }
    };

    const renderItem = () => {
        if (values.danhSachChiTiet) {
            return values.danhSachChiTiet.map((item, index) => {
                return (
                    <Button
                        key={index}
                        round
                        className={cx('item')}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        {
                            dsChiTiet.find((chiTiet) => chiTiet.id == item)
                                .tenChiTiet
                        }
                        <span
                            className={cx('removeBtn')}
                            onClick={() => handleRemoveItem(index)}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </span>
                    </Button>
                );
            });
        }
    };

    const handleRemoveItem = (index) => {
        setValues({
            ...values,
            danhSachChiTiet: values.danhSachChiTiet.filter(
                (item, i) => i != index,
            ),
        });
    };
    // End handle add job sub category item

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            httpsRequest
                .put(
                    `chi-tiet-loai-cong-viec/sua-nhom-chi-tiet-loai/${jobSubCategoryId}`,
                    values,
                )
                .then((res) => {
                    handleGetJobSubCategoryDetail();
                    setIsOpen(false);
                    handleGetJobSubCategoryList();
                    message.success({
                        content: 'Job sub category edited!',
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
                        content: 'Job sub category edit failed!',
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
                            Edit Job Sub Category
                        </h2>
                        <div className={cx('jobSubCategoryImgWrapper')}>
                            <div className={cx('jobSubCategoryImgInner')}>
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
                                        // onChange={handleUploadImage}
                                    />
                                </label>
                                <Image
                                    className={cx('jobSubCategoryImg')}
                                    // src={user.avatar}
                                    // alt={user.name}
                                />
                            </div>
                        </div>
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
                            <div className={cx('formInputDropdown')}>
                                <div className={cx('dropdownWrapper')}>
                                    <label
                                        className={cx('labelText')}
                                        for="maLoaiCongViec"
                                    >
                                        Select Job Category
                                    </label>

                                    <select
                                        name="maLoaiCongViec"
                                        onChange={handleChange}
                                    >
                                        <option
                                            value={values.maLoaiCongViec}
                                            selected
                                            disabled
                                            hidden
                                        >
                                            {
                                                jobCategoryList.find(
                                                    (loaiCongViec) =>
                                                        loaiCongViec.id ==
                                                        values.maLoaiCongViec,
                                                )?.tenLoaiCongViec
                                            }
                                        </option>
                                        {jobCategoryList.map((loaiCongViec) => {
                                            return (
                                                <option
                                                    key={loaiCongViec.id}
                                                    value={loaiCongViec.id}
                                                >
                                                    {
                                                        loaiCongViec.tenLoaiCongViec
                                                    }
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className={cx('formInputDropdown')}>
                                <div className={cx('dropdownWrapper')}>
                                    <label
                                        className={cx('labelText')}
                                        for="maLoaiCongViec"
                                    >
                                        Select Item
                                    </label>
                                    <select
                                        name="maLoaiCongViec"
                                        onChange={handleChangeItem}
                                    >
                                        <option
                                            value=""
                                            selected
                                            disabled
                                            hidden
                                        >
                                            Choose here
                                        </option>
                                        {dsChiTiet.map((chiTietLoai) => {
                                            return (
                                                <option
                                                    key={chiTietLoai.id}
                                                    value={chiTietLoai.id}
                                                >
                                                    {chiTietLoai.tenChiTiet}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <Button
                                        text
                                        className={cx('addIcon')}
                                        onClick={(e) => {
                                            handleAddItem(e);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlusCircle} />
                                    </Button>
                                </div>
                                <div className={cx('danhSachChiTiet')}>
                                    {renderItem()}
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
        </div>
    );
}

EditJobSubCategory.propTypes = {
    jobSubCategoryId: PropTypes.number,
    jobCategoryList: PropTypes.array,
    dsChiTiet: PropTypes.array,
    handleGetJobSubCategoryList: PropTypes.func,
};

export default EditJobSubCategory;
