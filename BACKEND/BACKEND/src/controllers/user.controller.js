import { asyncHandler } from "../utils/asyncHandler.js";
import { user as userModel } from "../models/user.model.js";
import { video as videoModel } from "../models/video.model.js";
import {subscription as subscriptionModel} from "../models/subscription.model.js";
import { like as  likesModel } from "../models/likes.model.js";
import { dislike as dislikeModel } from "../models/dislike.model.js";
import { comment as commentsModel } from "../models/comment.model.js";
import { history as historyModel } from "../models/user.history.model.js"
import { tweet as tweetsModel } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js"
import { uploadONCloudinary } from "../utils/cloudinary.utils.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";
import { json } from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';

import express from "express"
import session from 'express-session';
const app = express()

app.use(session({

  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
  
}));



// app.set("view engine", "ejs");

// app.use(express.static("rough"));

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});




const generateaccessandrefreshtoken = async(userid) => {
  try {
     
     const user = await userModel.findById(userid)
   const accesstoken = user.generateaccesstoken()
   const refreshtoken = user.generaterefrershtoken()

   user.refreshtoken = refreshtoken

  await user.save({validateBeforeSave: false})

  return { accesstoken, refreshtoken }

  } catch (error) {

     throw new ApiError(500, "something went wrong while generating refresh and access token")
  }



}

const registeruser = asyncHandler(async (req,res) => {
   // get user details from frontend
  //  validation - not empty
   // check if user alreay exists : email , username
   // check for images, check for avatar
   // upload them to cloudinary, avatar
   // create user object in mongoDB { database } 
   // remove password and refresh token field from reponse
   // check for user creation
   // return response 
   
   const { username, password, email, fullname } = req.body

   const avatar = req.files?.avatar?.[0] || null;
   const coverimage = req.files?.coverimage?.[0] || null;
console.log( avatar, coverimage)

   if((username  === ""|| password === ""|| email === ""|| fullname === "" || avatar === null) ){
      // throw new ApiError(400,"all fields are required")
   res.json({error:"all fields are required"})

   }else{
  const user = await userModel.findOne({
    $or: [{username}, {email}]
  })

  if(user){
    // throw new ApiError(409,"username or email already exists")
   res.json({error:"username or email already exists"})

    
  }else{


    const avatarlocalpath = req.files?.avatar?.[0]?.path;
    // const coverlocalpath = req.files?.coverimage[0]?.path;
    console.log("avatarlocalpath", avatarlocalpath)
    if(!avatarlocalpath){

      // throw new ApiError(400,"avatar field is required");
   res.json({error:"avatar field is required"})


    }

                      
   let coverlocalpath;
   if(req.files && Array.isArray(req.files.coverimage) && req.files.coverimage.length > 0){
      coverlocalpath = req.files?.coverimage?.[0].path;
   } 



    const avatar =  await uploadONCloudinary(avatarlocalpath)
    const coverimage =  await uploadONCloudinary(coverlocalpath)

    

console.log("user to be created", username, password, email, fullname, avatar, coverimage)
  const createduser =  await userModel.create({
    username,
     password,
      email,
       fullname, 
       avatar:avatar?.url || "",
       coverimage:coverimage?.url || "",
   })
console.log(createduser)
const searcheduser  = await userModel.findOne({_id:createduser._id}).select("-password -refreshtoken")
if(!searcheduser){
  //  throw new ApiError(500, "something went wrong while registring user")
   res.json({error:"something went wrong while registring user"})
}
res.status(201).json(
  new ApiResponse(200,searcheduser, "user registered successfully")

)

  // res.redirect("http://localhost:4000/api/v1/users/my-channel")
  }
   }

})

const loginuser = asyncHandler(async (req,res) => {
    // req.body -> data 
    // username or email 
    // find user 
    // password check 
    // access and refresh token
    // send cookies
    // response -> user created successfully 


  const {email, username, password } = req.body;
   
   console.log(email, username, password)

  if(username ==="" || email ===""){
    //  throw new ApiError(400,"username or email is required ")
    res.json({error:"username or email is required"})
  }

  const user = await  userModel.findOne({
    $or: [{ username }, { email }]
   })

  //  const allUsers = await userModel.find()

  //  console.log("user from login ", user);
  //  console.log("all users ", allUsers);
  if(!user){
    // throw new ApiError(404, "user doesnot exists")
   return res.json({error:"user doesnot exists"})

  }

 const ispasswordvalid =  await user.ispasswordcorreect(password)

 if(!ispasswordvalid) {
    // throw new ApiError(401,"invalid credentials") 
   return res.json({error:"invalid credentials"})
 }
 
 const { accesstoken, refreshtoken } = await generateaccessandrefreshtoken(user._id)

    const loggedinuser = await userModel.findById(user._id).select("-password -refreshtoken")

    const options = {
      httpOnly: true,
      sameSite: "none",
      secure: true, 
    }

    return res
    .status(200)
    .cookie("accessToken", accesstoken, options)
    .cookie("refreshToken", refreshtoken, options) 
    // .redirect("/api/v1/users/home")
    .json(
      new ApiResponse(
        200,
        {
          user:loggedinuser, accesstoken, refreshtoken
        },
        " user loggedin successfully"
      )
    )

})

const homepage = asyncHandler(async (req, res) => {
    const user = req.user
    const video = await videoModel.find({})
    .populate("owner")
     
    const filteredvideo = video.filter(vid => {
      // console.log(vid.owner.toString())
        return  vid.owner._id.toString() !== user._id.toString()
    })

    // res.json(filteredvideo)
    // res.render("home",{user,filteredvideo})
    res.json({user,filteredvideo})
})

const renderregisterpage = asyncHandler(async(req,res) => {
     res.render("register")
})

const logoutuser = asyncHandler(async(req,res) => {
  //  await userModel.findByIdAndUpdate(
  //    req.user._id,
  //    {
  //     $set: {
  //       refreshtoken: undefined
  //     }
  //    },
  //    {
  //     new: true
  //    }
      
  //    )

  await userModel.findByIdAndUpdate(req.user._id, { $unset: { refreshtoken: "" } }, { new: true });

     const options = {
      httpOnly: true,
      sameSite: "none",
      secure: true, 
   }

   return res.status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(new ApiResponse(200, {}, "user logged-out successfully"))

})

const refreshaccesstoken = asyncHandler(async(req,res) => {
      const incomingrefreshtoken = req.cookies.refreshToken || req.body.refreshtoken
      
      if(!incomingrefreshtoken) {
          throw new ApiError(401, "unauthorized request")
      }
       
    try {
      const decodedtoken = jwt.verify(
          incomingrefreshtoken,
          process.env.REFRESH_TOKEN_SECRET
        ) 
  
      const user  = await userModel.findById(
        decodedtoken?._id
      )  
  
      if(!user) {
        throw new ApiError(401, "invalid refresh token")
    }
  
  
     if( incomingrefreshtoken !== user?.refreshtoken ){
        throw new ApiError(401, "refresh token is expired or used")
    
     }
  
      const options = {
        httpOnly: true,
        sameSite: "none",
        secure: true, 
      }  
  
     const {accesstoken, newrefreshtoken} = await generateaccessandrefreshtoken(user._id)
  
      return res
      .status(200)
      .cookie("accessToken", accesstoken,options)
      .cookie("refreshToken", newrefreshtoken,options)
       .json(
        new ApiResponse(
          200,
          { accesstoken, refreshToken:newrefreshtoken },
          "access token refreshed"
        )
       )
    } catch (error) {
       throw new ApiError(401, "invalid refresh token")
    }


})

const changecurrentpassword = asyncHandler(async (req,res) => {
    const {oldpassword, newpassword} = req.body

   const user = await userModel.findById(req.user?._id)

  const ispasswordcorreect = await user.ispasswordcorreect(oldpassword)

  if(!ispasswordcorreect){
    //  throw new ApiError(400, "invalid password ")
    res.json({error: "Invalid password"})
  }

  user.password = newpassword
 await user.save({validateBeforeSave : false});

// res.redirect("back");

res.json({success:"Password changed successfully"})

//  return res 
//  .status(201)
//  .json(
//   new ApiResponse(201, {}, "password changed successfully" )
//  )




})

const getcurrentuser = asyncHandler(async(req,res) => {

   return res
   .status(200)
   .json(
    new  ApiResponse(
     200,
    req.user, 
    "here is the current user who is logged in "
    )
   )   
})
 

const updateaccountdetails = asyncHandler(async (req,res) => {
   const {fullname, email, username } = req.body

   if(!fullname || !email ||!username) {
       throw new ApiError(400, "all fields are required")
   }
    
   const user = await userModel.findByIdAndUpdate(
    req.user?._id,
    
    {
      $set:{
        fullname,
        email,
        username
      }
    },
    {new: true}
  
  
  ).select("-password")

  //  return res.status(200)
  //  .json(
  //   new ApiResponse(200, user,"account details updated successfully" )
  //  )
  
  res.json(user)
})


const updateuseravatar = asyncHandler (async (req, res) => {
  const avatarpath = req.file?.path

  if(!avatarpath) {
     throw new ApiError(400, "avatar file is requied")
  }

  const avatar = await uploadONCloudinary(avatarpath)

   if(!avatar.url) {
     throw new ApiError (400, "error while uploading avatar")
   }

   const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar:avatar?.url
      },
      
    },
    {
      new:true
    }
   ).select("-password")


  //  res.redirect("back");
  res.json(user)
  //  return res
  //  .status(200)
  //  .json(
  //   new ApiResponse(200, user,"avatar updated successfully" )
  //  )



})


const updateusercoverimage = asyncHandler (async (req, res) => {

  const coverpath = req.file?.path

  if(!coverpath) {
     throw new ApiError(400, "cover image file is requied")
  }

  const cover = await uploadONCloudinary(coverpath)

   if(!cover.url) {
     throw new ApiError (400, "error while uploading cover-image")
   }

   const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverimage:cover?.url
      },
      
    },
    {
      new:true
    }
   ).select("-password")


  //  res.redirect("back")
  res.json(user)
  //  return res
  //  .status(200)
  //  .json(
  //   new ApiResponse(200, user,"cover image updated successfully" )
  //  )



})


const getuserchannelprofile = asyncHandler( async (req,res) => {
    
   const { username } = req.params
   
   if(!username?.trim()) {
     throw new ApiError(400, "username is missing ")
   }

  //  const user = await userModel.find({username})

  const channel = await userModel.aggregate([ 
    
    {
       $match: {

         username: username?.toLowerCase() 
       }
    },
    {

      $lookup: {

         from: "subscriptions",
         localField: "_id",
         foreignField: "channel",
         as:"subscribers"

      }

    },
    {
       $lookup: {

        from: "subscriptions",
         localField: "_id",
         foreignField: "subscriber",
         as:"subscribedto"

       }
    },
     
    {
      $addFields: {
         subscribercount: {
            $size : "$subscribers"
         },
         numberofchannelsubscribed : {
            $size: "$subscribedto"
         },
          issubscribed : {
             $cond : {
               if: {$in: [req.user?._id, "$subscribers.subscriber"]},
               then:true,
               else:false
             }
          }
      }
    },

    {
      $project: {
          fullname: 1,
          username: 1,
          avatar: 1,
          coverimage: 1,
          email: 1,
          subscribercount: 1,
          numberofchannelsubscribed: 1,
          issubscribed: 1

        }
    }

  ])


   if(!channel?.length) {
      throw new ApiError(404, "channel does not exists")
   }


  return res
  .status(200)
  .json(
    new ApiResponse(200, channel[0], "userchannel profile is here")
  )

})


const mychannelpage = asyncHandler (async (req,res) => {

      const user = await userModel.aggregate([ 
    
        {
           $match: {
    
             username: req.user.username
           }
        },
        {
    
          $lookup: {
    
             from: "subscriptions",
             localField: "_id",
             foreignField: "channel",
             as:"subscribers"
    
          }
    
        },
        {
           $lookup: {
    
            from: "subscriptions",
             localField: "_id",
             foreignField: "subscriber",
             as:"subscribedto"
    
           }
        },
         
        {
          $addFields: {
             subscribercount: {
                $size : "$subscribers"
             },
             numberofchannelsubscribed : {
                $size: "$subscribedto"
             },
              issubscribed : {
                 $cond : {
                   if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                   then:true,
                   else:false
                 }
              }
          }
        },
    
        {
          $project: {
              fullname: 1,
              username: 1,
              avatar: 1,
              coverimage: 1,
              email: 1,
              subscribercount: 1,
              numberofchannelsubscribed: 1,
              issubscribed: 1
    
            }
        }
    
      ])



      const videouploadedbyuser = await videoModel.find({owner:req.user._id})
      console.log(videouploadedbyuser)
   const user1 = user[0]

        // res.render("mychannelpage", {user1,videouploadedbyuser})
        res.json({user1,videouploadedbyuser})

        
      
      
})


const uploadvideo = asyncHandler(async(req,res) => {
  const user = await userModel.aggregate([ 
    
    {
       $match: {

         username: req.user.username
       }
    },
    {

      $lookup: {

         from: "subscriptions",
         localField: "_id",
         foreignField: "channel",
         as:"subscribers"

      }

    },
    {
       $lookup: {

        from: "subscriptions",
         localField: "_id",
         foreignField: "subscriber",
         as:"subscribedto"

       }
    },
     
    {
      $addFields: {
         subscribercount: {
            $size : "$subscribers"
         },
         numberofchannelsubscribed : {
            $size: "$subscribedto"
         },
          issubscribed : {
             $cond : {
               if: {$in: [req.user?._id, "$subscribers.subscriber"]},
               then:true,
               else:false
             }
          }
      }
    },

    {
      $project: {
          fullname: 1,
          username: 1,
          avatar: 1,
          coverimage: 1,
          email: 1,
          subscribercount: 1,
          numberofchannelsubscribed: 1,
          issubscribed: 1

        }
    }

  ])
    const user1 = user[0]
   res.render("uploadvideo",{ user1 })
} )


const uploadvideopost = asyncHandler(async(req, res) => {
        const { title,description, } = req.body;

        const videolocalpath = req.files?.video[0]?.path;

        const thumbnaillocalpath = req.files?.thumbnail[0]?.path;

        const video =  await uploadONCloudinary(videolocalpath)
    const thumbnail =  await uploadONCloudinary(thumbnaillocalpath)

    const videoid = video.public_id;


      // Fetch video information from Cloudinary
      const result = await cloudinary.api.resource(videoid, { resource_type: 'video', media_metadata: true, });
    
      // Check if the result contains duration
      if (result && result.duration) {
        // Extract duration from the result
        const duration = result.duration;
        const finalduration =  Math.round(duration)  
        console.log('Video Duration:', finalduration);
        

      const newvideo =   await videoModel.create({
          owner:req.user._id,
          title,
          description,
          videofile:video?.url,
          thumbnail:thumbnail?.url,
          duration:finalduration,
  
        })
  
        // res.redirect("http://localhost:4000/api/v1/users/my-channel")
        res.json(newvideo)
        
        
      } else {
        console.error('Video duration not found in result:', result);
        res.status(500).json({ error: 'Video duration not found' });
      }
    
})


const getwatchhistory = asyncHandler( async (req, res) => {
     const user = await userModel.aggregate([

     {
      $match: {
         _id: new  mongoose.Types.ObjectId(req.user._id)
      }
     },
     {
      $lookup: {
         from: "videos",
         localField: "watchhistory",
         foreignField:"_id",
         as: "watchhistory",
         pipeline: [
            {
              $lookup: {
                  from: "users",
                  localField: "owner",
                  foreignField: "_id",
                  as: "owner",
                  pipeline: [
                    {
                      $project: {
                         fullname: 1,
                         username:1,
                         avatar:1
                      }
                    }
                  ] 
              }
            },
            {
              $addFields: {
                owner : {
                  $first: "$owner"
                }
              }
            }
         ]
      }
     }



     ])
      
      return res
      .status(200)
      .json(
        new ApiResponse(200,user[0].watchhistory,"here is the watch history of the user")
      )
})


const test = asyncHandler(async (req,res) => {
    res.render("index")
})

const videodetailpage = asyncHandler(async (req,res)  => {
        
       const videoid = req.params.video_id
       const video = await videoModel.find({_id:videoid}).populate("owner")
       const video1= video[0]
          

       async function  myTask() {
        
        if (! (video1.views?.includes(req.user._id)) || video1.owner._id.toString() === req.user._id.toString() ){
            
          video1.views.push(req.user._id)

          await video1.save();

       }

    }
    
    
    setTimeout(myTask, 5000); 

       

       const videoowner = await userModel.findOne({_id:video1.owner._id})

       const videostobesuggested = await videoModel.find({owner:videoowner._id}).populate("owner")
       


       const isvideoalreadywatched = await historyModel.findOne({
        $and:[
          {video:videoid},
          {user:req.user._id},
        ]
       }) 

       if(isvideoalreadywatched){

            await historyModel.findOneAndDelete(
              {  
                $and:[
                  {video:videoid},
                  {user:req.user._id},
                ]
                   
            })
          await  historyModel.create(
            {
              video: videoid,
              user:req.user._id,
              owner:videoowner._id,
            })
            

          //  res.json({message:"video already exists"})
       }else{
            await historyModel.create({

                video: videoid,
                user:req.user._id,
                owner:videoowner._id,
                   
            })
        
       }
    

      // const currentuser = await subscriptionModel.findOne({subscriber:req.user._id})
      // const channeltobesubscribed = await subscriptionModel.findOne({channel:video1.owner._id})

      const issub = await subscriptionModel.findOne({
        $and:[
         { subscriber:req.user._id},
         {channel:video1.owner._id},
        ]
      })
       
       const totalsubscribers = await subscriptionModel.find({channel:video1.owner._id})

       const numberoflikes = await likesModel.find({video: videoid})

       const numberofdislikes = await dislikeModel.find({video:videoid}) 

       const comments = await commentsModel.find({video:videoid}).populate("owner")

          //  res.json({isvideoalreadywatched})
     if (issub) {
            
      // res.render( "videodetailpage", {video1 , videostobesuggested, message:" Subscribe", totalsubscribers, numberoflikes, numberofdislikes,comments } )
      res.json(  {video1 , videostobesuggested, message:" Subscribed", totalsubscribers, numberoflikes, numberofdislikes,comments } )
         
     }else {
      // res.render( "videodetailpage", { video1 , videostobesuggested, message:" Subscribed", totalsubscribers, numberoflikes, numberofdislikes,comments } )
      res.json( { video1 , videostobesuggested, message:" Subscribe", totalsubscribers, numberoflikes, numberofdislikes,comments } )

     }

})


const subscribechannel = asyncHandler(async(req, res) =>{
      const channelid = req.params.channelid
      // const channel = await userModel.findOne({_id:channelid})
      // const subscriber = await userModel.findOne({_id:req.user._id})
         
      // const currentuser = await subscriptionModel.findOne({subscriber:req.user._id})
      // const channeltobesubscribed = await subscriptionModel.findOne({channel:channelid})

      const issubed = await subscriptionModel.findOne({
        $and:[
          {subscriber:req.user._id},
          {channel:channelid}
        ]
      })

     if (!issubed) {
          
         await  subscriptionModel.create({
          subscriber:req.user._id,
              channel:channelid
           })    

          const totalsubscribers = await subscriptionModel.find({channel:channelid})
          res.json({totalsubscribers, message:"Subscribed!!!"})


          //  res.redirect("back")

            //  res.redirect(`http://localhost:4000/api/v1/users/video/${videoid}`)
          //  res.json ({message:"channel subscribed"})
     } else {
           
         await subscriptionModel.findOneAndDelete({
              
          $and: [
            {subscriber:req.user._id},
            {channel:channelid},
           
          ]
         })
         const totalsubscribers = await subscriptionModel.find({channel:channelid})
          res.json({totalsubscribers, message:"Subscribe"})
        //  res.redirect("back")
        //  res.redirect(`http://localhost:4000/api/v1/users/video/${videoid}`)
        //  res.json ({message:"channel unsubscribed"})
         
     }


      
      // res.json({currentuser, channeltobesubscribed})
     
})


const showotherpersonchannel = asyncHandler(async (req, res) => {
          const channelname = req.params.channelname;
          const channel = await userModel.findOne({username:channelname})
          const videos = await videoModel.find({owner:channel._id})
          const subscribers = await subscriptionModel.find({channel:channel._id})
          const subscribedto = await subscriptionModel.find({subscriber:channel._id})

          // const currentuser = await subscriptionModel.findOne({subscriber:req.user._id})

          // const channeltobesubscribed = await subscriptionModel.findOne({channel:channel._id})

          const issubed = await subscriptionModel.findOne({
            $and:[
              {subscriber:req.user._id},
              {channel:channel._id},
            ]
          })
    
         if ((!issubed)) {
           res.json({channel,videos,subscribers,subscribedto, message: "Subscribe"})
                
          
             
         }else {
          res.json( {channel,videos,subscribers,subscribedto, message: "Subscribed!!!"})
          
         }





          

})


const likevideo = asyncHandler(async (req, res) => {

      const videoid = req.params.videoid;
        const video = await videoModel.findOne({_id:videoid})
      // const isvideoliked = await likesModel.findOne({video:videoid})
      // const islikedbyuser = await likesModel.findOne({likedby: req.user._id})

      const isliked = await likesModel.findOne({
        $and:[
          {video:videoid},
          {likedby: req.user._id}
        ]
      })

      if( !isliked ) {
          // res.json(video)
        await dislikeModel.findOneAndDelete({

          $and: [

            {video:videoid},
            {dislikedby: req.user._id},
           
          ]    

        }) 


            await likesModel.create({
              video:videoid,
              likedby:req.user._id,
              owner:video.owner,
            })

            // res.redirect("back");
            const totallikes = await likesModel.find({video:videoid})
            const totaldislikes = await dislikeModel.find({video:videoid})
            res.json({totallikes,totaldislikes})
      }else {
                
              await likesModel.findOneAndDelete({

                $and: [

                  {video:videoid},
                  {likedby: req.user._id},
                  {owner:video.owner},
                 
                ]    

              }) 
              // res.redirect("back");
              const totallikes = await likesModel.find({video:videoid})
            const totaldislikes = await dislikeModel.find({video:videoid})
            res.json({totallikes,totaldislikes})

                 
              
      }

      // res.json(videoid)

})


const dislikevideo = asyncHandler(async (req, res) => {

  const videoid = req.params.videoid;
  
  // const isvideoliked = await dislikeModel.findOne({video:videoid})
  // const islikedbyuser = await dislikeModel.findOne({dislikedby: req.user._id})
  const isdisliked = await dislikeModel.findOne({
    $and:[
      {video:videoid},
      {dislikedby: req.user._id},
    ]
  })
  if( !isdisliked ) {

        
    await likesModel.findOneAndDelete({

      $and: [

        {video:videoid},
        {likedby: req.user._id},
       
      ]    

    }) 

        await dislikeModel.create({
          video:videoid,
          dislikedby:req.user._id
        })

        // res.redirect("back");
        const totallikes = await likesModel.find({video:videoid})
            const totaldislikes = await dislikeModel.find({video:videoid})
            res.json({totallikes,totaldislikes})
  }else {
            
          await dislikeModel.findOneAndDelete({

            $and: [

              {video:videoid},
              {dislikedby: req.user._id},
             
            ]    

          }) 
          // res.redirect("back");
          const totallikes = await likesModel.find({video:videoid})
            const totaldislikes = await dislikeModel.find({video:videoid})
            res.json({totallikes,totaldislikes})

             
          
  }

  // res.json(videoid)

})

const postcomment = asyncHandler(async (req,res) => {
  const {videoid, comment} = req.body;
  // console.log(videoid,comment)
  const video = await videoModel.findOne({_id:videoid})
  console.log({videoid, comment,message:"from server",video})    
    const commentbyuser = await commentsModel.create({
      content:comment,
      video:videoid,
      owner:req.user._id,
    })
    //  res.redirect("back");
    const newcomments = await commentsModel.find({video:videoid}).populate("owner")
    res.json(newcomments)
      
})


const userhistory = asyncHandler(async (req, res) => {
      
     let recentlywatchedvideos = await historyModel.find({user:req.user._id}).populate("video").populate("owner")
     recentlywatchedvideos = recentlywatchedvideos.reverse()
    //  res.render("watchhistory",{ recentlywatchedvideos })
    res.json({ recentlywatchedvideos })

  
    
})


const likedvideospage = asyncHandler(async (req, res) => {

      const likedvideos = await likesModel.find({
        $and:[
          {likedby:req.user._id},
          { video: { $ne: null } }
        ]
        
      }).populate("video").populate("owner")
        // likedvideos.populate("owner")
       console.log(likedvideos)
      //  res.render("likedvideopage", { likedvideos })
         
      res.json( likedvideos )   

})






const  jk = (async (req,res) =>{
      res.render("qwe")
})










const search = asyncHandler(async (req, res) => {
  const search = req.body;
       
  const videos = await videoModel.find({})

  const searchedvideos = videos.filter(video => {
      return video.title.toLowerCase().includes(search.search.toLowerCase())
  })
 // console.log(searchedvideos)
 



 if (!req.session) {
   req.session = {};
 }
     // Store JSON data in session
     req.session.jsonData = {
         key1: 'value1',
         key2: 'value2'
       };




 // const redirectUrl = `http://localhost:4000/search?key1=
 // ${encodeURIComponent(JSON.stringify( searchedvideos))}`;

 const redirectUrl = `http://localhost:4000/api/v1/users/search`
 // res.redirect(302, redirectUrl);
 res.set('Location', redirectUrl);
 res.send(searchedvideos);
})



const searchpage = asyncHandler( async (req, res) => {
 
  // const key1 = req.query.key1;
  //  console.log(key1)
 const sdf =  req.session.jsonData
 console.log(sdf)
        res.render("searchpage")

})


const postweet = asyncHandler( async (req, res) => {
      const tweetcontent = req.body.tweet
  const tweet =   await tweetsModel.create({
        content:tweetcontent,
        owner: req.user._id,
      })
      // res.json(tweet)
      const alltweets = await tweetsModel.find({owner:req.user}).populate("owner")
      res.json(alltweets.reverse())
})


const tweet = asyncHandler(async(req, res) => {
       const user = req.user
      //  console.log(user);
      let tweets = await tweetsModel.find({ owner: user._id}).populate("owner") 
      const subscribers = await subscriptionModel.find({ channel:req.user })
      const subscribed = await subscriptionModel.find({ subscriber:req.user })
         tweets = tweets.reverse()
      res.json({ tweets }) 
})


const tweetlike  = asyncHandler ( async (req, res ) => {


          const tweetid = req.params.tweetid;
           const tweet = await tweetsModel.findOne({_id:tweetid})


           if(tweet.likedby.includes(req.user._id)){
                  
                console.log("alredy liked tweet")
                const indexofuserid = tweet.likedby.indexOf(req.user._id)
                console.log(indexofuserid,"here is the index")
                tweet.likedby.splice(indexofuserid,1)
                await tweet.save()
           }else {

            const isdisliked = tweet.dislikedby.includes(req.user._id)
            if( isdisliked ){
              const indexofuserid = tweet.dislikedby.indexOf(req.user._id)
              console.log(indexofuserid,"here is the index")
              tweet.dislikedby.splice(indexofuserid,1)
              await tweet.save()
            }
            tweet.likedby.push(req.user._id)
            await tweet.save()
           
           }         
      // res.redirect("back")
      const alltweets = await tweetsModel.find({owner:tweet.owner}).populate("owner")

      res.json(alltweets.reverse())
}) 





const tweetdislike = asyncHandler (async (req,res) => {

      const tweetid = req.params.tweetid;
      const tweet = await tweetsModel.findOne({_id:tweetid});
      const isdisliked = tweet.dislikedby.includes(req.user._id);
      if( isdisliked ){
        const indexofuserid = tweet.dislikedby.indexOf(req.user._id)
        console.log(indexofuserid,"here is the index")
        tweet.dislikedby.splice(indexofuserid,1)
        await tweet.save()
      }else{
         

        const isliked = tweet.likedby.includes(req.user._id);
        if(isliked) {
          const indexofuserid = tweet.likedby.indexOf(req.user._id)
          console.log(indexofuserid,"here is the index")
          tweet.likedby.splice(indexofuserid,1)
          await tweet.save()
        }
      
        tweet.dislikedby.push(req.user._id)
        await tweet.save();


      }
      // res.redirect("back")
      const alltweets = await tweetsModel.find({owner:tweet.owner}).populate("owner")

      res.json(alltweets.reverse())
      
})


const counttweetlikes = asyncHandler ( async (req,res) => {
         const tweetid = req.body.tweetId;
         console.log("console from server",tweetid)
         const tweets = await likesModel.find({tweet:tweetid})
         console.log(tweets);
          // res.json({ message:"hello response from server" }) 
          res.json({tweetlikes:tweets})
   
})


const otherpersontweetpage = asyncHandler ( async (req, res) => {
      const otheruserid = req.params.otheruserid
      const user = await userModel.findOne({username:otheruserid})
      const tweets = await tweetsModel.find({owner:user._id}).populate("owner")
      // const subscribers = await subscriptionModel.find({channel:otheruserid})
      // const subscribed = await subscriptionModel.find({subscriber:otheruserid})
      // const issubscribed = await subscriptionModel.findOne({
      //   $and : [
      //     {channel:otheruserid},
      //     {subscriber:req.user._id},
      //   ]
      // })


      res.json(tweets)
      // res.json(issubscribed)
      // if(issubscribed){
      //   // res.json("subscribed")
      // res.render("otherpersontweetpage",{user,tweets,subscribers,subscribed,message:"Subscribed!!!"})
           
      // }else{
      //   // res.json("not subscribed")
      //   res.render("otherpersontweetpage",{user,tweets,subscribers,subscribed,message:"Subscribe"})

      // }
      
})


const showeditpersonalpage = asyncHandler (async (req, res) => {
       const user = req.user;
      res.render("editpersonalinfo", { user })
})


const editpersonalinfo = asyncHandler (async (req,res) => {
  const {fullname, email, username } = req.body
  if(!fullname || !email || !username) {
      throw new ApiError(400, "all fields are required")
  }
   
  const user = await userModel.findByIdAndUpdate(
   req.user?._id,
   
   {
     $set:{
      username,
       fullname,
       email,
     }
   },
   {new: true}
 
 
 ).select("-password")

 res.redirect("back")

  // return res.status(200)
  // .json(
  //  new ApiResponse(200, user,"account details updated successfully" )
  // )

})


const showpasswordchange = asyncHandler ( async (req,res) => {
       const user = req.user
      res.render("passwordchangepage",{ user })
} )


const mycontent = asyncHandler( async (req, res) => {
     const myvids = await videoModel.find({owner:req.user._id}).populate("owner")
     res.json(myvids.reverse())
})

const getuser = asyncHandler( async (req,res)=> {
    res.json(req.user)
})

export { 
  mycontent,
  getuser,
  registeruser,
  loginuser,
  logoutuser, 
  refreshaccesstoken, 
  changecurrentpassword, 
  getcurrentuser, 
  updateaccountdetails,
  updateuseravatar,
  updateusercoverimage,
  getuserchannelprofile,
  getwatchhistory,
    test,
    homepage,
    mychannelpage,
    uploadvideo,
    uploadvideopost,
    renderregisterpage,
    videodetailpage,
    subscribechannel,
    showotherpersonchannel,
    likevideo,
    dislikevideo,
    postcomment,
    userhistory,
    likedvideospage,
    jk,
    search,
    searchpage,
    tweet,
    postweet,
    tweetlike,
    counttweetlikes,
    otherpersontweetpage,
    tweetdislike,
    editpersonalinfo,
    showeditpersonalpage,
    showpasswordchange,


}

