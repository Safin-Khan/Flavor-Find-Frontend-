'use client'
import AdminSidebar from '@/app/components/AdminSidebar';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
interface Food {
    id: number;
    name: string;
    price: number;
    description?: string;
    image: string;
    cuisine: string;
    restaurantId: number;
    
}
const FoodsTable = () => {
    const [response, setResponse] = useState<Food[]>([]);
    useEffect(() => {async function FetchAllFoods(){const result = await axios.get('http://localhost:4000/food-items'); 
        setResponse(result.data); console.log(result.data);
     } FetchAllFoods();}, []);
    const DeleteFood = async (id: number) => {
        await axios.get(`http://localhost:4000/food-items/delete/${id}`);
        setResponse(response.filter(food => food.id !== id));
    };

    
  return (
    
    
    <div className="w-full h-full">
      {/* Total users */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md text-black">
        <h2 className="text-xl font-semibold">Total Food Items</h2>
        <span className="text-2xl font-bold">{response.length}</span>
      </div>
      <div className="overflow-x-auto text-black">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Cuisine</th>
                <th className="px-4 py-2">Restaurant ID</th>
                <th className="px-4 py-2">Actions</th>

              

            </tr>
          </thead>
          <tbody>
            {response.map((Food) => (
              <tr key={Food.id}>
                <td className="border px-4 py-2">{Food.id}</td>
                <td className="border px-4 py-2">{Food.name}</td>
                <td className="border px-4 py-2">{Food.price}</td>
                <td className="border px-4 py-2">{Food.description}</td>
                <td className="border px-4 py-2">{Food.image}</td>
                <td className="border px-4 py-2">{Food.cuisine}</td>
                <td className="border px-4 py-2">{Food.restaurantId}</td>

                
                
                
                <td>  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => DeleteFood(Food.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
   
  )
}

export default FoodsTable