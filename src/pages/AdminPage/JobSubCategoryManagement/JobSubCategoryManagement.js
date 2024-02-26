import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './JobSubCategoryManagement.module.scss';
import Modal from 'react-modal';
import { Table, ConfigProvider, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCirclePlus,
    faPlusCircle,
    faTrashAlt,
    faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../utils/request';
import Button from '../../../components/Button/Button';
import EditJobSubCategory from './EditJobSubCategory/EditJobSubCategory';
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

export default function JobSubCategoryManagement() {
    const [jobCategoryList, setJobCategoryList] = useState([]);
    const [jobSubCategoryList, setJobSubCategoryList] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({
        tenChiTiet: '',
        maLoaiCongViec: null,
        danhSachChiTiet: [],
    });

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

    const handleGetJobSubCategoryList = () => {
        httpsRequest
            .get('chi-tiet-loai-cong-viec')
            .then((res) => {
                setJobSubCategoryList(res.content);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleGetJobCategoryList();
        handleGetJobSubCategoryList();
    }, []);

    const handleDelete = (id) => {
        httpsRequest
            ._delete(`chi-tiet-loai-cong-viec/${id}`)
            .then((res) => {
                handleGetJobSubCategoryList();
                message.success({
                    content: 'Job sub category deleted!',
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
            dataIndex: 'tenNhom',
            key: 'tenNhom',
        },
        {
            title: 'Image',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            render: (_, record) => (
                <Image
                    className={cx('jobSubCategoryImg')}
                    src={record.hinhAnh}
                    alt={record.tenNhom}
                />
            ),
        },
        {
            title: 'Job Category',
            dataIndex: 'maLoaiCongviec',
            key: 'maLoaiCongviec',
            render: (maLoaiCongviec) => {
                let loaiCongViec = jobCategoryList.find(
                    (loaiCongViec) => loaiCongViec.id === maLoaiCongviec,
                );
                if (loaiCongViec) {
                    return <span>{loaiCongViec.tenLoaiCongViec}</span>;
                } else return <span></span>;
            },
        },
        {
            title: 'Job Sub Category Item',
            dataIndex: 'dsChiTietLoai',
            key: 'dsChiTietLoai',
            render: (dsChiTietLoai) => {
                return dsChiTietLoai.map((chiTietLoai) => {
                    return (
                        <Button
                            key={chiTietLoai.id}
                            round
                            className={cx('jobSubCategoryItem')}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            {chiTietLoai.tenChiTiet}
                        </Button>
                    );
                });
            },
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <EditJobSubCategory
                        jobSubCategoryId={record.id}
                        jobCategoryList={jobCategoryList}
                        dsChiTiet={dsChiTiet}
                        handleGetJobSubCategoryList={
                            handleGetJobSubCategoryList
                        }
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

    // handle add job sub category
    const openModal = () => {
        setIsOpen(true);
        setValues({
            tenChiTiet: '',
            maLoaiCongViec: 0,
            danhSachChiTiet: [],
        });
        setItem('');
    };

    const closeModal = () => {
        setIsOpen(false);
        setValues({
            tenChiTiet: '',
            maLoaiCongViec: 0,
            danhSachChiTiet: [],
        });
        setErrors({});
        setItem('');
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

    const handleValidationSelectJobCategory = () => {
        if (!formValues['maLoaiCongViec']) {
            formIsValid = false;
            formErrors['maLoaiCongViec'] = 'Please choose job category!';
        } else formErrors['maLoaiCongViec'] = '';
        setErrors({ ...errors, ...formErrors });
    };

    const handleValidation = () => {
        handleValidationJobSubCategoryName();
        handleValidationSelectJobCategory();
        return formIsValid;
    };
    // End validation

    const inputs = [
        {
            id: 1,
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
                    {dsChiTiet.find((chiTiet) => chiTiet.id == item).tenChiTiet}
                    <span
                        className={cx('removeBtn')}
                        onClick={() => handleRemoveItem(index)}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </span>
                </Button>
            );
        });
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
                .post(`chi-tiet-loai-cong-viec/them-nhom-chi-tiet-loai`, values)
                .then((res) => {
                    handleGetJobSubCategoryList();
                    setIsOpen(false);
                    message.success({
                        content: 'Job sub category added!',
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
                        content: 'Job sub category add failed!',
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
    // end handle add job sub category

    return (
        <div>
            <div className={cx('addBtn')}>
                <Button
                    primary
                    leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                    onClick={openModal}
                >
                    Add Job Sub Category
                </Button>
            </div>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className={cx('modalWrapper')}>
                        <h2 className={cx('modalHeading')}>
                            Add Job Sub Category
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
                                />
                            ))}
                            <div className={cx('formInputDropdown')}>
                                <div className={cx('dropdownWrapper')}>
                                    <label
                                        className={cx('labelText')}
                                        for="maLoaiCongViec"
                                    >
                                        Job Category
                                    </label>
                                    <select
                                        name="maLoaiCongViec"
                                        id="maLoaiCongViec"
                                        onChange={handleChange}
                                        onBlur={
                                            handleValidationSelectJobCategory
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
                                <div className={cx('errorMessage')}>
                                    <span>{errors['maLoaiCongViec']}</span>
                                </div>
                            </div>
                            <div className={cx('formInputDropdown')}>
                                <div
                                    className={cx(
                                        'dropdownWrapper',
                                        'danhSachChiTiet',
                                    )}
                                >
                                    <label
                                        className={cx('labelText')}
                                        for="danhSachChiTiet"
                                    >
                                        Add Item
                                    </label>
                                    <select
                                        name="danhSachChiTiet"
                                        id="danhSachChiTiet"
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
                                <Button primary>Add</Button>
                                <Button danger onClick={closeModal}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
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
                                fontSize: '1.6rem',
                            },
                        },
                    }}
                >
                    <Table columns={columns} dataSource={jobSubCategoryList} />
                </ConfigProvider>
            </div>
        </div>
    );
}
