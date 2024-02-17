import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Spinner from './components/Spinner/Spinner';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import JobCategoryPage from './pages/JobCategoryPage/JobCategoryPage';
import JobListByCategoryPage from './pages/JobListByCategoryPage/JobListByCategoryPage';
import JobSearchResultPage from './pages/JobSearchResultPage/JobSearchResultPage';
import JobDetailPage from './pages/JobDetailPage/JobDetailPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import AdminPage from './pages/AdminPage/AdminPage';
import FormTest from './pages/FormTest/FormTest';

function App() {
    return (
        <>
            {/* <Spinner /> */}
            <BrowserRouter>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/sign-in" element={<SignInPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route
                            path="/job-category/:jobCategoryId"
                            element={<JobCategoryPage />}
                        />
                        <Route
                            path="/job-list-by-category/:chiTietLoaiId"
                            element={<JobListByCategoryPage />}
                        />
                        <Route
                            path="/job-search-result/:searchValue"
                            element={<JobSearchResultPage />}
                        />
                        <Route
                            path="/job-detail/:jobId"
                            element={<JobDetailPage />}
                        />
                        <Route
                            path="/user-profile/:userId"
                            element={<UserProfilePage />}
                        />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/formTest" element={<FormTest />} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </>
    );
}

export default App;
