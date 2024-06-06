// import React, { useEffect, useState } from 'react'
// import LikeSubscribeComponent from './LikeSubscribeComponent'
// import Commentsection from './Commentsection'
// import Recomendedvideos from './Recomendedvideos';
// import { Link, useParams } from 'react-router-dom'
// import axios from 'axios';
// import VideoDetailheader from './VideoDetailheader';
// import VideoDetailsidebar from './VideoDetailsidebar';


// function Videodetailpage() {

//   const { videoid } = useParams();
//    const [videoToBePlayed, setvideoToBePlayed] = useState({})

//   console.log("video id from params", videoid)
//   const token = localStorage.getItem('token'); 
//   const getallvariables = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/v1/users/video/${videoid}`,{
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })

//       console.log("got response", response.data.video1.videofile)
//       setvideoToBePlayed(response.data.video1)

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
//     getallvariables();
    
//   },[]);





//   return (
//     <div className="h-screen overflow-y-auto bg-[#121212] text-white">
//   <VideoDetailheader />
//   <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
//     <VideoDetailsidebar />
//     <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
//       <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
//         <div className="col-span-12 w-full">
//           <div className="relative mb-4 w-full pt-[56%]">
//             <div className="absolute inset-0">
//             <video className="h-full w-full" controls autoPlay muted>
//                 <source
//                   src={videoToBePlayed.videofile}
//                   type="video/mp4" />
//               </video>
//               </div>
//           </div>
//           <LikeSubscribeComponent />
//           <button
//             className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
//             <h6 className="font-semibold">573 Comments...</h6>
//           </button>
//           <Commentsection />
//         </div>
//        <Recomendedvideos />
//       </div>
//     </section>
//   </div>
// </div>
//   )
// }

// export default Videodetailpage





// import React, { useEffect, useState } from 'react';
// import LikeSubscribeComponent from './LikeSubscribeComponent';
// import Commentsection from './Commentsection';
// import Recomendedvideos from './Recomendedvideos';
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';
// import VideoDetailheader from './VideoDetailheader';
// import VideoDetailsidebar from './VideoDetailsidebar';
// import { data } from 'autoprefixer';

// function Videodetailpage() {

//   const { videoid } = useParams();
//   const [videoToBePlayed, setvideoToBePlayed] = useState(null);
//   const [likes , setlikes] = useState(0);
//   const [dislikes , setdislikes] = useState(0);
//   const [Subscribers , setsubscribers] = useState(0);
//   const [subscriptionMessage, setsubscriptionMessage] = useState()
//   const [comments, setcomments] = useState([])
//   const [suggestedvids, setsuggestedvids] = useState([])


//   const [loading, setLoading] = useState(null);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem('token');

//   const getallvariables = async () => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/v1/users/video/${videoid}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       console.log("got response", response.data);
//       setsuggestedvids(response.data.videostobesuggested)
//       setvideoToBePlayed(response.data.video1);
//       setlikes(response.data.numberoflikes)
//       setdislikes(response.data.numberofdislikes)
//       setsubscribers(response.data.totalsubscribers)
//       setsubscriptionMessage(response.data.message)
//       setcomments(response.data.comments)
//       // setLoading(false);
//     } catch (error) {
//       // console.log(error);
//       setError(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getallvariables();
//   }, [videoid]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading video.</div>;
//   }

//   return (
//     <div className="h-screen overflow-y-auto bg-[#121212] text-white">
//       <VideoDetailheader />
//       <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
//         <VideoDetailsidebar />
//         <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
//           <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
//             <div className="col-span-12 w-full">
//               <div className="relative mb-4 w-full pt-[56%]">
//                  <div className="absolute inset-0">
//                   {videoToBePlayed && videoToBePlayed.videofile ? (
//                     <video className="h-full w-full" controls autoPlay muted>
//                       <source
//                         src={videoToBePlayed.videofile}
//                         type="video/mp4"
//                       />
//                       Your browser does not support the video tag.
//                     </video>
//                   ) : (
//                     <div>No video available</div>
//                   )}
//                 </div> 
         
//               </div>
//               <LikeSubscribeComponent videoToBePlayed={videoToBePlayed} likes={likes} dislikes={dislikes} Subscribers={ Subscribers }  subscriptionMessage={subscriptionMessage} />
//               <button
//                 className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
//                 <h6 className="font-semibold">573 Comments...</h6>
//               </button>
//               <Commentsection comments={ comments } videoToBePlayed={videoToBePlayed} />
//             </div>
//             <Recomendedvideos suggestedvids={ suggestedvids } />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Videodetailpage;


















import React, { useEffect, useState } from 'react';
import LikeSubscribeComponent from './LikeSubscribeComponent';
import Commentsection from './Commentsection';
import Recomendedvideos from './Recomendedvideos';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoDetailheader from './VideoDetailheader';
import VideoDetailsidebar from './VideoDetailsidebar';
import Loader from './Loader';

function Videodetailpage() {
  const { videoid } = useParams();
  const [videoToBePlayed, setvideoToBePlayed] = useState(null);
  const [likes, setlikes] = useState(0);
  const [dislikes, setdislikes] = useState(0);
  const [Subscribers, setsubscribers] = useState(0);
  const [subscriptionMessage, setsubscriptionMessage] = useState('');
  const [comments, setcomments] = useState([]);
  const [suggestedvids, setsuggestedvids] = useState([]);
  const [loader, setloader] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const getallvariables = async () => {
    setloader(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/users/video/${videoid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("got response", response.data);
      setsuggestedvids(response.data.videostobesuggested);
      setvideoToBePlayed(response.data.video1);
      setlikes(response.data.numberoflikes);
      setdislikes(response.data.numberofdislikes);
      setsubscribers(response.data.totalsubscribers);
      setsubscriptionMessage(response.data.message);
      setcomments(response.data.comments);
    } catch (error) {
      console.error("Error fetching video data", error);
      setError(error);
    } finally {
      const timer = setTimeout(() => {
        // Task to execute after 3 seconds
        setloader(null)
      }, 1000);
  
     return ()=> clearTimeout(timer);
    }
  };

  useEffect(() => {
    getallvariables();
  }, [videoid]);

  

  if (error) {
    return <div>Error loading video.</div>;
  }

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <VideoDetailheader />
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <VideoDetailsidebar />

        {loader ? <Loader /> : (
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
          <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
            <div className="col-span-12 w-full">
              <div className="relative mb-4 w-full pt-[56%]">
                <div className="absolute inset-0">
                  {videoToBePlayed && videoToBePlayed.videofile ? (
                    <video className="h-full w-full" controls autoPlay muted>
                      <source
                        src={videoToBePlayed.videofile}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div>No video available</div>
                  )}
                </div>
              </div>
              <LikeSubscribeComponent 
                videoToBePlayed={videoToBePlayed} 
                likes={likes} 
                dislikes={dislikes} 
                Subscribers={Subscribers}  
                subscriptionMessage={subscriptionMessage} 
              />
              <button
                className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
                <h6 className="font-semibold">573 Comments...</h6>
              </button>
              <Commentsection comments={comments} videoToBePlayed={videoToBePlayed} />
            </div>
            <Recomendedvideos suggestedvids={suggestedvids} />
          </div>
        </section>
        )}
      </div>
    </div>
  );
}

export default Videodetailpage;
