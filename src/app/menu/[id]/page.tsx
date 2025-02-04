'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useParams } from 'next/navigation';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string | null;
  cuisine: string;
}

export default function FoodItemDetail() {
  const params = useParams();
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/food-items/${params.id}`);
        setFoodItem(response.data);
      } catch (error) {
        console.error('Error fetching food item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItem();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!foodItem) {
    return <div>Food item not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {foodItem.image && (
            <img 
              src={foodItem.image} 
              alt={foodItem.name}
              className="w-full h-96 object-cover"
            />
          )}
          <div className="p-6 text-black">
            <h1 className="text-3xl font-bold mb-4">{foodItem.name}</h1>
            <p className="text-gray-600 mb-4">{foodItem.description}</p>
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold">${foodItem.price}</span>
              <span className="badge badge-lg">{foodItem.cuisine}</span>
            </div>
            <button className="btn btn-primary w-full">Add to Cart</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}