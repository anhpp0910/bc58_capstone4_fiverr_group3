import React from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import JobTab from '../JobSearchResultPage/JobTab/JobTab';

export default function JobSearchResultPage() {
    return (
        <div>
            <Header />
            <JobTab />
            <Footer />
        </div>
    );
}
