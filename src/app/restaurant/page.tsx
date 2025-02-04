'use client';
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import React from 'react';
import { redirect } from "next/navigation"; 
import Image from "next/image";
import logo from '../../../public/logo.svg';
import personlogo from '../../public/personlogo.svg';
import brickWallImg from '../../../public/brick-wall-texture 2.svg';
import "../../../styles/login.css";
import Footer from '../components/footer';
import Link from 'next/link';

interface Restaurant {
  image: string | undefined;
  id: number;
  name: string;
  address: string;
  cuisine: string;
}

const Restaurants = () => {
  const [restaurants, setRestaurants] = React.useState<Restaurant[]>([]);
  const getRestaurants = async () => {
      const response = await axios.get('http://localhost:4000/restaurants');

      setRestaurants(response.data);
  };
  getRestaurants();
  const [data, setData] = useState<{ id: number; title: string; body: string }[]>([]); // Updated type for data
  const cardRef = useRef<HTMLDivElement | null>(null); // Added type for cardRef
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Added type for currentIndex
  const cardsPerView: number = 4; // Added type for cardsPerView

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setData(res.data);
    });
  }, []);
  
  const scrollLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - cardsPerView));
  };

  return (
    <div className="min-h-screen flex flex-col relative">
          <Image
            src={brickWallImg}
            alt="Brick Wall Background"
            fill
            className="object-cover z-0"
            priority
          />
          <header className="header w-full py-2 md:py-4 relative z-10 bg-black/50 backdrop-blur-sm">
            <div className=" mx-auto px-2 md:px-4 flex justify-between items-center">
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
                    <a href="/shop" className="text-base lg:text-lg hover:text-primary text-white">Our Shop</a>
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
                            stroke="black">
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
          
          <div className="relative z-[5] w-full px-4 py-6 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Search for food..." 
                  className="input input-bordered w-full pr-10"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="dropdown dropdown-end">
                <button className="btn btn-ghost btn-circle" tabIndex={0}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </button>
                <div tabIndex={0} className="dropdown-content card card-compact w-64 p-2 shadow bg-base-100 mt-4">
                  <div className="card-body">
                    <h3 className="font-bold text-lg">Filter Options</h3>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Food Type</span>
                      </label>
                      <select className="select select-bordered">
                        <option disabled selected>Select type</option>
                        <option>Vegetarian</option>
                        <option>Non-Vegetarian</option>
                        <option>Vegan</option>
                        <option>Desserts</option>
                      </select>
                    </div>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Price Range</span>
                      </label>
                      <input type="range" min="0" max="100" className="range" step="20" />
                      <div className="w-full flex justify-between text-xs px-2">
                        <span>$0</span>
                        <span>$20</span>
                        <span>$40</span>
                        <span>$60</span>
                        <span>$80</span>
                        <span>$100</span>
                      </div>
                    </div>
                    <button className="btn btn-primary mt-4">Apply Filters</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* card */}
            <div>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-center">Restaurants</h1>

                <div className="grid grid-cols-3 gap-4">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            className="card bg-base-100 w-96 shadow-xl pb-5 px-3"
                        >
                            <figure>
                                <img
                                    src={restaurant.image}
                                />
                            </figure>
                            <h2 className="my-2 text-xl font-bold card-title">
                                {restaurant.name}
                            </h2>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline">
                                    {restaurant.cuisine}
                                </div>
                            </div>
                            <p className="my-3">{restaurant.address}</p>
                            <div className="card-actions justify-center">
                                <Link
                                    href={`./restaurant/${restaurant.id}`}
                                    className="btn btn-primary"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      <Footer />

      </div>
      
  );
} 
export default Restaurants;