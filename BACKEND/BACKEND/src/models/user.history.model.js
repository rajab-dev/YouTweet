import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
   
  video : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "video"
   },
   user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
   },
   owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
   }

},{timestamps:true})

export const history = mongoose.model("history", historySchema) 