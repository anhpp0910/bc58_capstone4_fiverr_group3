import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HomePage from './pages/HomePage/HomePage';
import JobCategoryPage from './pages/JobCategoryPage/JobCategoryPage';
import JobListPage from './pages/JobListPage/JobListPage';
import JobDetailPage from './pages/JobDetailPage/JobDetailPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import SignInPage from './pages/SignInPage/SignInPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AdminPage from './pages/AdminPage/AdminPage';
import FormTest from './pages/FormTest/FormTest';

function App() {
    return (
        <>
            <Spinner />
            <BrowserRouter>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signIn" element={<SignInPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route
                            path="/jobCategory/:jobCategoryId"
                            element={<JobCategoryPage />}
                        />
                        <Route
                            path="/jobList/:chiTietLoaiId"
                            element={<JobListPage />}
                        />

                        <Route
                            path="/jobDetail/:jobId"
                            element={<JobDetailPage />}
                        />
                        <Route
                            path="/userProfile/:userId"
                            element={<UserProfilePage />}
                        />

                        <Route path="/formTest" element={<FormTest />} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </>
    );
}

export default App;
