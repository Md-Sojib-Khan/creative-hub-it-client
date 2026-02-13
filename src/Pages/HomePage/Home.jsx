import React from 'react';
import HeroSection from './HeroSection';
import LatestService from './LatestService';
import AboutUs from './AboutUs';
import LatestProjects from './LatestProjects';
import TestimonialsSection from './TestimonialsSection';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <LatestService></LatestService>
            <AboutUs></AboutUs>
            <LatestProjects></LatestProjects>
            <TestimonialsSection></TestimonialsSection>
        </div>
    );
};

export default Home;