"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast'
  
interface DeleteProps{
    id: string;
}

const Delete: React.FC<DeleteProps> = ({id}) => {
    const [loading,setloading] = useState(false);

    const onDelete = async () => {
        try {
           setloading(true)
           const res = await fetch(`/api/collections/${id}` , {
            method: "DELETE"
           })

           if(res.ok){
            setloading(false)
            window.location.href = ("/collections")
            toast.success("collection deleted")
           }

        } catch (err){
            console.log(err)
            toast.error("somthing went wonng!!")
        }
    }
  return (
    <AlertDialog>
    <AlertDialogTrigger>
        <Button className='bg-red-1 text-white'>
        <Trash className='h-4 w-4'/>
    </Button>
    </AlertDialogTrigger>
    <AlertDialogContent className='bg-white text-grey-1'>
      <AlertDialogHeader>
        <AlertDialogTitle className='text-red-1'>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className='bg-blue-1 text-white' onClick={onDelete}>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default Delete