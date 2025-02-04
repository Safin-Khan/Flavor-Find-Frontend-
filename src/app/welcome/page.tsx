import React from 'react';
import Image from 'next/image';
import brickWallImg from '../../public/brick-wall-texture 2.svg';
import logo from '../../public/logo.svg';
import personlogo from '../../public/personlogo.svg';
import { Playfair_Display } from 'next/font/google';
import srcImg from '../../public/searchimg.svg';
import review from '../../public/reviewimg.svg';
import Footer from '../components/footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
});

const WelcomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col relative">
            <Image
                src={brickWallImg}
                alt="Brick Wall Background"
                fill
                className="object-cover z-0"
                priority
            />
            <header className="header w-full py-2 md:py-4 relative z-10 bg-black/50 backdrop-blur-lm text-white">
                <div className="container mx-auto px-2 md:px-4 flex justify-between items-center">
                    <div className="logo">
                        <Image 
                            src={logo} 
                            alt="Flavor Find Logo" 
                            className="h-12 sm:h-16 md:h-20 w-auto"
                            priority
                        />
                    </div>
                    <nav className="nav">
                        <ul className="hidden md:flex items-center gap-4 lg:gap-8">
                            <li>
                                <a href="/registration" className="text-base lg:text-lg hover:text-primary text-white flex items-center gap-2">
                                    Sign-up
                                    <Image 
                                        src={personlogo}
                                        alt="signin" 
                                        width={24} 
                                        height={24} 
                                        className="w-6 h-6 md:w-8 md:h-8"
                                    />
                                </a>
                            </li>
                        </ul>
                        <button className="md:hidden p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </header>
            
            <div className="hero bg-base-200">
            <div className="hero-content text-center py-8">
                <div className="max-w-md">
                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg ${playfair.className} whitespace-nowrap`}>
                  Welcome to Flavor Find
                </h1>
                <p className="py-4">
                Your ultimate guide to discovering and enjoying the best dining experiences in town.
                 Whether you're craving a specific dish, searching for top-rated restaurants, or comparing options
                  for dining out or delivery, Flavor Find has you covered.
                </p>
                
            <button className="btn btn-primary">Get Started</button>
            </div>
            </div>
            </div>
           

            <div className="hero bg-base-200 ">
            <div className="hero-content text-center py-8">
                <img
                src="https://static.vecteezy.com/system/resources/previews/016/314/410/original/search-icon-free-png.png"
                className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                <h1 className="text-5xl font-bold">Search for Your Favorites!</h1>
                <p className="py-6">
                Explore restaurants offering your favorite dishes with ease.
                </p>
                <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
            </div>

            <div className="hero bg-base-200 ">
            <div className="hero-content flex-col lg:flex-row-reverse py-8">
                <img
                src="https://img.freepik.com/premium-vector/product-best-rice-sale-special-offer-silver-badge_8071-24739.jpg"
                className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                <h1 className="text-5xl font-bold">Compare Prices!</h1>
                <p className="py-6">
                Make informed decisions with transparent pricing details.
                </p>
                <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
            </div>


            <div className="hero bg-base-200 ">
            <div className="hero-content text-center py-8">
                <img
                src="https://img.freepik.com/premium-vector/review-recommended-from-customer-template_302792-123.jpg"
                className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                <h1 className="text-5xl font-bold">Read Reviews & Ratings!</h1>
                <p className="py-6">
                Trust genuine reviews to find the best dining spots.
                </p>
                <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
            </div>

            <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://th.bing.com/th/id/R.8ec4c03f4bfc7b3ecf46cb2f32a98f80?rik=DroxcDEr3yH0Tw&pid=ImgRaw&r=0)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold text-white">Hello there</h1>
                <p className="mb-5 w-full text-lg text-white">
                Let Flavor Find turn your meals into unforgettable experiences! Start your journey now and discover the flavors you love.
                </p>
                <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
            </div>
            <Footer/>
        </div>
    );
};

export default WelcomePage; 