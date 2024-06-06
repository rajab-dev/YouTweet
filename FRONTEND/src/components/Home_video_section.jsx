import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import Loader from './Loader';

// const videos = [
//   {
//     title: "JavaScript Fundamentals: Variables and Data Types",
//     thumbnail: "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "20:45",
//     profile: "https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "Code Master",
//     views: "10.3k Views",
//     time: "44 minutes ago"
//   },
//   {
//     title: "Getting Started with Express.js",
//     thumbnail: "https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "22:18",
//     profile: "https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "Express Learner",
//     views: "11k Views",
//     time: "5 hours ago"
//   },
//   {
//     title: "Building a RESTful API with Node.js and Express",
//     thumbnail: "https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "24:33",
//     profile: "https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "API Builder",
//     views: "14.5k Views",
//     time: "7 hours ago"
//   },
//   {
//     title: "Introduction to React Native",
//     thumbnail: "https://images.pexels.com/photos/1739854/pexels-photo-1739854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "19:58",
//     profile: "https://images.pexels.com/photos/1739856/pexels-photo-1739856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "React Native Dev",
//     views: "10.9k Views",
//     time: "8 hours ago"
//   },
//   {
//     title: "Creating Custom Hooks in React",
//     thumbnail: "https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "16:37",
//     profile: "https://images.pexels.com/photos/1144257/pexels-photo-1144257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "Hook Master",
//     views: "9.3k Views",
//     time: "9 hours ago"
//   },
//   {
//     title: "Building Scalable Web Applications with Django",
//     thumbnail: "https://images.pexels.com/photos/1144260/pexels-photo-1144260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "32:18",
//     profile: "https://images.pexels.com/photos/1144269/pexels-photo-1144269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "Django Master",
//     views: "18.9M Views",
//     time: "12 hours ago"
//   },
//   {
//     title: "Creating Interactive UIs with React and D3",
//     thumbnail: "https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "29:30",
//     profile: "https://images.pexels.com/photos/1144277/pexels-photo-1144277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "ReactD3",
//     views: "20.1k Views",
//     time: "14 hours ago"
//   },
//   {
//     title: "Node.js Authentication with Passport.js",
//     thumbnail: "https://images.pexels.com/photos/1144274/pexels-photo-1144274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "26:58",
//     profile: "https://images.pexels.com/photos/1144270/pexels-photo-1144270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "Passport Pro",
//     views: "21.2k Views",
//     time: "15 hours ago"
//   },
//   {
//     title: "Data Visualization with Tableau",
//     thumbnail: "https://images.pexels.com/photos/1144231/pexels-photo-1144231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "32:14",
//     profile: "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "Tableau Master",
//     views: "24.5k Views",
//     time: "18 hours ago"
//   },
//   {
//     title: "Building Real-Time Applications with Socket.IO",
//     thumbnail: "https://images.pexels.com/photos/1144250/pexels-photo-1144250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "27:37",
//     profile: "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "Socket.IO Expert",
//     views: "25.6k Views",
//     time: "19 hours ago"
//   },
//   {
//     title: "Advanced CSS: Animations and Transitions",
//     thumbnail: "https://images.pexels.com/photos/1115824/pexels-photo-1115824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "31:55",
//     profile: "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "CSS Animations",
//     views: "28.9k Views",
//     time: "22 hours ago"
//   },
//   {
//     title: "Advanced React Patterns",
//     thumbnail: "https://images.pexels.com/photos/1115808/pexels-photo-1115808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     duration: "30:25",
//     profile: "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     author: "React Patterns",
//     views: "30.1k Views",
//     time: "1 day ago"
//   }
// ];

const VideoCard = ({ video }) => {


 

  const timeAgo = formatDistanceToNow(new Date(video.createdAt), { addSuffix: true });
  return(
  <div className="w-full">
  <Link to={`/watch/${video._id}`}>
    <div className="relative mb-2 w-full pt-[56%]">
      <div className="absolute inset-0">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full"
        />
      </div>
      <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
        {video.duration}
      </span>
    </div>
    </Link>
    <div className="flex gap-x-2">
    <Link to={`/channel/${video?.owner?.username}`}>
      <div className="h-10 w-10 shrink-0">
        <img
          src={video.owner.avatar}
          alt={video.owner.fullname}
          className="h-full w-full rounded-full"
        />
      </div></Link>
      <div className="w-full">
        <h6 className="mb-1 font-semibold">
          {video.title}
        </h6>

        <Link to={`/channel/${video?.owner?.username}`}>
        <p className="text-sm text-zinc-500">
          {video.owner.fullname}
        </p>
         </Link>
         
        <p className="text-sm text-zinc-500">
          {video.views?.length} views • {timeAgo}
        </p>
      </div>
    </div>
  </div>
  )
};



const Homevideos = () => {

const [videos, setvideos] = useState([])
const [loader , setloader] = useState(true)
  const gethomevideos = async () => {

   try {
     const token = localStorage.getItem('token'); 
     const response = await axios.get("http://localhost:4000/api/v1/users/home", {
       headers: {
         Authorization: `Bearer ${token}`
       }
     });
     //  console.log(response.data.filteredvideo)
      setvideos(response.data.filteredvideo)
   } catch (error) {
      console.log(error)
   } finally {
    const timer = setTimeout(() => {
      // Task to execute after 3 seconds
      setloader(null)
    }, 1000);

   return ()=> clearTimeout(timer);
   }

  }

  useEffect(() => {
    gethomevideos()
   
  }, []);

  if(loader){
       return <Loader />
  }
  return (
   
   <section class="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
   <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
    {videos.map((video, index) => (
      <VideoCard key={index} video={video} />
    ))}
  </div>
  </section>
  )
};

export default Homevideos;
