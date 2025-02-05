'use client';
import React, { useState, useEffect, JSX } from 'react';
import Image from 'next/image';
import logo from '../../../public/logo.svg'; // Adjust the path to your logo image
import "../../../styles/dashboard.css";
import CreateRestaurant from '../restaurant/CreateRestaurant/page';
import CreateFoodItem from '../menu/CreateFoodItem/page';
import { getUserFromCookie } from '@/utility/token';
import { set } from 'react-hook-form';

import { useRouter } from 'next/navigation';



export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('profile');
  const userId=getUserFromCookie();
  
  // New state variables for user profile
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      // Replace with your API call to fetch user data
      const userData = await fetch(`http://localhost:4000/users/${userId}`);

      
      const user = await userData.json();
      
      // Set state with existing user data
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setUsername(user.username);
      setPassword(user.password);
      // Password should not be pre-filled for security reasons
    };



    fetchUserData();
  }, []);
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      
      // Clear local storage
      localStorage.removeItem('token');

      // Call logout endpoint
      const response = await fetch('http://localhost:4000/users/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      // Navigate to login
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
 
  
  const updateUser = async () => {
    const response = await fetch(`http://localhost:4000/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password, username,role:"Customer",status: "active" }),
    });

    if (!response.ok) {
      // Handle error
      console.error('Failed to update user');
    } else {
      // Handle success
      console.log('User updated successfully');
    }
  };

  


    
  

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save the user data (e.g., API call)
    console.log({ firstName, lastName, email, password, username });
  };

  const sections: { [key: string]: JSX.Element } = {
    profile: (
        <div className="bg-white p-6 rounded-lg shadow-md text-black">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  />
            </div>
            
          </div>
          <div>
          <button type="submit" className="mt-6 btn btn-outline btn-primary px-4 py-2 " onClick={updateUser}>Save</button>
          </div>        
        </form>

      </div>
    ),
    history: (
      <div className="bg-white p-6 rounded-lg shadow-md text-black">
       <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              { id: 1, itemName: 'Product A', price: '$20' },
              { id: 2, itemName: 'Product B', price: '$30' },
              { id: 3, itemName: 'Product C', price: '$25' },
            ].map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.itemName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    create: (
    <div className="grid grid-cols-2 gap-4">
    <div>
    <CreateFoodItem />


    </div>
    
    <div>
    <CreateRestaurant />
    </div>
  </div>
        
      
    )
  ,
    reviews: (
      <div className="bg-white p-6 rounded-lg shadow-md text-black">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[
              { id: 1, product: 'Product A', rating: 4, comment: 'Great product!' },
              { id: 2, product: 'Product B', rating: 3, comment: 'Good, but could be better.' },
              { id: 3, product: 'Product C', rating: 5, comment: 'Excellent!' },
            ].map((review) => (
              <tr key={review.id}>
                <td className="px-6 py-4 whitespace-nowrap">{review.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
                <td className="px-6 py-4 whitespace-nowrap">{review.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    contact: (
        <div className="bg-white p-6 rounded-lg shadow-md text-black">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows={4}></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Send
          </button>
        </form>
      </div>
    ),
    help: (
        <div className="bg-white p-6 rounded-lg shadow-md text-black">
        <h2 className="text-xl font-semibold mb-4">Help</h2>
        <p>If you need assistance, please contact our support team at support@example.com.</p>
      </div>
    ),
  };

  return (
    <div className="mx-auto bg-gray-100">
      {/* Header */}
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
                    <a onClick={handleLogout} className="text-base lg:text-lg hover:text-primary text-white flex items-center gap-2">
                        Logout
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

          
















    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 shadow-md text-white">
      <div className="p-6">
          <h1 className="text-2xl font-bold tex-white">Dashboard</h1>
        </div>
        <nav className="mt-6 text-black text-white">
          {['profile', 'history','create', 'reviews', 'contact', 'help'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`block w-full text-left py-2.5 px-4 hover:bg-gray-200 ${
                activeSection === section ? 'bg-gray-200' : ''
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>
        <button 
      onClick={handleLogout}
      disabled={isLoading}
      className="btn btn-secondary w-full mt-4"
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
      </div>
      

      {/* Main Content */}
      <div className="flex-1 p-10">
        {sections[activeSection]}
      </div>
    </div>

    </div>
  );
} 