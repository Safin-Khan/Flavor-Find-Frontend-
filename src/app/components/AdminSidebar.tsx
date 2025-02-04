'use client';
import { useState } from "react";


const AdminSidebar = () => {
  const [activeSection, setActiveSection] = useState('Profile');

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>
      <nav className="mt-6 text-black">
        {['Users', 'Foods', 'Restaurants','Create' , 'Contact', 'Help'].map((section) => (
          <a
            key={section}
            href={`adminDashboard/${section}`}
            onClick={() => setActiveSection(section)}
            className={`block w-full text-left py-2.5 px-4 hover:bg-gray-200 ${
              activeSection === section ? 'bg-gray-200' : ''
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;