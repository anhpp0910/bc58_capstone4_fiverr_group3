import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import JobCategoryPage from './pages/JobCategoryPage/JobCategoryPage';
import JobDetailPage from './pages/JobDetailPage/JobDetailPage';
import UserDetailPage from './pages/UserDetailPage/UserDetailPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AdminPage from './pages/AdminPage/AdminPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/jobCategory" element={<JobCategoryPage />} />
                <Route path="/jobDetail" element={<JobDetailPage />} />
                <Route path="/userDetail" element={<UserDetailPage />} />

                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
