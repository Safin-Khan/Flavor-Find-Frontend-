'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState , JSX } from 'react';
import Form from 'next/form';
import { stat } from 'fs';
import { redirect } from "next/navigation"; 
import Image from "next/image";
import logo from '../../../public/logo.svg';
import personlogo from '../../../public/personlogo.svg';
import loginImage from '../../public/loginimage.svg'; 
import regImage from '../../../public/regimg.svg';
import "../../../styles/login.css";

const Registration = () => {
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      role: 'user',
      status: 'active',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          await axios.post('http://localhost:4000/users/', formData);
          alert('Registration successful!');
          router.push('/login');
      } catch (error) {
          console.error('Registration failed', error);
      }
  };
  return (
    <div className="min-h-screen flex flex-col bg-login-image">
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
      
      <main className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-left">
          <Image 
            src={regImage} 
            alt="Registration Background" 
            className="w-[80%] h-[80%] object-contain ml-40"
            priority
          />
        </div>
        
        <div className="relative container mx-auto h-full flex items-center">
          <div className="w-1/3 ml-20">
            <div className="registration-form">
              <form className="space-y-6 p-8 rounded-xl bg-white/20 backdrop-blur-md shadow-lg "
                    onSubmit={handleSubmit}
                    action={'/'}>
                <label className="input input-bordered flex items-center gap-2">
                  First Name
                  <input className="grow"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        required />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Last Name
                  <input className="grow"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Username
                  <input className="grow"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  Email
                  <input className="grow"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required/>
                </label>
                
                <label className="input input-bordered flex items-center gap-2">
                  Password
                  <input className="grow"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required/>
                </label>
                
                <button type="submit"  className="btn btn-neutral w-full text-lg font-semibold">
                  Register
                </button>
                <div className="flex items-center gap-2 justify-center">
                  <h1 className="text-l font-semibold">Already have an account?</h1>
                  <a href="/login" className="link text-xl">Sign-In</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 
export default Registration;
