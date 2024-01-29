import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import JobTab from '../JobListPage/JobTab/JobTab';
import FilterBar from './FilterBar/FilterBar';

export default function JobListPage() {
    return (
        <div>
            <Header />
            <JobTab />
            <Footer />
        </div>
    );
}
