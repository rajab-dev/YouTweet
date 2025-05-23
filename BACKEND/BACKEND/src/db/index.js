import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";


// const connectDB = async () => {
//    try {
//        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host} ${DB_NAME }`)
//    } catch (error) {
//       console.log("mongo db connection failed" , error)
//    }
// }

const connectDB = async () => {
   try {
     
      await mongoose.connect(process.env.MONGODB_URI)
      console.log("CONNECTED TO MONGODB ATLAS!!!")
    
   } catch (error) {
     console.log("Error connecting to MONGODB",error.message)
   }

}

export default connectDB;