'use client';
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Link from 'next/link';
import React from 'react';
import { redirect } from "next/navigation"; 
import Image from "next/image";
import logo from '../../../public/logo.svg';
import personlogo from '../../public/personlogo.svg';
import brickWallImg from '../../../public/brick-wall-texture 2.svg';
import "../../../styles/home.css";
import Footer from '../components/footer';
import Header from '../components/header';
import hero from '../../../public/himg.png';
import backImage from '../../../public/back.svg'; 

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
};

interface FoodItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  cuisine: string;
}
const FoodItem = () => {
  const [foodItems, setFoodItems] = React.useState<FoodItem[]>([]);

  const getFoodItem = async () => {
      try {
          const items = await axios.get('http://localhost:4000/food-items');
          setFoodItems(items.data);
      } catch (err: any) {
          console.error(err);
      }
  };
  getFoodItem();
};



export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentIndexFoods, setCurrentIndexFoods] = useState<number>(0);
  const [currentIndexRestaurants, setCurrentIndexRestaurants] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  const cardsPerView = 4;

  // Add useEffect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodResponse, restaurantResponse] = await Promise.all([
          axios.get('http://localhost:4000/food-items'),
          axios.get('http://localhost:4000/restaurants')
        ]);
        setFoodItems(foodResponse.data);
        setRestaurants(restaurantResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setCurrentIndexFoods((prevIndex) => Math.min(prevIndex, data.length - cardsPerView));
      setCurrentIndexRestaurants((prevIndex) => Math.min(prevIndex, data.length - cardsPerView));
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [data.length, cardsPerView]);

  const scrollRightFoods = () => {
    const maxStartIndex = Math.max(0, foodItems.length - cardsPerView);
    setCurrentIndexFoods((prevIndex) => Math.min(prevIndex + cardsPerView, maxStartIndex));
  };

  const scrollLeftFoods = () => {
    setCurrentIndexFoods((prevIndex) => Math.max(0, prevIndex - cardsPerView));
  };

  const scrollRightRestaurants = () => {
    const maxStartIndex = Math.max(0, restaurants.length - cardsPerView);
    setCurrentIndexRestaurants((prevIndex) => Math.min(prevIndex + cardsPerView, maxStartIndex));
  };

  const scrollLeftRestaurants = () => {
    setCurrentIndexRestaurants((prevIndex) => Math.max(0, prevIndex - cardsPerView));
  };

  // Intersection Observer setup
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the card is visible
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          card.classList.add("animate"); // Add animation class
          observer.current?.unobserve(card); // Stop observing after animation
        }
      });
    }, options);

    // Observe each card
    const cards = document.querySelectorAll(".card-title");
    cards.forEach((card) => {
      observer.current?.observe(card);
    });

    return () => {
      if (observer.current) {
        cards.forEach((card) => {
          observer.current?.unobserve(card);
        });
      }
    };
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
       
      {/* <header className="header w-full py-2 md:py-4 relative z-10 bg-black/30 backdrop-blur-sm">
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
      </header> */}
    
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://img.freepik.com/free-photo/delicious-realistic-burger_23-2150902338.jpg?t=st=1737124109~exp=1737127709~hmac=721444ca30d17ce0ae10f318c0009eae0cc867a642a4d67b8d0a9dd4fc9e30ed&w=1380"
            className="w-full h-[500px] object-cover" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://img.freepik.com/free-photo/delicious-food-table_23-2150857814.jpg?t=st=1737124155~exp=1737127755~hmac=32a44e796ac8eb3320bbffcc7e8261d8f95c18b98303115d353f50744e6d7097&w=1380"
            className="w-full h-[500px] object-cover" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://img.freepik.com/free-photo/top-view-eid-al-fitr-celebration-with-delicious-food_23-2151205072.jpg?t=st=1737124195~exp=1737127795~hmac=7af3c89cb96f5bd948e18ec033058f356c4e856b9c775c2d746ac4075c0dbfdf&w=1380"
            className="w-full h-[500px] object-cover" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://img.freepik.com/free-photo/delicious-taco-studio_23-2151047958.jpg?t=st=1737124237~exp=1737127837~hmac=89d8f48a1cc2305d31d01486bdf7a0bc897fdc148b537330ff309feebfb6f97d&w=1380"
            className="w-full h-[500px] object-cover" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    
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
        <div tabIndex={0} className="dropdown-content card card-compact w-64 p-2 shadow bg-base-100 mt-4 z-10">
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
    
    
    
      {/* Foods Card Section */}
      <div className="card mx-auto">
        <h1 className="text-4xl font-bold text-left text-white">Foods</h1>
        <div className="flex items-center justify-between">
          <button onClick={scrollLeftFoods} className="btn btn-primary" disabled={currentIndexFoods === 0}>←</button>
          <div className="card-body flex flex-col  justify-between">
            <div className="flex space-x-4">
              {foodItems.slice(currentIndexFoods, currentIndexFoods + cardsPerView).map((fooditem) => (
                <div key={fooditem.id} className="card-title bg-green-800 p-4 rounded-2xl flex-none w-1/4">
                  <figure>
                                <img
                                    src={fooditem.image}
                                />
                            </figure>
                <div>
                <h2 className="my-2 text-xl font-bold card-title">
                      {fooditem.name}
                  </h2>
                  <div className="card-actions justify-start">
                      <div className="badge badge-outline">
                          {fooditem.cuisine}
                      </div>
                  </div>
                <p className="my-3">BDT : {fooditem.price}</p>
                <p className="my-3">{fooditem.description}</p>
                <div className="card-actions justify-center">
                  <Link
                    href={`/menu/${fooditem.id}`}
                    className="btn btn-primary"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          
              ))}

            </div>
          </div>
          <button 
            onClick={scrollRightFoods} 
            className="btn btn-primary" 
            disabled={currentIndexFoods >= foodItems.length - cardsPerView}
          >→</button>
        </div>
      </div>

      {/* Restaurants Card Section */}
      <div className="card mx-auto">
        <h1 className="text-4xl font-bold text-left text-white">Restaurants</h1>
        <div className="flex items-center justify-between">
          <button onClick={scrollLeftRestaurants} className="btn btn-primary" disabled={currentIndexRestaurants === 0}>←</button>
          <div className="card-body flex flex-col justify-between">
            <div className="flex space-x-4">
              {restaurants.slice(currentIndexRestaurants, currentIndexRestaurants + cardsPerView).map((restaurant) => (
                <div key={restaurant.id} className="card-title bg-gray-800 p-4 rounded flex-none w-1/4">
                  <figure>
                                <img
                                    src={restaurant.image}
                                />
                            </figure>
                  <div>
                  <h2 className="my-2 text-xl font-bold card-title">
                        {restaurant.name}
                    </h2>
                    <div className="card-actions justify-start">
                        <div className="badge badge-outline">
                            {restaurant.cuisine}
                        </div>
                    </div>
                    <p className="my-3">{restaurant.address}</p>
                  </div>
                  <div className="card-actions ">
                    <button className="btn btn-primary">View</button>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={scrollRightRestaurants} 
            className="btn btn-primary" 
            disabled={currentIndexRestaurants >= restaurants.length - cardsPerView}
          >→</button>
        </div>
      </div>

               <div className="hero min-h-screen"
                style={{
                  backgroundImage: `url(${hero.src})`,
                }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-neutral-content text-center">
                  <div className="max-w-md text-white">
                    <h1 className="mb-5 text-6xl font-bold">Flavor find</h1>
                    <p className="mb-5 text-lg">
                    Discover and compare the best dining options in town! Search for your favorite dishes, 
                    explore restaurants offering them, and make informed choices based on price, reviews, and ratings. 
                    Whether you're dining out or ordering from home through different platforms, Flavor Find helps you savor every bite.
                    </p>
                    
                  </div>
                </div>
              </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    <Footer />
    
  </div>

);
} 