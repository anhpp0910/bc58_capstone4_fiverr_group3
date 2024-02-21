import React, { useState, useEffect } from 'react';

const FormTest = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=10`,
            );
            const data = await response.json();
            setUsers((prevUsers) => [...prevUsers, ...data]);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
            <button onClick={handleLoadMore} disabled={loading}>
                Load More
            </button>
        </div>
    );
};

export default FormTest;
