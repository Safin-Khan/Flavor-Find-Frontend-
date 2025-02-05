'use client';
import React, { useState, useEffect, JSX } from 'react';
import Image from 'next/image';
import logo from '../../../public/logo.svg'; // Adjust the path to your logo image
import "../../../styles/dashboard.css";
import CreateRestaurant from '../restaurant/CreateRestaurant/page';
import CreateFoodItem from '../menu/CreateFoodItem/page';
import { getUserFromCookie } from '@/utility/token';
import { set } from 'react-hook-form';
import  Users  from './Users/page';
import Foods from './Foods/page';
import Restaurants from './Restaurants/page';
import Create from './Create/page';
import router from 'next/router';
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

  


    
  

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save the user data (e.g., API call)
    console.log({ firstName, lastName, email, password, username });
  };

  const sections: { [key: string]: JSX.Element } = {
    Users: (
  
      <div>
        <Users />
      </div>
      
        
    ),
    Foods: (
      <div className="flex">
        <Foods />
       
      </div>
    ),
    Restaurants: (
      <div className="flex">
        <Restaurants />
      </div>
    ),
    Create: (
      <div className="flex">
        <Create/>
      </div>
        
      
    )
  ,
    
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
      

          
















    <div className="flex min-h-screen bg-gray-100">

      
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
      <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <nav className="mt-6 text-black">
          {['Users', 'Foods', 'Restaurants','Create' , 'contact', 'help'].map((section) => (
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
            className="btn btn-outline btn-primary w-full mt-6"
          >
           {isLoading ? 'Logging out...' : 'Logout'}
          </button>
      </div>
      

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* showing some text about welcome to admin dashboard */}
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to the Admin Dashboard</h1>
        <p className="mt-4 text-gray-600">You can manage users, foods, restaurants, and more from here.</p>
      </div>
        <div>
        {sections[activeSection]}
      </div>
      </div>
    </div>

    </div>
  );
} 