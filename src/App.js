import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import JobCategoryPage from './pages/JobCategoryPage/JobCategoryPage';
import JobDetailPage from './pages/JobDetailPage/JobDetailPage';
import UserDetailPage from './pages/UserDetailPage/UserDetailPage';
import SignInPage from './pages/SignInPage/SignInPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AdminPage from './pages/AdminPage/AdminPage';
import FormTest from './pages/FormTest/FormTest';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/jobCategory" element={<JobCategoryPage />} />
                <Route path="/jobDetail" element={<JobDetailPage />} />
                <Route path="/userDetail" element={<UserDetailPage />} />

                <Route path="/" element={<HomePage />} />
                <Route path="/signIn" element={<SignInPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/formTest" element={<FormTest />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
