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
import AdminPageLayout from './pages/AdminPage/AdminPageLayout';
import AdminHomePage from './pages/AdminPage/AdminHomePage/AdminHomePage';
import UserManagement from './pages/AdminPage/UserManagement/UserManagement';
import JobCategoryManagement from './pages/AdminPage/JobCategoryManagement /JobCategoryManagement';
import JobManagement from './pages/AdminPage/JobManagement /JobManagement';
import BookingManagement from './pages/AdminPage/BookingManagement/BookingManagement';

import FormTest from './pages/FormTest/FormTest';
import JobSubCategoryManagement from './pages/AdminPage/JobSubCategoryManagement/JobSubCategoryManagement';
function App() {
    return (
        <>
            {/* <Spinner /> */}
            <BrowserRouter>
                <ScrollToTop>
                    <Routes>
                        <Route path="/form-test" element={<FormTest />} />

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

                        <Route path="/admin" element={<AdminPageLayout />}>
                            <Route path="/admin" element={<AdminHomePage />} />
                            <Route
                                path="/admin/user"
                                element={<UserManagement />}
                            />
                            <Route
                                path="/admin/job-category"
                                element={<JobCategoryManagement />}
                            />
                            <Route
                                path="/admin/job-sub-category"
                                element={<JobSubCategoryManagement />}
                            />
                            <Route
                                path="/admin/job"
                                element={<JobManagement />}
                            />
                            <Route
                                path="/admin/booking"
                                element={<BookingManagement />}
                            />
                        </Route>
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </>
    );
}

export default App;
