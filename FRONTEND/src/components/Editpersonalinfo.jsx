import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,Form, redirect, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import UploadCoverimage from './UploadCoverimage';
import Loader from './Loader';


function Editpersonalinfo() {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
 const [user, setuser] = useState({})
const [loader , setloader] = useState(true)


 const [file, setFile] = useState(null);
 const [avatar, setavatar] = useState()
 const handleFileChange = (event) => {
   setFile(event.target.files[0]);
 };


 const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const token = localStorage.getItem('token');
    const response = await axios.post(
      `http://localhost:4000/api/v1/users/update-avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    // console.log("Cover image response: ", response.data);
    // setcoverImage(response.data.coverimage)
    setavatar(response.data.avatar)

    
  } catch (error) {
    console.error('Upload error:', error);
   
  }
};


  const getuserprofile = async () => {
    
    try {
      const response = await axios.get("http://localhost:4000/getuser",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      //  console.log("get user", response)
      setuser(response.data)
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
  setavatar(user.avatar)
 
}, [user]);


  useEffect(() => {

    getuserprofile()
    

  }, []);

  const handlesearch = async (e) => {
      if(e.key==="Enter" && e.target.value !== ""){
          console.log("search query", e.target.value) 
          //  const ghq = [{rf:"hjhj"},{dfdfd:"dsds"},{sdsd:"sdsdsd"}]

          
          const response = await axios.post(
            `http://localhost:4000/search`,
            {
              search: e.target.value,
              
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
      // console.log(response.data.searchedvideos)
      navigate(`/search/query/${e.target.value}`, { state: { data: response.data.searchedvideos } });

      } 
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setuser((prevUser) => ({
      ...prevUser,
      [name]: value,

    }));
  };




  return (
    
<div class="h-screen overflow-y-auto bg-[#121212] text-white">


<header className="sticky inset-x-0 top-0 z-50 w-full border-b border-white bg-[#121212] px-4">
      <nav className="mx-auto flex max-w-7xl items-center py-2">
        <div className="mr-4 w-12 shrink-0 sm:w-16">
        <svg
                style={{width:"100%"}}
                viewBox="0 0 63 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.25 47.458C55.9485 38.7595 55.9485 24.6565 47.25 15.958C38.5515 7.25952 24.4485 7.25952 15.75 15.958C7.05151 24.6565 7.05151 38.7595 15.75 47.458C24.4485 56.1565 38.5515 56.1565 47.25 47.458Z"
                  stroke="#E9FCFF"
                  stroke-width="1.38962"
                  stroke-miterlimit="10"
                ></path>
                <path
                  d="M10.5366 47.7971V17.5057C10.5366 16.9599 11.1511 16.6391 11.599 16.9495L33.4166 32.0952C33.8041 32.3639 33.8041 32.9368 33.4166 33.2076L11.599 48.3533C11.1511 48.6657 10.5366 48.3429 10.5366 47.7971Z"
                  stroke="url(#paint0_linear_53_10115)"
                  stroke-width="6.99574"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                ></path>
                <path
                  d="M18.1915 27.6963C20.1641 27.6963 21.7285 28.7066 21.7285 30.9021C21.7285 33.0976 20.1621 34.2433 18.1915 34.2433H16.8854V37.8677H14.1733V27.6984H18.1915V27.6963Z"
                  fill="#E9FCFF"
                ></path>
                <path
                  d="M25.2053 27.6963V35.4868H28.484V37.8657H22.4932V27.6963H25.2053Z"
                  fill="#E9FCFF"
                ></path>
                <path
                  d="M35.3142 27.6963L39.4553 37.8657H36.5328L35.9162 36.1763H32.1939L31.5773 37.8657H28.6548L32.7959 27.6963H35.3101H35.3142ZM34.9143 33.5663L34.2144 31.7832C34.1582 31.6395 33.954 31.6395 33.8978 31.7832L33.1979 33.5663C33.1541 33.6767 33.2354 33.7975 33.3562 33.7975H34.756C34.8747 33.7975 34.958 33.6767 34.9143 33.5663Z"
                  fill="#E9FCFF"
                ></path>
                <path
                  d="M40.9491 27.6963L42.8592 30.5188L44.7694 27.6963H48.0355L44.2132 33.2559V37.8657H41.5011V33.2559L37.6787 27.6963H40.9449H40.9491Z"
                  fill="#E9FCFF"
                ></path>
                <path
                  d="M16.894 32.1396V29.9129C16.894 29.8212 16.9982 29.7671 17.0732 29.8191L18.6771 30.9315C18.7417 30.9773 18.7417 31.0731 18.6771 31.1189L17.0732 32.2313C16.9982 32.2834 16.894 32.2313 16.894 32.1375V32.1396Z"
                  fill="#232323"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_53_10115"
                    x1="2.23416"
                    y1="20.3361"
                    x2="26.863"
                    y2="44.9649"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#007EF8"></stop>
                    <stop offset="1" stop-color="#FF4A9A"></stop>
                  </linearGradient>
                </defs>
              </svg>
        </div>
        <div className="relative hidden w-full max-w-md overflow-hidden sm:block mx-auto ">
          <input
            className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2 "
            placeholder="Search"
            onKeyUp={handlesearch}
          />
          <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </span>
        </div>
        {/* <Link to="/login" >
        <button className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent">
                  Log in
                </button>
                </Link> */}


                <Link to="/mychannel/upload-video">
                <button className="mr-1 w-full bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto ml-5">
                  Upload Video
                </button>
                </Link>
                 
                <Link to="/mychannel/videos"> 
                <div class="mb-8 mt-auto px-4 sm:mb-0 sm:mt-0 sm:px-0  ml-6"><button
            class="flex w-full gap-4 text-left sm:items-center">
            <img
              src={avatar}
              alt="React-Patterns" class="h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12" />
            <div class="w-full pt-2 sm:hidden">
              <h6 class="font-semibold">React Patterns</h6>
              <p class="text-sm text-gray-300">@reactpatterns</p>
            </div>
          </button>
        </div>
        </Link>

      </nav>
    </header>



<div class="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">

 

<Sidebar />


  {loader ? <Loader /> :(
  <section class="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">

    <UploadCoverimage  user={user}/>


    <div class="px-4 pb-4">
      <div class="flex flex-wrap gap-4 pb-4 pt-6">

      
        <form encType='multipart/form-data' onSubmit={handleSubmit} class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2"><img
            src={avatar}
            alt="Channel" class="h-full w-full" />
          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <input type="file" onChange={handleFileChange}
              id="profile-image" name='avatar' class="hidden" />
              <label for="profile-image"
              class="inline-block h-8 w-8 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"><svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z">
                </path>
              </svg></label>
              <button type='submit' className='text-black' >Change</button>
              </div>
        </form>



        <div class="mr-auto inline-block">
          <h1 class="font-bolg text-xl">{user.fullname}</h1>
          <p class="text-sm text-gray-400">@{user.username}</p>
        </div>
        <Link to="/mychannel/videos">
        <div class="inline-block"><button
            class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">View
            channel</button></div></Link>
      </div>


      <ul
        class="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
        <li class="w-full"><button
            class="w-full border-b-2 border-[#ae7aff] bg-white px-3 py-1.5 text-[#ae7aff]">Personal
            Information</button></li>
         <Link to="/channel/change-password" className='w-full'>
        <li class="w-full"><button class="w-full border-b-2 border-transparent px-3 py-1.5 text-gray-400">Change
            Password</button></li></Link> 
      </ul>

      <div class="flex flex-wrap justify-center gap-y-4 py-4">
        <div class="w-full sm:w-1/2 lg:w-1/3">
          <h5 class="font-semibold">Personal Info</h5>
          <p class="text-gray-300">Update your photo and personal details.</p>
        </div>

        <Form class="w-full sm:w-1/2 lg:w-2/3" method='POST'>


          <div class="rounded-lg border">
            <div class="flex flex-wrap gap-y-4 p-4">
              <div class="w-full lg:w-1/2 lg:pr-2">
              <label for="username" class="mb-1 inline-block">Username</label>
                  <input type="text" class="w-full rounded-lg border bg-transparent px-2 py-1.5"
                  id="username" placeholder="Enter username "  name='username' value={user.username}  onChange={handleInputChange}/>
                  </div>
              
              <div class="w-full lg:w-1/2 lg:pl-2">
              <label for="fullname" class="mb-1 inline-block">Fullname</label>
                  <input type="text" class="w-full rounded-lg border bg-transparent px-2 py-1.5"
                  id="fullname" placeholder="Enter fullname" name='fullname' onChange={handleInputChange} value={user.fullname} /></div>
              <div class="w-full">
              <label for="email" class="mb-1 inline-block">Email address</label>
                <div class="relative">
                  <div class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300"><svg
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75">
                      </path>
                    </svg></div>
                    <input type="email" onChange={handleInputChange} class="w-full rounded-lg border bg-transparent py-1.5 pl-10 pr-2"
                    id="email" placeholder="Enter email address" name='email' value={user.email} />
                </div>
              </div>
            </div>
            <hr class="border border-gray-300" />
            <div class="flex items-center justify-end gap-4 p-4">
            <button  type='reset'
                class="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">Cancel</button>
                <button   type='submit'
                class="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">Save changes</button></div>
          </div>

        </Form>




        
      </div>
    </div>
  </section>
  )}

</div>
</div>
  )
}



export const handlepersonalinfo =  async (data) => {
  const formdata = await data.request.formData();
  const postdata = Object.fromEntries(formdata)
  console.log("personal info", postdata)
  const token = localStorage.getItem('token');

  const response = await axios.post(

   `http://localhost:4000/api/v1/users/update-account`,
   {
     email: postdata.email,
     username: postdata.username,
     fullname:postdata.fullname,
     
   },
   {
     headers: {
       Authorization: `Bearer ${token}`,
       'Content-Type': 'application/json'
     }
   }
 );
console.log("updated username", response)

return redirect("/mychannel/edit-personal-info")
}









export default Editpersonalinfo










































