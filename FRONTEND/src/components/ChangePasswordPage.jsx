import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,Form, redirect, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './navbar';
import Loader from './Loader';

function ChangePasswordPage() {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
 const [user, setuser] = useState({})
 const [oldpassword, setoldpass] = useState()
 const [newpassword, setnewpass] = useState()
 const [ error, seterror ] = useState(null)
 const [ success, setsuccess ] = useState(null)
const [loader , setloader] = useState(true)






 const getuserprofile = async () => {
    
  try {
    const response = await axios.get("http://localhost:4000/getuser",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    //  console.log("get user from change password", response)
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

  getuserprofile()
  

}, []);


const handleold = (event) => {
  //  console.log("old pass",event.target.value)
   setoldpass(event.target.value)

}

const handlenew = (event) => {
  // console.log("old pass",event.target.value)
  setnewpass(event.target.value)
}

const handleformsubmit = async (event) => {
     event.preventDefault();
     const formData = new FormData();
    //  console.log("pass",oldpassword,newpassword)
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `http://localhost:4000/api/v1/users/change-password`,
     {
       oldpassword,
      newpassword,
     },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
  console.log("change pass res", response)
  if(response.data.error){
     
      seterror(response.data.error)
        setsuccess(null)
      
  }else if(response.data.success){
    setsuccess(response.data.success)
    seterror(null)

  }
    
}


  return (
   


<div class="h-screen overflow-y-auto bg-[#121212] text-white">


<Header / >
 


<div class="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">


<Sidebar />
 


{loader ? <Loader /> : (
  <section class="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
    <div class="relative min-h-[150px] w-full pt-[16.28%]">
      <div class="absolute inset-0 overflow-hidden"><img
          src={user?.coverimage}alt="cover-photo" />
      </div>
    </div>
    <div class="px-4 pb-4">
      <div class="flex flex-wrap gap-4 pb-4 pt-6">
        <div class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2"><img
            src={user?.avatar}
            alt="Channel" class="h-full w-full" /></div>
        <div class="mr-auto inline-block">
          <h1 class="font-bolg text-xl">{user?.fullname}</h1>
          <p class="text-sm text-gray-400">@{user?.username}</p>
        </div>
        <Link to="/mychannel/videos">
        <div class="inline-block"><button
            class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">View
            channel</button></div></Link>
      </div>
      <ul
        class="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">

        <Link to="/mychannel/edit-personal-info" className='w-full'>
        <li class="w-full"><button class="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">Personal
            Information</button></li></Link>
       

        <li class="w-full"><button
            class="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">Change Password</button>
        </li>
      </ul>
      <div class="flex flex-wrap justify-center gap-y-4 py-4">
        <div class="w-full sm:w-1/2 lg:w-1/3">
          <h5 class="font-semibold">Password</h5>
          <p class="text-gray-300">Please enter your current password to change your password.</p>
        </div>
        <div class="w-full sm:w-1/2 lg:w-2/3">
          <Form method='post' class="rounded-lg border" onSubmit={handleformsubmit}>
          {error && <h1 className='text-center text-red-700'>{error}</h1> }
          {success && <h1 className='text-center text-green-700'>{success}</h1>}
            <div class="flex flex-wrap gap-y-4 p-4">
              <div class="w-full"><label class="mb-1 inline-block" for="old-pwd">Current password</label><input onChange={handleold}
                  type="password" name='oldpassword' class="w-full rounded-lg border bg-transparent px-2 py-1.5" id="old-pwd"
                  placeholder="Current password" /></div>
              <div class="w-full"><label class="mb-1 inline-block" for="new-pwd">New password</label><input onChange={handlenew}
                  type="password" name='newpassword' class="w-full rounded-lg border bg-transparent px-2 py-1.5" id="new-pwd"
                  placeholder="New password" />
                <p class="mt-0.5 text-sm text-gray-300">Your new password must be more than 8 characters.</p>
              </div>
              {/* <div class="w-full"><label class="mb-1 inline-block" for="cnfrm-pwd">Confirm password</label><input
                  type="password" class="w-full rounded-lg border bg-transparent px-2 py-1.5" id="cnfrm-pwd"
                  placeholder="Confirm password" /></div> */}
            </div>
            <hr class="border border-gray-300" />
            <div class="flex items-center justify-end gap-4 p-4"><button type='reset'
                class="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">Cancel</button><button type='submit'
                class="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">Update Password</button></div>
          </Form>





        </div>
      </div>
    </div>
  </section>
)}
</div>
</div>


  )
}

export default ChangePasswordPage


