import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
   
  content : {
     type:String,
  },
   owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
   },
   likedby: [
      {
         type: mongoose.Schema.Types.ObjectId,
    ref: "user"
      }
   ],

   dislikedby: [
      {
         type: mongoose.Schema.Types.ObjectId,
    ref: "user"
      }
   ],




},{timestamps:true})

export const tweet = mongoose.model("tweet", tweetSchema) 