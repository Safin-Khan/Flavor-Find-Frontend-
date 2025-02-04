'use client';
import axios from 'axios';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const router = useRouter();
    const unwrappedParams = React.use(params);
    const [user, setUser] = React.useState<{ firstName: string; lastName: string; email: string; password: string; username: string }>({ firstName: '', lastName: '', email: '', password: '', username: '' });
    useEffect(() => {
        const getUser = async () => {
            // Fetch user by id
            const userResponse = await axios.get(
                `http://localhost:4000/users/${unwrappedParams.id}`
            );
            setUser(userResponse.data);
        };
        getUser();
    }, [unwrappedParams.id]);
    

    return (
        <div className="container mx-auto">

                <p className="text-2xl">Firstname: {user.firstName}</p>
                <p className="text-2xl">Lastname: {user.lastName}</p>
                <p className="text-2xl">Email: {user.email}</p>
                <p className="text-2xl">Username: {user.username}</p>
                <p className="text-2xl">Password: {user.password}</p>

            
        </div>
    );
};

export default page;