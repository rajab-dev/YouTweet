import mongoose from "mongoose";

const dislikeSchema = new mongoose.Schema({
   
  comment : {
     type: mongoose.Schema.Types.ObjectId,
     ref: "user"
  },
  video : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "video"
   },
   tweet : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
   },
   dislikedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
   }
  

},{timestamps:true})

export const dislike = mongoose.model("dislike", dislikeSchema) 