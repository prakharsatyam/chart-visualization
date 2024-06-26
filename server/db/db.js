import mongoose from "mongoose";
const dbn ='charts' 
const connectDB= async ()=>{
   try {
    const instance= await mongoose.connect(`${process.env.DB_URI}${dbn}`)
     
   } catch (error) {
    console.log("error connecting to the database");
    process.exit(1);
   } finally{
      console.log("connected to mongoDB")
   }
}

export default connectDB;