'use client'
import AdminSidebar from '@/app/components/AdminSidebar';
import axios from 'axios';
import { url } from 'inspector';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
interface User {
  id: number;
  firstName: string;
  lastName : string;
  email: string;
  password: string;
  username : string;
  role: string;
  createdAt: string;
  status: string;
}
interface SearchUser{
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}
const UserCard = ({ searchResults }: { searchResults: SearchUser }) => {
  const handleEdit = () => {
    console.log('Edit user:', searchResults.id);
  };
}
const UsersTable = () => {
    const [response, setResponse] = useState<User[]>([]);
    const [searchResults, setSearchResults] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {async function FetchAllUsers(){const result = await axios.get('http://localhost:4000/users'); 
        setResponse(result.data); console.log(result.data);
     } FetchAllUsers();}, []);
    const DeleteUser = async (id: number) => {
        await axios.get(`http://localhost:4000/users/delete/${id}`);
        setResponse(response.filter(user => user.id !== id));
      };

       

        // Filter customers based on search query
       
        
        
        const SearchUser = async (searchQuery:number) => {
          console.log(searchQuery);
          const result = await axios.get(`http://localhost:4000/users/${searchQuery}`);
          console.log(result.data);
          setSearchResults(result.data);
        };

      const [firstName, setFirstName] = useState<string>('');
       const [lastName, setLastName] = useState<string>('');
       const [email, setEmail] = useState<string>('');
       const [password, setPassword] = useState<string>('');
       const [username, setUsername] = useState<string>('');
     
    //  useEffect(() => {
    //     const fetchUserData = async () => {
    //       // Replace with your API call to fetch user data
    //       const userData = await fetch(`http://localhost:4000/users/${userId}`);
    
          
    //       const user = await userData.json();
          
    //       // Set state with existing user data
    //       setFirstName(user.firstName);
    //       setLastName(user.lastName);
    //       setEmail(user.email);
    //       setUsername(user.username);
    //       setPassword(user.password);
    //       // Password should not be pre-filled for security reasons
    //     };
    
    
    
    //     fetchUserData();
    //   }, []);
     
      
      const updateUser = async (userId:number) => {
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
        

        
  return (
   
   
      

    
    <div className="w-full h-full">
      {/* Total users */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md text-black">
        <h2 className="text-xl font-semibold">Total Users</h2>
        <span className="text-2xl font-bold">{response.length}</span>
      </div>
      <div className="overflow-x-auto text-black">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {response.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.firstName}</td>
                <td className="border px-4 py-2">{user.lastName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.password}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.createdAt}</td>
                <td className="border px-4 py-2">{user.status}</td>
                <td>  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => DeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      
      {/* shows user information in table which is inputed in search  */}
      
      <div className="mb-6">
          <input
            type="text"
            placeholder="Search users by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="btn btn-primary" onClick={() => SearchUser(Number(searchQuery))}>
            Search
            </button>
            
        {/* <form onSubmit={(e) => SearchUser(e)}>
        
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
        </form> */}
      {searchResults && (
        <div 
          key={searchResults.username} 
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-black"
        > Name:
          <h3 className="font-semibold text-lg">
            {searchResults.firstName} {searchResults.lastName}
          </h3>
          Email:
          <p className="text-gray-600">{searchResults.email}</p>
        <div className="mt-3 flex gap-2">
          
          
        </div>
      </div>
    )}
    </div>
  
      
    

   
  
    </div>
  );
};


export default UsersTable