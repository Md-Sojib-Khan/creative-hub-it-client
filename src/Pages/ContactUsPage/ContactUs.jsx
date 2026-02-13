import React from 'react';
import contactImg from '../../assets/Contact-us.png'
import ContactSection from './ContactSection';
import MapSection from './MapSection';

const ContactUs = () => {
    return (
        <div>
            <div>
                <img src={contactImg} alt="" />
            </div>
            <ContactSection></ContactSection>
            <MapSection></MapSection>
        </div>
    );
};

export default ContactUs;