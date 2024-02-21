import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserManagement.module.scss';
import Modal from 'react-modal';
import { Table, Tag, ConfigProvider, message } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../utils/request';
import Button from '../../../components/Button/Button';
import EditUser from './EditUser/EditUser';

const cx = classNames.bind(styles);

export default function UserManagement() {
    const [users, setUsers] = useState([]);

    const handleGetUserList = () => {
        httpsRequest
            .get('users')
            .then((res) => {
                setUsers(res.content);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleGetUserList();
    }, []);

    const handleDelete = (id) => {
        httpsRequest
            ._delete(`users?id=${id}`)
            .then((res) => {
                console.log(res);
                handleGetUserList();
                message.success({
                    content: 'User deleted!',
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
                    content: 'User delete failed!',
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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (birthday) => (
                <span> {moment(birthday).format('DD/MM/YYYY')}</span>
            ),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => (
                <>
                    <p>{gender ? 'Male' : 'Female'}</p>
                </>
            ),
        },

        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag color={role == 'ADMIN' ? 'red' : 'geekblue'}>{role}</Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <EditUser
                        userId={record.id}
                        handleGetUserList={handleGetUserList}
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
        <div className={cx('wrapper')}>
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
                <Table columns={columns} dataSource={users} />
            </ConfigProvider>
        </div>
    );
}
