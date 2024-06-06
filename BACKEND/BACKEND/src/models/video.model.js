import mongoose from "mongoose";
import mongooseAggregatePaginate
 from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema({
  videofile:{
    required: true,
    type: String,
  },
  thumbnail:{
    required: true,
    type: String,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title:{
    required: true,
    type: String,
  },
  description:{
    required: true,
    type: String,
  },
  duration:{
    required: true,
    type: Number,
  },
  views:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"user"
  }],

  ispublished:{
    type: Boolean,
    default: true,
  },
  

},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
export const video = mongoose.model("video", videoSchema) 