import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import express from "express";

app.set("view engine", "ejs");

app.use(express.static("rough")); 

dotenv.config({
  path: "./env"
})
connectDB()
.then(() =>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log('server listning on port',process.env.PORT )
});
})
.catch((err)=>{
    console.log(`mongoDB connection failed ${err}`)
})




