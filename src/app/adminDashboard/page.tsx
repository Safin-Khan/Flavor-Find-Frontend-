// import React, { useState, useEffect } from 'react';

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [restaurants, setRestaurants] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);

//   useEffect(() => {
//     // Fetch users and restaurants from API
//     const fetchData = async () => {
//       const usersResponse = await fetch('/api/users');
//       const usersData = await usersResponse.json();
//       setUsers(usersData);

//       const restaurantsResponse = await fetch('/api/restaurants');
//       const restaurantsData = await restaurantsResponse.json();
//       setRestaurants(restaurantsData);
//     };
//     fetchData();
//   }, []);

//   const handleDeleteUser = async (userId) => {
//     await fetch(`/api/users/${userId}`, { method: 'DELETE' });
//     setUsers(users.filter(user => user.id !== userId));
//   };

//   const handleDeleteRestaurant = async (restaurantId) => {
//     await fetch(`/api/restaurants/${restaurantId}`, { method: 'DELETE' });
//     setRestaurants(restaurants.filter(restaurant => restaurant.id !== restaurantId));
//   };

//   const handleEditUser = (user) => {
//     setSelectedUser(user);
//     // Open a modal or form to edit user
//   };

//   const handleEditRestaurant = (restaurant) => {
//     setSelectedRestaurant(restaurant);
//     // Open a modal or form to edit restaurant
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>

//       {/* User Management Section */}
//       <h2>User Management</h2>
//       <input
//         type="text"
//         placeholder="Search by username"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <ul>
//         {users.filter(user => user.username.includes(searchTerm)).map(user => (
//           <li key={user.id}>
//             {user.username}
//             <button onClick={() => handleEditUser(user)}>Edit</button>
//             <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//       {/* Restaurant Management Section */}
//       <h2>Restaurant Management</h2>
//       <ul>
//         {restaurants.map(restaurant => (
//           <li key={restaurant.id}>
//             {restaurant.name}
//             <button onClick={() => handleEditRestaurant(restaurant)}>Edit</button>
//             <button onClick={() => handleDeleteRestaurant(restaurant.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//       {/* User Edit Form (Modal or inline) */}
//       {selectedUser && (
//         <div>
//           <h3>Edit User: {selectedUser.username}</h3>
//           {/* Add form fields to edit user information */}
//           <button onClick={() => setSelectedUser(null)}>Close</button>
//         </div>
//       )}

//       {/* Restaurant Edit Form (Modal or inline) */}
//       {selectedRestaurant && (
//         <div>
//           <h3>Edit Restaurant: {selectedRestaurant.name}</h3>
//           {/* Add form fields to edit restaurant information */}
//           <button onClick={() => setSelectedRestaurant(null)}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;