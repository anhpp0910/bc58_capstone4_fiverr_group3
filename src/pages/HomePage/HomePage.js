import React from 'react';

import Header from './Header/Header';
import Carousel from './Carousel/Carousel';
import Services from './Services/Services';
import Marketplace from './Marketplace/Marketplace';
import Feedback from './Feedback/Feedback';
import Trusted from './Trusted/Trusted';
import SellingProposition from './SellingProposition/SellingProposition';
import Footer from '../../components/Footer/Footer';

export default function HomePage() {
    return (
        <div>
            <Header />
            <Carousel />
            <Trusted />
            <Services />
            <SellingProposition />
            <Feedback />
            <Marketplace />
            <Footer />
        </div>
    );
}
