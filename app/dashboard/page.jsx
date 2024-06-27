import React from 'react'
import AddNewQuestion from './_components/AddNewQuestion'
import TutorList from './_components/TutorList'

function Dashboard() {
  return (
    <div className='p-10'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <h2 className='text-gray-500'>Create and Start your AI Tutor</h2>

         <div className='grid grid-cols-1 md:grid-cols-3'>
        <AddNewQuestion/>
        </div> 

        {/* Tutor List */}
        <TutorList/>
    </div>
  )
}

export default Dashboard