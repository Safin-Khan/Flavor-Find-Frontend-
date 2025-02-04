import React from 'react';
import Image from 'next/image';
import logo from '../../../public/logo.svg';

const Header: React.FC = () => {
    return (
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
                        <a href="/userDashboard" className="text-base lg:text-lg hover:text-primary text-white">Dashboard</a>
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
                        Sign-Out
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
    );
};

export default Header; 