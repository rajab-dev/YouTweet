import React, { useEffect, useState } from 'react'
import Header from './navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import { Form, redirect } from 'react-router-dom'
import Loader from './Loader'

function UploadVideo() {

 const [user, setuser] = useState() 
  const token = localStorage.getItem('token');
const [loader , setloader] = useState(true)


 const getuser = async () => {
try {
  
      const response = await axios.get("http://localhost:4000/api/v1/users/getuser",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // console.log("get user",response)
      setuser(response.data)
} catch (error) {
  console.log(error)
}finally {
  const timer = setTimeout(() => {
    // Task to execute after 3 seconds
    setloader(null)
  }, 1000);

 return ()=> clearTimeout(timer);
}
 }

useEffect(() => {
  getuser()
  
}, []);

  return (
    
<div class="h-screen overflow-y-auto bg-[#121212] text-white">

<Header /> 


<div class="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">

 
<Sidebar />

 {loader ? <Loader /> : (
  <section class="relative w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
    <div class="relative min-h-[150px] w-full pt-[16.28%]">
      <div class="absolute inset-0 overflow-hidden"><img
          src={user?.coverimage} alt="cover-photo" />
      </div>
    </div>
    <div class="px-4 pb-4">
      <div class="flex flex-wrap gap-4 pb-4 pt-6"><span
          class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2"><img
            src={user?.avatar}
            alt="Channel" class="h-full w-full" /></span>
        <div class="mr-auto inline-block">
          <h1 class="font-bolg text-xl">React Patterns</h1>
          <p class="text-sm text-gray-400">@reactpatterns</p>
          <p class="text-sm text-gray-400">600k Subscribers · 220 Subscribed</p>
        </div>
        <div class="inline-block"><button
            class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"><span
              class="inline-block w-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125">
                </path>
              </svg></span>Edit</button></div>
      </div>
      <ul
        class="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
        <li class="w-full"><button
            class="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">Videos</button></li>
        <li class="w-full"><button
            class="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">Playlist</button></li>
        <li class="w-full"><button
            class="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">Tweets</button></li>
        <li class="w-full"><button
            class="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">Subscribed</button></li>
      </ul>
      <div class="flex justify-center p-4">
        <div class="w-full max-w-sm text-center">
          <p class="mb-3 w-full"><span class="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]"><svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" aria-hidden="true" class="w-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z">
                </path>
              </svg></span></p>
          <h5 class="mb-2 font-semibold">No videos uploaded</h5>
          <p>This page has yet to upload a video. Search another page in order to find more videos.</p><button
            class="mt-4 inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black"><svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" aria-hidden="true" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
            </svg> New video</button>
        </div>
      </div>
    </div>


    <div class="absolute inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">



      <Form method='post' encType='multipart/form-data' class="h-full overflow-auto border bg-[#121212]">
        <div class="flex items-center justify-between border-b p-4">
          <h2 class="text-xl font-semibold">Upload Videos</h2><button type='submit'
            class="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]">Save</button>
        </div>
        <div class="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">
          <div class="w-full border-2 border-dashed px-4 py-12 text-center"><span
              class="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]"><svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5">
                </path>
              </svg></span>
            <h6 class="mb-2 font-semibold">Drag and drop video files to upload</h6>
            <p class="text-gray-400">Your videos will be private untill you publish them.</p><label for="upload-video"
              class="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"><input name='video' required
                type="file" id="upload-video" class="sr-only" />Select Files</label>
          </div>
          <div class="w-full"><label for="thumbnail" class="mb-1 inline-block">Thumbnail<sup>*</sup></label><input
              id="thumbnail" type="file" name='thumbnail' required
              class="w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5" /></div>
          <div class="w-full"><label for="title" class="mb-1 inline-block">Title<sup>*</sup></label><input id="title" name='title' required
              type="text" class="w-full border bg-transparent px-2 py-1 outline-none" /></div>
          <div class="w-full"><label for="desc" class="mb-1 inline-block">Description<sup>*</sup></label><textarea
              id="desc" name='description' required class="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"></textarea></div>
        </div>
      </Form>
    </div>
    
  </section>
 )}
</div>
</div>
  )
}



export const handlevideoupload = async (data) => {

  const formdata = await data.request.formData();
  const postdata = Object.fromEntries(formdata)
     
  // const formData = await request.formData();

  // // Create a new FormData object
  // const formPayload = new FormData();
  
  // // Append all the form data (including files) to the FormData object
  // formPayload.append('title', formData.get('title'));
  // formPayload.append('description', formData.get('description'));
  // formPayload.append('thumbnail', formData.get('thumbnail'));
  // formPayload.append('video', formData.get('video'));
  // // formPayload.append('avatar', formData.get('avatar'));
  // // formPayload.append('coverimage', formData.get('coverimage'));

   console.log("form payload ",postdata)
  const token = localStorage.getItem('token');
    //  return redirect("/mychannel/upload-video")
  try {
    const response = await axios.post(
  
     `http://localhost:4000/api/v1/users/upload-video-post`,
     {
        video:postdata.video,
        thumbnail:postdata.thumbnail,
        title:postdata.title,
        description:postdata.description
     },
     {
       headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
       }
     }
   );
     console.log("video response", response)
     return redirect("/mychannel/videos")
  } catch (error) {
      console.log(error)
     return redirect("/mychannel/upload-video")

  } 
}

export default UploadVideo