import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

export const GET = async (req: NextRequest, {params}: {params: {collectionId: string}}) => {
    try {
        await connectToDB()
        const collection = await Collection.findById(params.collectionId).populate({ path: "products", model: Product });
        
        if(!collection){
            return NextResponse.json({ message: "Collection not found"}, {status: 404})
        }
        
        return NextResponse.json(collection, {status: 200})
    } catch (err){
        console.log("[collectionId_GET]", err)
        return NextResponse.json({ error: "Internal error" }, { status: 500 })
    }
}

export const POST = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    const { userId } = auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    let collection = await Collection.findById(params.collectionId);
    if (!collection) {
        return NextResponse.json({ message: "Collection not found" }, { status: 404 });
    }
    
    try {
        const { title, description, image } = await req.json()
        
        if(!title || !image){
            return NextResponse.json({ message: "Title and Image are required" }, { status: 400 });
        }
        
        collection = await Collection.findByIdAndUpdate(
            params.collectionId,
            { title, description, image },
            { new: true }
        );
        
        await collection.save()
        
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error("[collectionId_POST]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        const { userId } = auth()
        if(!userId){
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
        
        await connectToDB()
        await Collection.findByIdAndDelete(params.collectionId)
        
        return NextResponse.json({ message: "Collection is deleted" }, { status: 200 })
    } catch (err) {
        console.log("[collectionId_DELETE]", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";