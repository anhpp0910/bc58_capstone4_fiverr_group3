import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditBooking.module.scss';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { message } from 'antd';
import moment from 'moment';
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

function EditBooking({ bookingId, handleGetBookingList }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({});

    const handleGetBookingDetail = () => {
        httpsRequest
            .get(`thue-cong-viec/${bookingId}`)
            .then((res) => {
                const { id, maCongViec, maNguoiThue, ngayThue, hoanThanh } =
                    res.content;
                setValues({
                    id,
                    maCongViec,
                    maNguoiThue,
                    ngayThue: moment(ngayThue).format('YYYY-MM-DD'),
                    hoanThanh,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const openModal = () => {
        setIsOpen(true);
        handleGetBookingDetail();
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const inputs = [
        {
            id: 1,
            name: 'id',
            type: 'text',
            labelText: 'Booking ID',
            disabled: true,
        },
        {
            id: 2,
            name: 'maCongViec',
            type: 'text',
            labelText: 'Job ID',
            disabled: true,
        },
        {
            id: 3,
            name: 'maNguoiThue',
            type: 'text',
            labelText: 'Hirer ID',
            disabled: true,
        },
        {
            id: 4,
            name: 'ngayThue',
            type: 'date',
            labelText: 'Hire Day',
            disabled: true,
        },
    ];

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        httpsRequest
            .put(`thue-cong-viec/${bookingId}`, values)
            .then((res) => {
                handleGetBookingDetail();
                setIsOpen(false);
                handleGetBookingList();
                message.success({
                    content: 'Booking edited successful!',
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
                    content: 'Booking edit failed!',
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
                        <h2 className={cx('editBookingText')}>Edit Booking</h2>
                        <form onSubmit={(e) => handleSubmit(e)}>
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
                                    <label className={cx('labelText')}>
                                        Status
                                    </label>
                                    <div className={cx('radio')}>
                                        <div>
                                            <input
                                                id="incomplete"
                                                type="radio"
                                                name="hoanThanh"
                                                value={false}
                                                defaultChecked={
                                                    values.hoanThanh === false
                                                        ? 'checked'
                                                        : null
                                                }
                                                onChange={handleChange}
                                            />
                                            <label
                                                className={cx('radioLabel')}
                                                htmlFor="incomplete"
                                            >
                                                Incomplete
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                id="completed"
                                                type="radio"
                                                name="hoanThanh"
                                                value={true}
                                                defaultChecked={
                                                    values.hoanThanh === true
                                                        ? 'checked'
                                                        : null
                                                }
                                                onChange={handleChange}
                                            />
                                            <label
                                                className={cx('radioLabel')}
                                                htmlFor="completed"
                                            >
                                                Completed
                                            </label>
                                        </div>
                                    </div>
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

EditBooking.propTypes = {
    bookingId: PropTypes.number,
    handleGetBookingList: PropTypes.func,
};

export default EditBooking;
