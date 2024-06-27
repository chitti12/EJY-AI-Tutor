import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function TutorItemCard({tutor}) {

    const router=useRouter();

    const onStart=()=>{
        router.push('/dashboard/tutor/'+tutor?.quesId)
    }

    const onFeedbackPress=()=>{
        router.push('/dashboard/tutor/'+tutor.quesId+"/feedback")
    }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{tutor?.quesAsk}</h2>
        <h2 className='text-xs text-grey-400'>createdAt:{tutor.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>
        <Button size='sm' className='w-full' onClick={onStart}>Start</Button>
        <Button size='sm' variant='outline' className='w-full' onClick={onFeedbackPress}>Feedback</Button>

        </div>
    </div>
  )
}

export default TutorItemCard