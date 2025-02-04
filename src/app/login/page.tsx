'use client'
import React, { useState } from 'react';
import { redirect, useRouter } from "next/navigation"; 
import Image from "next/image";
import logo from '../../../public/logo.svg';
import logimg from '../../../public/logimg.svg'; 
import "../../../styles/login.css";
import Form from 'next/form';
import axios from 'axios';


export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');
        
        // New check for admin credentials
        if (formData.username === 'admin' && formData.password === 'admin') {
            alert('Redirecting to Admin Dashboard!');
            try {
              const response = await axios.post(
                  'http://localhost:4000/users/login',
                  formData,
                  {
                      withCredentials: true,
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  }
              );
              
              if (response.data) {
                  localStorage.setItem('token', response.data);
              }
              
              console.log('Response received');
              console.log('Cookies:', document.cookie);
              
              alert('Login successful!');
              router.push('/adminDashboard');
          } catch (error) {
              console.error('Login failed', error);
              alert('Login failed. Please try again.');
          }

      }
      else {
        try {
          const response = await axios.post(
              'http://localhost:4000/users/login',
              formData,
              {
                  withCredentials: true,
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
          );
          
          if (response.data) {
              localStorage.setItem('token', response.data);
          }
          
          console.log('Response received');
          console.log('Cookies:', document.cookie);
          
          alert('Login successful!');
          router.push('/home');
      } catch (error) {
          console.error('Login failed', error);
          alert('Login failed. Please try again.');
      }
    };

            
            return; // Exit the function early
        }
        
        
  return (
    <div className="mx-auto flex flex-col bg-login-image">
      <header className="header w-full py-2 md:py-4">
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
                <a href="/registration" className="text-base lg:text-lg hover:text-primary text-white">Sign-In</a>
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
            </ul>
            {/* <button className="md:hidden p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button> */}
          </nav>
        </div>
      </header>
      
      <div>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <Form
                    className="p-6 bg-white shadow-md rounded w-96"
                    onSubmit={handleSubmit}
                    action={'/'}
                >
                    <h2 className="text-xl text-black font-bold mb-4">Login</h2>
                    <input
                        className="w-full mb-3 p-2 border rounded"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="w-full mb-3 p-2 border rounded"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                        Login
                    </button>
                </Form>
            </div>
        </div>







      
      
    </div>
  );
} 