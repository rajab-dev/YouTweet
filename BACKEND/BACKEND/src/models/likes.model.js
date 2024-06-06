import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
   
  comment : {
     type: mongoose.Schema.Types.ObjectId,
     ref: "user"
  },
  video : {
    default:null,
    type: mongoose.Schema.Types.ObjectId,
    ref: "video"
   },
   tweet : {
    default:null,
    type: mongoose.Schema.Types.ObjectId,
    ref: "tweet"
   },
   likedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
   },
  owner: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "user"
  }

},{timestamps:true})

export const like = mongoose.model("like", likeSchema) 