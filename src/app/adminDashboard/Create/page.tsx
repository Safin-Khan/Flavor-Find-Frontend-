import AdminSidebar from '@/app/components/AdminSidebar'
import CreateFoodItem from '@/app/menu/CreateFoodItem/page'
import CreateRestaurant from '@/app/restaurant/CreateRestaurant/page'
import React from 'react'

const Create = () => {
  return (
    <div className="flex">
        <AdminSidebar />
    <div className="w-10/12 grid grid-cols-2 gap-4">
    <div>
    <CreateFoodItem />


    </div>
    
    <div>
    <CreateRestaurant />
    </div>
  </div>
  </div>
  )
}

export default Create
