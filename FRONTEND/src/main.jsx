import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homevideos from './components/Home_video_section.jsx'
import LoginPage, { handlelogin } from './components/LoginPage.jsx'
import SignupPage, { handleregister } from './components/SignupPage.jsx'
import LikedvideoPage from './components/LikedvideoPage.jsx'
import Videodetailpage from './components/Videodetailpage.jsx'
import Another from './components/Another.jsx'
import Rough from './components/Rough.jsx'
import MychannelPage from './components/MychannelPage.jsx'
import Mychanneltweets from './components/Mychanneltweets.jsx'
import Editpersonalinfo, { handlepersonalinfo } from './components/Editpersonalinfo.jsx'
import OtherPersonChannel from './components/OtherPersonChannel.jsx'
import OtherpersonTweets from './components/OtherpersonTweets.jsx'
import UploadVideo, { handlevideoupload } from './components/UploadVideo.jsx'
import WatchHistoryPage from './components/WatchHistoryPage.jsx'
import MyContentPage from './components/MyContentPage.jsx'
import ChangePasswordPage from './components/ChangePasswordPage.jsx'

// const router = createBrowserRouter ([
//   {path:"/login", element: <LoginPage />, action:handlelogin},
//   {path:"sign-up", element:<SignupPage />, action:handleregister},
//   {path:"/watch/:videoid", element:<Videodetailpage />},
//   {path:"/rough", element: <Rough /> },
//   {path:"/mychannel/videos", element:<MychannelPage /> },
//   {path:"/mychannel/tweets", element:<Mychanneltweets /> },
//   {path:"/mychannel/upload-video", element:<UploadVideo />, action:handlevideoupload },
//   {path:"/mychannel/edit-personal-info", element:<Editpersonalinfo />, action:handlepersonalinfo},
//   {path:"/channel/:userid", element:<OtherPersonChannel /> },
//   {path:"/channel/change-password", element:<ChangePasswordPage /> },
//   {path:"/channel/:userid/videos", element:<OtherPersonChannel /> },
//   {path:"/channel/:userid/tweets", element:<OtherpersonTweets /> },





//   {path:"/",element:<App />,children:[
//      {path:"/", element:<Homevideos/>},
//      {path:"/home", element:<Homevideos/>},
//      {path:"/liked-videos", element:<LikedvideoPage />},
//      {path:"/watch-history", element:<WatchHistoryPage />},
//      {path:"/my-content", element:<MyContentPage />},
//      {path:"/search/query/:searched", element:<Another />},
     
//   ]}
// ])


import ProtectedRoute from "./ProtectedRoute.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage />, action: handlelogin },
  { path: "/sign-up", element: <SignupPage />, action:handleregister },

  {
    element: <ProtectedRoute />, // All routes below require auth
    children: [
      { path: "/watch/:videoid", element: <Videodetailpage /> },
      { path: "/rough", element: <Rough /> },
      { path: "/mychannel/videos", element: <MychannelPage /> },
      { path: "/mychannel/tweets", element: <Mychanneltweets /> },
      { path: "/mychannel/upload-video", element: <UploadVideo />, action: handlevideoupload },
      { path: "/mychannel/edit-personal-info", element: <Editpersonalinfo />, action: handlepersonalinfo },
      { path: "/channel/change-password", element: <ChangePasswordPage /> },
      { path: "/channel/:userid", element: <OtherPersonChannel /> },
      { path: "/channel/:userid/videos", element: <OtherPersonChannel /> },
      { path: "/channel/:userid/tweets", element: <OtherpersonTweets /> },
      {
        path: "/",
        element: <App />,
        children: [
          { path: "/", element: <Homevideos /> },
          { path: "/home", element: <Homevideos /> },
          { path: "/liked-videos", element: <LikedvideoPage /> },
          { path: "/watch-history", element: <WatchHistoryPage /> },
          { path: "/my-content", element: <MyContentPage /> },
          { path: "/search/query/:searched", element: <Another /> },
        ],
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
   <RouterProvider router = { router } />
  
  </React.StrictMode>,
)
