// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import { video as videoModel } from "../src/models/video.model.js"



// const app = express();




// app.use(session({

//    secret: 'hjkshkjhkjhdskjfhdskjfhkdjshfkjsdhfkjds',
//    resave: false,
//    saveUninitialized: true

//  }));
// app.set("view engine", "ejs");

// app.use(express.static("rough"));

// app.use(cors({
//    origin: process.env.CORS_ORIGIN,
//    credentials: true,
// }))
// app.use(cookieParser())
// app.use(express.json({limit:"16kb"}));
// app.use(express.urlencoded({extended:true, limit:"16kb"}));


// // app.get("/jk", function(req,res){
// //      res.render("qwe")
// // })








// // import routers











// import userrouter from "./routes/user.route.js" 

// // routes decleration
// app.use('/api/v1/users',userrouter)
// // app.use("/video/", )

// // app.get("/testing",function(req,res) {
// //      res.render("index")
// // })


// app.post("/search", async function (req, res) {

      
//    const search = req.body;
       
//    const videos = await videoModel.find({})
 
//    const searchedvideos = videos.filter(video => {
//        return video.title.toLowerCase().includes(search.search.toLowerCase())
//    })
       
//       console.log(req.session)
  
//       // // Store JSON data in session
//       // req.session.jsonData = {
//       //     key1: 'value1',
//       //     key2: 'value2'
//       //   };
 
 
 
 
//   // const redirectUrl = `http://localhost:4000/api/v1/users/search?key1=
//   // ${encodeURIComponent(JSON.stringify( searchedvideos))}`;
 
//   const redirectUrl = `http://localhost:4000/searching`
//   // res.redirect(302, redirectUrl);
//   res.set('Location', redirectUrl);
//   res.send(searchedvideos);
     
      
//  })


//  app.get("/searching", async function(req,res) {
//    res.render("searchpage")
// })



// export { app };

















// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import session from "express-session";
// import { video as videoModel } from "../src/models/video.model.js";

// const app = express();

// // Session middleware setup with secret option
// app.use(
//   session({
//     secret: 'kjjkjhjkhkjhkdchnkjhfbkjgfiuwvbkjwgifuvwbhvvwvhdvslkvkdshvshvhsddjvdsjgvk', // Replace with your actual secret key
//     resave: false,
//     saveUninitialized: true
//   })
// );

// app.set("view engine", "ejs");

// app.use(express.static("rough"));
// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true,
// }));
// app.use(cookieParser());
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// // import routers
// import userrouter from "./routes/user.route.js";
// // routes declaration
// app.use('/api/v1/users', userrouter);

// app.post("/search", async function (req, res) {
//   const search = req.body;
//   const videos = await videoModel.find({});
//   const searchedvideos = videos.filter(video => {
//     return video.title.toLowerCase().includes(search.search.toLowerCase());
//   });

//   // Store JSON data in session
//   req.session.videos = searchedvideos

//   const redirectUrl = `http://localhost:4000/searching`;
//   res.set('Location', redirectUrl);
//   res.send(searchedvideos);
// });

// app.get("/searching", async function (req, res) {
//    console.log(req.session.searchedvideos)
//   res.render("searchpage");
// });

// export { app };









// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { video as videoModel } from "../src/models/video.model.js";

const app = express();

// Session middleware setup
app.use(
  session({
    secret: 'your-secret-key', // Replace with your actual secret key
    resave: false,
    saveUninitialized: true
  })
);

app.set("view engine", "ejs");

app.use(express.static("rough"));
app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// import routers
import userrouter from "./routes/user.route.js";
import { verifyjwt } from "./middlewares/auth.middleware.js";
// routes declaration
app.use('/api/v1/users', userrouter);

app.post("/search", async function (req, res) {
  const search = req.body;
  const videos = await videoModel.find({}).populate("owner");
  const searchedvideos = videos.filter(video => {
    return video.title.toLowerCase().includes(search.search.toLowerCase());
  });

  // Store JSON data in session
  req.session.jsonData = searchedvideos

  res.json({searchedvideos})

  // const redirectUrl = `http://localhost:4000/searching`;
  // res.set('Location', redirectUrl);
  // res.send(searchedvideos);
});

app.get("/getuser", verifyjwt, async function (req,res) {
    res.json(req.user)
})

app.get("/searching", async function (req, res) {
   console.log(req.session.jsonData)
   const searchedvideos = req.session.jsonData

  res.render("searchpage",{searchedvideos});
});

export { app };












