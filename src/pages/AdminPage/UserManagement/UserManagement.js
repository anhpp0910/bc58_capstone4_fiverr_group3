import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './UserManagement.module.scss';
import { Table, Tag, ConfigProvider, message } from 'antd';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faCircleXmark,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';

import * as httpsRequest from '../../../utils/request';
import { useDebounce } from '../../../hooks';
import Button from '../../../components/Button/Button';
import EditUser from './EditUser/EditUser';

const cx = classNames.bind(styles);

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);
    const inputRef = useRef();

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

    // handle search user by name
    const handleSearch = () => {
        if (debouncedValue) {
            httpsRequest
                .get(`users/search/${debouncedValue}`)
                .then((res) => {
                    setSearchResults(res.content);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        handleSearch();
    }, [debouncedValue]);

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResults([]);
        inputRef.current.focus();
    };
    // end handle search user by name

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
                <Tag color={role == 'ADMIN' ? 'red' : 'green'}>{role}</Tag>
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
                        handleSearch={handleSearch}
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
        <>
            <div className={cx('search')}>
                <form className={cx('searchForm')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search user by user name..."
                        spellCheck="false"
                        onChange={handleChange}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && (
                        <FontAwesomeIcon
                            className={cx('loading')}
                            icon={faSpinner}
                        />
                    )}
                </form>
            </div>
            {!searchValue && (
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
            )}
            {searchValue && (
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
                    <Table columns={columns} dataSource={searchResults} />
                </ConfigProvider>
            )}
        </>
    );
}
