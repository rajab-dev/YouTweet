// // import React, { useState } from 'react'
// // import { Form } from 'react-router-dom';

// // function UploadCoverimage({user}) {

// //   return (
// //     <Form class="relative min-h-[150px] w-full pt-[16.28%]" method='post' encType='multipart/form-data'>

// //       <div class="absolute inset-0 overflow-hidden">
// //       <img
// //           src={user.coverimage} alt= " cover-photo "   />
// //       </div>
// //       <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
// //       <input type='file' name='coverimage'  id="coverimage"
// //           class="hidden" />
// //           <label for="coverimage"  
// //           class="inline-block h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white">
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
// //             stroke="currentColor" aria-hidden="true">
// //             <path stroke-linecap="round" stroke-linejoin="round"
// //               d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z">
// //             </path>
// //           </svg>
// //           </label>
       
// //           </div> 
// //     </Form>
// //   )
// // }



// //  async function coverimage({ request }) {
// //   const formData = await request.formData();

// //   // Create a new FormData object
// //   const formPayload = new FormData();
  
// //   // Append all the form data (including files) to the FormData object
 
// //   formPayload.append('coverimage', formData.get('coverimage'));

// //   try {
   
// //     const token = localStorage.getItem('token');
// //     const response = await axios.post(

// //       `http://localhost:4000/api/v1/users/update-coverimage`,
// //       {
// //         formPayload,
       
        
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           'Content-Type': 'multipart/form-data'
// //         }
// //       }
// //     );
    
// //     console.log("coverimage response ", response)

// //     return redirect("/sign-up");
// //   } catch (error) {
// //     console.error('Registration error:', error);
// //     return { error: 'Registration failed. Please try again.' };
// //   }
// // }


// // export default UploadCoverimage

















// import React from 'react';
// import axios from 'axios';

// function UploadCoverimage({ user }) {
//   return (
//     <form className="relative min-h-[150px] w-full pt-[16.28%]" method="post" encType="multipart/form-data">
//       <div className="absolute inset-0 overflow-hidden">
//         <img src={user.coverimage} alt="cover-photo" />
//       </div>
//       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//         <input type="file" name="coverimage" id="coverimage" className="hidden" />
//         <label htmlFor="coverimage" className="inline-block h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>
//           </svg>
//         </label>
//       </div>
//     </form>
//   );
// }

// async function coverimage({ request }) {
//   try {
//     const formData = await request.formData();
//     const formPayload = new FormData();
//     formPayload.append('coverimage', formData.get('coverimage'));

//     const token = localStorage.getItem('token');
//     const response = await axios.post(
//       `http://localhost:4000/api/v1/users/update-coverimage`,
//       formPayload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       }
//     );

//     console.log("coverimage response ", response);

//     // Handle redirect or other actions here

//     return { success: true };
//   } catch (error) {
//     console.error('Upload error:', error);
//     return { error: 'Upload failed. Please try again.' };
//   }
// }
// export default UploadCoverimage

// export { coverimage };















import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UploadCoverimage({ user }) {

  const [file, setFile] = useState(null);
  const [coverImage, setcoverImage] = useState()
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('coverimage', file);

      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:4000/api/v1/users/update-coverimage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // console.log("Cover image response: ", response.data);
      setcoverImage(response.data.coverimage)

      
    } catch (error) {
      console.error('Upload error:', error);
     
    }
  };

  useEffect(() => {
    
    setcoverImage(user.coverimage)

  }, [user]);







  return (
    <form onSubmit={handleSubmit} className="relative min-h-[150px] w-full pt-[16.28%]" encType="multipart/form-data">
      <div className="absolute inset-0 overflow-hidden">
        <img src={coverImage} alt="cover-photo" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <input type="file" name="coverimage" id="coverimage" className="hidden" onChange={handleFileChange} />
        <label htmlFor="coverimage" className="inline-block h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>
          </svg>
        </label>
        <button type="submit" >Upload</button>
      </div>
    </form>
  );
}

export default UploadCoverimage;

