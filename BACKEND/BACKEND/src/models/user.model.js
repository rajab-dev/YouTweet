import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
watchhistory:[{
   type: mongoose.Schema.Types.ObjectId,
   ref: "video",
}], 
username:{
  type: String,
  required: true,
  unique: true,
  trim:true,
  lowercase:true,
  index:true,
},

password:{
  required: true,
  type: String,
},

email:{
  required: true,
  unique: true,
  type: String,
  trim:true,
  lowercase:true,
},

fullname:{
    required: true,
    type: String,
    trim:true,
    index:true,
},

avatar:{
  type: String,
},
coverimage:{
  type: String,
},
refreshtoken:{
  type:String,
}

},
{
  timestamps:true,
}


)

userSchema.pre("save", async function (next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.ispasswordcorreect = async function (password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateaccesstoken = function(){
    return jwt.sign(
      {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname: this.fullname
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
    )
}

userSchema.methods.generaterefrershtoken = function(){
  return jwt.sign(
    {
      _id:this._id, 
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const user = mongoose.model("user",userSchema)