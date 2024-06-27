"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { EJYAITutor } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import { useRouter } from 'next/navigation';
function AddNewQuestion() {
    const [openDialog, setOpenDialog] = useState(false);
    const [quesAsk, setQuesAsk] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const{user}=useUser();
    const onSubmit=async (e)=>{
      setLoading(true)
      e.preventDefault()
      console.log(quesAsk);

      const InputPrompt="Your Question: "+quesAsk+" Depends on Question give "+process.env.NEXT_PUBLIC_ANSWER_COUNT+" answers in mild, moderate and severe categorization and analyse health issues with pros and cons and provide relevant information of it in a interactive and storytelling way in JSON Format. Give us question and answer field on JSON"

      const result=await chatSession.sendMessage(InputPrompt);
      const answer= (result.response.text()).replace('```json','').replace('```','')
      console.log(JSON.parse(answer));
      setJsonResponse(answer);

      if(answer){
      const resp=await db.insert(EJYAITutor)
      .values({
        quesId:uuidv4(),
        quesAsk:quesAsk,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy'),
        answer:answer
      }).returning({quesId:EJYAITutor.quesId});

      console.log("Inserted ID:",resp)
      if(resp)
        {
          setOpenDialog(false);
          router.push(`/dashboard/tutor/${resp.quesId}`);
        }
    }
    else {
      console.log("ERROR")
    }

    setLoading(false);
    }

  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={()=>setOpenDialog(true)}
        >
            <h2 className='text-lg text-center'>+Ask New Question</h2>
            </div>
            <Dialog open={openDialog}>

            <DialogContent className='max-w-2xl'>
            <DialogHeader>
            <DialogTitle  className='text-2xl'>Ask Your Question Here</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Cautious: Ouput of your question is just information purpose only</h2>

                  <div className='mt-7 my-3'>
                    <label>Your Question:</label>
                    <Input placeholder="Ex. Patient is unable to raise their hand?" required
                    onChange={(event)=>setQuesAsk(event.target.value)}
                    />
                  </div>
                </div>
                <div className='flex gap-5 justify-end'>
                  <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
                  <Button type="submit" disabled={loading} >
                    {loading?
                    <> 
                    <LoaderCircle className='animate-spin'/>'Generating from AI'
                    </>:'Start Tutoring'
                  }
                    </Button>
                </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    </div>
  )
}

export default AddNewQuestion