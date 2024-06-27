"use client"
import { EJYAITutor } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import TutorItemCard from './TutorItemCard';
import { db } from '@/utils/db';

function TutorList() {
    const { user } = useUser();
    const [tutorList, setTutorList] = useState([]);

    useEffect(() => {
        if (user) {
            GetTutorList();
        }
    }, [user]);

    const GetTutorList = async () => {
        try {
            const result = await db
                .select()
                .from(EJYAITutor)
                .where(eq(EJYAITutor.createdBy, user.primaryEmailAddress.emailAddress))
                .orderBy(desc(EJYAITutor.id));

            console.log(result);
            setTutorList(result);
        } catch (error) {
            console.error("Failed to fetch tutor list:", error);
        }
    };

    return (
        <div>
            <h2>Previous Queries</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                {tutorList&&tutorList.map((tutor, index)=>(
                    <TutorItemCard
                    tutor={tutor}
                    key={index}/>
                ))}
            </div>
        </div>
    );
}

export default TutorList;
