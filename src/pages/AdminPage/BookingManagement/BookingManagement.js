import React, { useState, useEffect } from 'react';
import { Table, Tag, ConfigProvider, message } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../utils/request';
import Button from '../../../components/Button/Button';
import EditBooking from './EditBooking/EditBooking';

export default function BookingManagement() {
    const [booking, setBooking] = useState([]);

    const handleGetBookingList = () => {
        httpsRequest
            .get('thue-cong-viec')
            .then((res) => {
                setBooking(res.content);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleGetBookingList();
    }, []);

    const handleDelete = (id) => {
        httpsRequest
            ._delete(`thue-cong-viec/${id}`)
            .then((res) => {
                handleGetBookingList();
                message.success({
                    content: 'Booking deleted!',
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
                    content: 'Booking delete failed!',
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
            title: 'Booking ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Job ID',
            dataIndex: 'maCongViec',
            key: 'maCongViec',
        },
        {
            title: 'Hirer ID',
            dataIndex: 'maNguoiThue',
            key: 'maNguoiThue',
        },
        {
            title: 'Hire Day',
            dataIndex: 'ngayThue',
            key: 'ngayThue',
            render: (ngayThue) => (
                <span> {moment(ngayThue).format('DD/MM/YYYY')}</span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'hoanThanh',
            key: 'hoanThanh',
            render: (hoanThanh) => (
                <Tag color={hoanThanh ? 'green' : 'red'}>
                    {hoanThanh ? 'Completed' : 'Incomplete'}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <EditBooking
                        bookingId={record.id}
                        handleGetBookingList={handleGetBookingList}
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

    return (
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
                            rowHoverBg: 'var(--background-gray)',
                        },
                    },
                }}
            >
                <Table columns={columns} dataSource={booking} />
            </ConfigProvider>
        </div>
    );
}
