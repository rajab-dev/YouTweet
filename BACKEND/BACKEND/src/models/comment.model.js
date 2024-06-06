import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
   
  content : {
     type:String,
  },
  video : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "video"
   },
   owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
   },

},{timestamps:true})

export const comment = mongoose.model("comment", commentSchema) 