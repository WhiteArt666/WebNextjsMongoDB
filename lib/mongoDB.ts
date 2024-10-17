import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true)

    if(isConnected){
        console.log("Mongo is already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL || "", {
            dbName: "Borcella_Admin"
        })

        isConnected = true;
        console.log("Mongodb is connected");
    } catch (err){
        console.log(err)
    }


}