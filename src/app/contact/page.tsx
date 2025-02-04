import React from 'react';
import { redirect } from "next/navigation"; 
import Image from "next/image";
import logo from '../../../public/logo.svg';
import personlogo from '../../public/personlogo.svg';
import brickWallImg from '../../../public/brick-wall-texture 2.svg';
import fvLogo from '../../../public/fvlogo.svg';

import Footer from '../components/footer';

const ContactPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col relative">
          <Image
            src={brickWallImg}
            alt="Brick Wall Background"
            fill
            className="object-cover z-0"
            priority
          />
      <header className="header w-full py-2 md:py-4 relative z-10 bg-black/30 backdrop-blur-sm">
        <div className="w-full px-2 md:px-4 flex justify-between items-center">
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
                <a href="/home" className="text-base lg:text-lg hover:text-primary text-white">Home</a>
              </li>
              <li>
                <a href="/contact" className="text-base lg:text-lg hover:text-primary text-white">Contact Us</a>
              </li>
              <li>
                <a href="/dashboard" className="text-base lg:text-lg hover:text-primary text-white">Dashboard</a>
              </li>
              <li>
                <a href="/menu" className="text-base lg:text-lg hover:text-primary text-white">Our Menu</a>
              </li>
              <li>
                <a href="/restaurant" className="text-base lg:text-lg hover:text-primary text-white">Our Shop</a>
              </li>
              <li>
                {/* <a href="/cart">
                  <Image 
                    src={personlogo} 
                    alt="Shopping Cart" 
                    width={24} 
                    height={24} 
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                </a> */}
                <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="badge badge-sm indicator-item">8</span>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                    <div className="card-body">
                      <span className="text-lg font-bold">8 Items</span>
                      <span className="text-info">Subtotal: $999</span>
                      <div className="card-actions">
                        <button className="btn btn-primary btn-block">View cart</button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </li>
              
              {/* <li>
                <a href="/cart">
                  <Image 
                    src="/cart-icon.png" 
                    alt="Shopping Cart" 
                    width={24} 
                    height={24} 
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                </a>
              </li>
              <li>
                <button className="btn" onClick={addToCart}>
                  Cart
                  <div className="badge badge-secondary">{cartItems}</div>
                </button>
              </li> */}
              <li>
            <a href="/login" className="text-base lg:text-lg hover:text-primary text-white flex items-center gap-2">
                Sign-in
                <Image 
                src="/personlogo.svg" 
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

      



      <div className="relative container mx-auto h-full flex">
        <div className="w-1/2 ">
          <h1 className="text-6xl font-bold text-black">About</h1>
          <h2 className="text-4xl font-bold text-black">Flavor-Find</h2>
          <p className="text-black text-lg mt-4">Discover and compare the best dining options in town! Search for your favorite dishes, explore restaurants offering them, and make informed choices based on price, reviews, and ratings. Whether you're dining out or ordering from home through different platforms, Flavor Find helps you savor every bite.</p>
          <div className="w-full mt-8">
            <div className="flex space-x-4 mb-4">
              <label className="input input-bordered flex items-center gap-2">
                First Name :
                <input type="text" className="grow" required />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Last Name :
                <input type="text" className="grow" required />
              </label>
            </div>
            
            <label className="input input-bordered flex items-center gap-2 ">
              Email :
              <input type="text" className="grow" placeholder="yourmail@gmail.com" required />
            </label>

            <label className="text-black text-lg font-bold flex items-center gap-2 mt-4">
              Message
            </label>
            <textarea placeholder="Type your message here..." className="input input-bordered w-full h-32 mt-1" required></textarea>
            
            <button className="btn btn-neutral w-full text-lg font-semibold mt-4">
              Submit
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <Image src={fvLogo} alt="Description of image" className="object-cover h-full" />
        </div>
      </div>

      <Footer />

    </div>
    );
};

export default ContactPage; 