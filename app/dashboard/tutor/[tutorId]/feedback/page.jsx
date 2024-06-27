"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { Feedback } from '@/utils/schema';
import { Button } from '@/components/ui/button';
import { Stars } from 'lucide-react';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';

function FeedbackForm() {
    const [rating, setRating] = useState();
    const [review, setReview] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState();
    const{user}=useUser();
  
    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleSubmit = async (event) => {
        const route=useRouter();
        event.preventDefault();

        try {
            await db.insert(Feedback).values({
                rating:rating,
                review:review,
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format('DD-MM-yyyy'),
            });
            setSubmitted(true);

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                route.replace('/dashboard');
            }, 2000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setError('Error submitting feedback');
    };
        } 

    return (
        <div className='mt-2 flex flex-col items-center'>
            <h2 className='font-bold text-2xl mb-1'>Submit Your Feedback</h2>
            {submitted ? (
                <div className='items-center'>
                    <h3>Thank you for your feedback!</h3>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className='flex flex-col items-center w-100 max-w-500'>
                    <div className='flex mb-1'>
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <Stars
                                type="button"
                                key={index}
                                onClick={() => handleRating(index)}
                                style={{ color: index <= rating ? 'gold' : 'grey' }}
                                >
                                <span className="star">&#9733;</span>
                                </Stars>

                            );
                        })}
                    </div>
                    <textarea
                        className='w-100 p-1 mb-1 border rounded-lg text-lg'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review here..."
                        rows="5"
                    />
                    <Button type="submit" className='p-1 text-lg font-bold text-white bg-primary border-none rounded-lg cursor-pointer'>
                        Submit
                    </Button>
                    {error && <p className='text-red mt-1'>{error}</p>}
                </form>
            )}
        </div>
    );
}

export default FeedbackForm