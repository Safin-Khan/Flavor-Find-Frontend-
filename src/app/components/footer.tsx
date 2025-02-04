import React from 'react';
import Image from 'next/image';
import logo from '../../../public/logo.svg';

const Footer: React.FC = () => {
    return (
        <footer className="footer bg-base-200 text-base-content p-10">
            <aside>
                <div className="logo">
                    <Image 
                        src={logo} 
                        alt="Flavor Find Logo" 
                        className="h-12 sm:h-16 md:h-20 w-auto"
                        priority
                    />
                </div>
                <p>
                    FLAVOR_FIND.
                    <br />
                    Discovering tastes worth savoring since [2024]
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Menu</a>
                <a className="link link-hover">Shop</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer; 