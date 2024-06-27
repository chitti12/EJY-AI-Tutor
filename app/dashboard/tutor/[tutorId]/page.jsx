"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { EJYAITutor } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import FeedbackForm from './feedback/page';

function Tutor({ params }) {
    const [tutorData, setTutorData] = useState(null);
    const tutorId = params.tutorId;

    useEffect(() => {
        console.log(params.tutorId);
        const getTutorDetails = async () => {
            try {
                const result = await db.select().from(EJYAITutor)
                    .where(eq(EJYAITutor.quesId, params.tutorId));
                setTutorData(result[0]);
            } catch (error) {
                console.error('Error fetching tutor details:', error);
            }
        };

        getTutorDetails();
    }, [params.tutorId]);

    if (!tutorData) {
        return <div>
        <LoaderCircle className='animate-spin'/>
        </div>;
    }

    const jsonAnswer = JSON.parse(tutorData.answer);

    return (
        <div className='my-10 flex justify-between flex-col items-center'>
            <h2 className='font-bold text-2xl'>Let's See Answers of Your Question:</h2>
            <div className='p-5 border rounded-lg border-red-300 bg-red-100'>
                <h2 className='flex gap-2 items-center text-red-500'><Lightbulb/><strong>Cautious:</strong></h2>
                <h2 className='mt-3 text-red-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
            </div>
                <div className='flex flex-col my-5 gap-5 p-5 rounded-lg border'>
                    <div className='mt-1 text-xl'>
                        <h3><strong>Question:</strong> {jsonAnswer.question}</h3>
                        {jsonAnswer.answers.map((answer, index) => (
                            <div key={index} className='mb-2'>
                                <h3 className='font-bold text-xl'>Severity: {answer.severity}</h3>
                                {answer.cons.map((con, idx) => (
                                    <div key={idx} className='mb-1 gap-5'>
                                        <p className='font-bold text-x'><strong>Description:</strong> {con.description}</p>
                                        <p className='ml-1'><strong>Analysis:</strong> {con.analysis}</p>
                                        <p className='ml-1'><strong>Story:</strong> {con.story}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <Link href={'/dashboard/tutor/'+tutorData?.quesId+"/feedback"}>
                <FeedbackForm tutorId={tutorId} />
                </Link>
        </div>
    );
}

export default Tutor;
