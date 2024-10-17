"use client"
import { useEffect, useState } from "react"
import Loader from "@/components/custom ui/Loader";
import CollectionForm from "@/components/collections/CollectionForm";


const CollectionDetial = ({params}: {params: {collectionId: string}}) => {
    const[loading, setloading] = useState(true)
    const[collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null)

    const getCollectionDetails = async () =>{
        try {
            const res = await fetch(`/api/collections/${params.collectionId}`,{
                method: "GET"
            }) 
            const data = await res.json()
            setCollectionDetails(data)
            setloading(false)
        } catch (err){
            console.log("[collectionId_GET]",err)
        }
    }

    useEffect(() => {
        getCollectionDetails()
    }, [])


  return loading ? <Loader/> : (
    <CollectionForm initialData={collectionDetails}/>
  )
}

export default CollectionDetial