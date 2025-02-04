'use client'
import AdminSidebar from '@/app/components/AdminSidebar';
import axios from 'axios';
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
const UsersTable = () => {
    const [response, setResponse] = useState<User[]>([]);
    useEffect(() => {async function FetchAllUsers(){const result = await axios.get('http://localhost:4000/users'); 
        setResponse(result.data); console.log(result.data);
     } FetchAllUsers();}, []);
    const DeleteUser = async (id: number) => {
        await axios.get(`http://localhost:4000/users/delete/${id}`);
        setResponse(response.filter(user => user.id !== id));
    };
  return (
   
     <div className="flex">
      <AdminSidebar />

    
    <div className="w-10/12 h-full">
      <div className="overflow-x-auto">
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
      </div>

      </div>
      
  )
}

export default UsersTable