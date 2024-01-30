import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import JobTab from '../JobListByCategoryPage/JobTab/JobTab';

export default function JobListByCategoryPage() {
    return (
        <div>
            <Header />
            <JobTab />
            <Footer />
        </div>
    );
}
