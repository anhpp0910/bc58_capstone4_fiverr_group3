import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import JobTab from '../JobListPage/JobTab/JobTab';

export default function JobListPage() {
    return (
        <div>
            <Header />
            <JobTab />
            <Footer />
        </div>
    );
}
