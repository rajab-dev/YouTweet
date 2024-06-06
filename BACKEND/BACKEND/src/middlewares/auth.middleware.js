import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

import { user as userModel } from "../models/user.model.js";


export const verifyjwt = asyncHandler(async(req, res, next) => {
 try {
     
 

   let token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
//    console.log(token);
   if (!token) {
       throw new ApiError(401, "unauthorized request");
   }
 

   const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
 
  const user = await userModel.findById(decodedtoken?._id).select("-password -refreshtoken")
 
 if(!user){
    throw new ApiError(401, "invalid access token")
 }
 
     req.user = user;
 
     next();
 } catch (error) {
    throw new ApiError(401, error?.message || "invalid access token ")
 }

} )

