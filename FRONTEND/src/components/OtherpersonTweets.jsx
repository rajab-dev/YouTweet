import React, { useEffect, useState } from 'react'
import Header from './navbar'
import Sidebar from './Sidebar'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import OtherPersonTweet from './OtherPersonTweet';
import Loader from './Loader';

function OtherpersonTweets() {


  const { userid } = useParams();
  const [userinfo, setuserinfo] = useState()
  const [submessage, setsubmessage] = useState()
  const [subscribers, setsubscribers] = useState([])
  const [tweets, settweets] = useState([])
  const [loader , setloader] = useState(true)

  
  
   const getotherpersoninfo = async () => {

    try {
      const token = localStorage.getItem('token'); 
    
      const response = await axios.get(`http://localhost:4000/api/v1/users/channel/${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
        
        // console.log("other person response", response)
        setuserinfo(response.data)
        setsubmessage(response.data.message)
        setsubscribers(response.data.subscribers)
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
    
  
   const handlesubbtn = async (channelid) => {
  
    const token = localStorage.getItem('token'); 
  
    const response = await axios.get(`http://localhost:4000/api/v1/users/subscribe/${channelid}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      
      // console.log(response)
      setsubscribers(response.data.totalsubscribers)
      setsubmessage(response.data.message)
      // console.log("channel to be subed ",channelid)
  }
  
   const gettweets = async () =>{

    const token = localStorage.getItem('token'); 
  
    const response = await axios.get(`http://localhost:4000/api/v1/users/${userid}/tweets`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(" tweet response ", response.data)
    settweets(response.data.reverse())

   }
    





    useEffect(() => {
      getotherpersoninfo();  
      gettweets();  
    }, []);
  

  return (
    <div class="h-screen overflow-y-auto bg-[#121212] text-white">


    <Header />

    <div class="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">

      <Sidebar />
  {loader ? <Loader /> : (
  <section class="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
    <div class="relative min-h-[150px] w-full pt-[16.28%]">
      <div class="absolute inset-0 overflow-hidden"><img
          src={userinfo?.channel?.coverimage}
          alt="cover-photo" />
      </div>
    </div>
    <div class="px-4 pb-4">
      <div class="flex flex-wrap gap-4 pb-4 pt-6"><span
          class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2"><img
            src={userinfo?.channel?.avatar}
            alt="Channel" class="h-full w-full" /></span>
        <div class="mr-auto inline-block">
          <h1 class="font-bolg text-xl">{userinfo?.channel?.fullname}</h1>
          <p class="text-sm text-gray-400">@{userinfo?.channel?.username}</p>
          <p class="text-sm text-gray-400">{subscribers?.length} Subscribers · {userinfo?.subscribedto?.length} Subscribed</p>
        </div>
        <div class="inline-block">

          <div class="inline-flex min-w-[145px] justify-end" onClick={()=>handlesubbtn(userinfo.channel._id)}><button
              class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"><span
                class="inline-block w-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="2" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z">
                  </path>
                </svg></span><span class="">{submessage}</span>
                </button></div>
        </div>
      </div>
      <ul
        class="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
        <li class="w-full">
        <Link to={`/channel/${userinfo?.channel?.username}`}>

        <button
            class="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400 ">Videos</button></Link></li>
        
        <li class="w-full">
        <Link to={`/channel/${userinfo?.channel?.username}/tweets`}>

        <button
            class="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">Tweets</button></Link></li>
       
      </ul>


      <div class="py-4">



      { tweets.map((tweet) => {

        return(
      <OtherPersonTweet key={tweet._id} tweet={tweet} />
        )
      })
       
      }







          <div class="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
            <div class="h-14 w-14 shrink-0"><img
                src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="React Patterns" class="h-full w-full rounded-full" /></div>
            <div class="w-full">
              <h4 class="mb-1 flex items-center gap-x-2"><span class="font-semibold">React Patterns</span> <span
                  class="inline-block text-sm text-gray-400">6 hours ago</span></h4>
              <p class="mb-2">Embracing the benefits of TypeScript for stronger, more reliable code. 🚀 #TypeScript
                #Programming</p>
              <div class="flex gap-4"><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
                  data-like-count="425" data-like-count-alt="426"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-inherit group-focus:text-[#ae7aff]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z">
                    </path>
                  </svg></button><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
                  data-dislike-count="87" data-dislike-count-alt="88"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-inherit group-focus:text-[#ae7aff]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384">
                    </path>
                  </svg></button></div>
            </div>
          </div>
          <div class="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
            <div class="h-14 w-14 shrink-0"><img
                src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="React Patterns" class="h-full w-full rounded-full" /></div>
            <div class="w-full">
              <h4 class="mb-1 flex items-center gap-x-2"><span class="font-semibold">React Patterns</span> <span
                  class="inline-block text-sm text-gray-400">7 hours ago</span></h4>
              <p class="mb-2">Styling made easy with Tailwind CSS! Rapidly build beautiful, responsive interfaces. 🎨
                #TailwindCSS #WebDev</p>
              <div class="flex gap-4"><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
                  data-like-count="425" data-like-count-alt="426"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-inherit group-focus:text-[#ae7aff]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z">
                    </path>
                  </svg></button><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
                  data-dislike-count="87" data-dislike-count-alt="88"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-inherit group-focus:text-[#ae7aff]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384">
                    </path>
                  </svg></button></div>
            </div>
          </div>
          <div class="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
            <div class="h-14 w-14 shrink-0"><img
                src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="React Patterns" class="h-full w-full rounded-full" /></div>
            <div class="w-full">
              <h4 class="mb-1 flex items-center gap-x-2"><span class="font-semibold">React Patterns</span> <span
                  class="inline-block text-sm text-gray-400">8 hours ago</span></h4>
              <p class="mb-2">Building dynamic user interfaces with React! The go-to library for modern web development.
                🚀 #React #WebDev</p>
              <div class="flex gap-4"><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
                  data-like-count="425" data-like-count-alt="424"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-[#ae7aff] group-focus:text-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z">
                    </path>
                  </svg></button><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
                  data-dislike-count="87" data-dislike-count-alt="88"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-inherit group-focus:text-[#ae7aff]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384">
                    </path>
                  </svg></button></div>
            </div>
          </div>
          <div class="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
            <div class="h-14 w-14 shrink-0"><img
                src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="React Patterns" class="h-full w-full rounded-full" /></div>
            <div class="w-full">
              <h4 class="mb-1 flex items-center gap-x-2"><span class="font-semibold">React Patterns</span> <span
                  class="inline-block text-sm text-gray-400">9 hours ago</span></h4>
              <p class="mb-2">Next.js makes server-side rendering a breeze! Boost your React app&#x27;s performance with
                ease. 🚀 #Nextjs #React</p>
              <div class="flex gap-4"><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
                  data-like-count="425" data-like-count-alt="426"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-inherit group-focus:text-[#ae7aff]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z">
                    </path>
                  </svg></button><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
                  data-dislike-count="87" data-dislike-count-alt="86"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-[#ae7aff] group-focus:text-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384">
                    </path>
                  </svg></button></div>
            </div>
          </div>
          <div class="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
            <div class="h-14 w-14 shrink-0"><img
                src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="React Patterns" class="h-full w-full rounded-full" /></div>
            <div class="w-full">
              <h4 class="mb-1 flex items-center gap-x-2"><span class="font-semibold">React Patterns</span> <span
                  class="inline-block text-sm text-gray-400">10 hours ago</span></h4>
              <p class="mb-2">Dive into advanced JavaScript concepts like closures and prototypes. Level up your coding
                skills! 🔍 #AdvancedJS #CodingTips</p>
              <div class="flex gap-4"><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
                  data-like-count="425" data-like-count-alt="424"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-[#ae7aff] group-focus:text-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z">
                    </path>
                  </svg></button><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
                  data-dislike-count="87" data-dislike-count-alt="88"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-inherit group-focus:text-[#ae7aff]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384">
                    </path>
                  </svg></button></div>
            </div>
          </div>
          <div class="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
            <div class="h-14 w-14 shrink-0"><img
                src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="TS Scripter" class="h-full w-full rounded-full" /></div>
            <div class="w-full">
              <h4 class="mb-1 flex items-center gap-x-2"><span class="font-semibold">TS Scripter</span> <span
                  class="inline-block text-sm text-gray-400">11 hours ago</span></h4>
              <p class="mb-2">Mastering TypeScript: From basics to advanced concepts. Boost your development workflow
                with strong typing! 🚀 #TypeScript #Development</p>
              <div class="flex gap-4"><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
                  data-like-count="425" data-like-count-alt="424"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-[#ae7aff] group-focus:text-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z">
                    </path>
                  </svg></button><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
                  data-dislike-count="87" data-dislike-count-alt="88"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-inherit group-focus:text-[#ae7aff]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384">
                    </path>
                  </svg></button></div>
            </div>
          </div>
          <div class="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
            <div class="h-14 w-14 shrink-0"><img
                src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Tailwind Wizard" class="h-full w-full rounded-full" /></div>
            <div class="w-full">
              <h4 class="mb-1 flex items-center gap-x-2"><span class="font-semibold">Tailwind Wizard</span> <span
                  class="inline-block text-sm text-gray-400">12 hours ago</span></h4>
              <p class="mb-2">Simplify your CSS workflow with Tailwind CSS. Effortless styling for modern web
                development! 🎨 #TailwindCSS #WebDev</p>
              <div class="flex gap-4"><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
                  data-like-count="425" data-like-count-alt="424"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-[#ae7aff] group-focus:text-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z">
                    </path>
                  </svg></button><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
                  data-dislike-count="87" data-dislike-count-alt="88"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-inherit group-focus:text-[#ae7aff]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384">
                    </path>
                  </svg></button></div>
            </div>
          </div>
          <div class="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
            <div class="h-14 w-14 shrink-0"><img
                src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="React Patterns" class="h-full w-full rounded-full" /></div>
            <div class="w-full">
              <h4 class="mb-1 flex items-center gap-x-2"><span class="font-semibold">React Patterns</span> <span
                  class="inline-block text-sm text-gray-400">13 hours ago</span></h4>
              <p class="mb-2">Building dynamic UIs with React - A comprehensive guide for developers. Get started with
                React today! 🚀 #React #WebDevelopment</p>
              <div class="flex gap-4"><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
                  data-like-count="425" data-like-count-alt="424"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-[#ae7aff] group-focus:text-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z">
                    </path>
                  </svg></button><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
                  data-dislike-count="87" data-dislike-count-alt="88"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-inherit group-focus:text-[#ae7aff]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384">
                    </path>
                  </svg></button></div>
            </div>
          </div>
          <div class="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
            <div class="h-14 w-14 shrink-0"><img
                src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="React Patterns" class="h-full w-full rounded-full" /></div>
            <div class="w-full">
              <h4 class="mb-1 flex items-center gap-x-2"><span class="font-semibold">React Patterns</span> <span
                  class="inline-block text-sm text-gray-400">14 hours ago</span></h4>
              <p class="mb-2">Optimize server-side rendering with Next.js. Improve performance and SEO for your React
                applications! 🚀 #Nextjs #React</p>
              <div class="flex gap-4"><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-like-count)] focus:after:content-[attr(data-like-count-alt)]"
                  data-like-count="425" data-like-count-alt="424"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-[#ae7aff] group-focus:text-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z">
                    </path>
                  </svg></button><button
                  class="group inline-flex items-center gap-x-1 outline-none after:content-[attr(data-dislike-count)] focus:after:content-[attr(data-dislike-count-alt)]"
                  data-dislike-count="87" data-dislike-count-alt="88"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-5 w-5 text-inherit group-focus:text-[#ae7aff]">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384">
                    </path>
                  </svg></button></div>
            </div>
          </div>
        </div>

         
          
    </div>
  </section>
  )}
</div>
</div>
  )
}

export default OtherpersonTweets