'use client'
import AdminSidebar from '@/app/components/AdminSidebar';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
interface Restaurant {
    id: number;
    name: string;
    location : string;
    description: string;
    createdAt: string;
    status: string;
}
const restaurantsTable = () => {
    const [response, setResponse] = useState<Restaurant[]>([]);
    useEffect(() => {async function FetchAllRestaurants(){const result = await axios.get('http://localhost:4000/restaurants'); 
        setResponse(result.data); console.log(result.data);
     } FetchAllRestaurants();}, []);
    const DeleteRestaurant = async (id: number) => {
        await axios.get(`http://localhost:4000/restaurants/delete/${id}`);
        setResponse(response.filter(restaurant => restaurant.id !== id));
    };
  return (
    
    <div className="flex">
      <AdminSidebar />
    
    <div className="w-10/12 h-full">
      <div className="flex overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Status</th>

            </tr>
          </thead>
          <tbody>
            {response.map((restaurant) => (
              <tr key={restaurant.id}>
                <td className="border px-4 py-2">{restaurant.id}</td>
                <td className="border px-4 py-2">{restaurant.name}</td>
                <td className="border px-4 py-2">{restaurant.location}</td>
                <td className="border px-4 py-2">{restaurant.description}</td>
                <td className="border px-4 py-2">{restaurant.createdAt}</td>
                <td className="border px-4 py-2">{restaurant.status}</td>
                <td>  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => DeleteRestaurant(restaurant.id)}>Delete</button>
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

export default restaurantsTable