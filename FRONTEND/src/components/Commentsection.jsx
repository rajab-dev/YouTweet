import axios from 'axios';
import { comment } from 'postcss';
import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';


function Commentsection({comments, videoToBePlayed}) {

  const token = localStorage.getItem('token');

const [updatedcomments, setupdatedcomments] = useState([])

// console.log(comments)

const handlecommentinput = async (e) => {
    if(e.key==="Enter" && e.target.value !==""){
      console.log(e.target.value,videoToBePlayed._id )
  
      const response = await axios.post(
        `http://localhost:4000/api/v1/users/post/comment`,
        {
          comment: e.target.value,
          videoid: videoToBePlayed._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      e.target.value=""
      // console.log(response.data)
      setupdatedcomments(response.data.reverse())
    }
}



useEffect(() => {
   
   setupdatedcomments(comments.reverse())

}, [setupdatedcomments,comments]);


  return (
      <div
            className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
            <div className="block">
              <h6 className="mb-4 font-semibold">{updatedcomments?.length} Comments</h6><input type="text"
                className="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                placeholder="Add a Comment"  onKeyUp={handlecommentinput}/>
            </div>
            <hr className="my-4 border-white" />
           { updatedcomments.map((comment)=>{
            const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });
            return(
             <div>
              <div className="flex gap-x-4">
              <Link to={`/channel/${comment?.owner?.username}`}>
                <div className="mt-2 h-11 w-11 shrink-0"><img
                    src={comment.owner.avatar}
                    alt="sarahjv" className="h-full w-full rounded-full" /></div></Link>
                <div className="block">
                <Link to={`/channel/${comment?.owner?.username}`}>
                  <p className="flex items-center text-gray-200">{comment.owner.fullname} · <span className="text-sm">{timeAgo}</span>
                  </p>
                  <p className="text-sm text-gray-200">@{comment.owner.username}</p></Link>
                  <p className="mt-3 text-sm">{comment.content}</p>
                </div>
              </div>
              <hr className="my-4 border-white" />
            </div>)
           })}
            <div>
              <div className="flex gap-x-4">
                <div className="mt-2 h-11 w-11 shrink-0"><img
                    src="https://images.pexels.com/photos/18107025/pexels-photo-18107025/free-photo-of-man-reading-newspaper.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="mikerod" className="h-full w-full rounded-full" /></div>
                <div className="block">
                  <p className="flex items-center text-gray-200">Michael Rodriguez · <span className="text-sm">5 minutes
                      ago</span></p>
                  <p className="text-sm text-gray-200">@mikerod</p>
                  <p className="mt-3 text-sm">Render props have always been a bit tricky for me. Can&#x27;t wait to see how
                    this series breaks it down. Thanks for sharing!</p>
                </div>
              </div>
              <hr className="my-4 border-white" />
            </div>
            <div>
              <div className="flex gap-x-4">
                <div className="mt-2 h-11 w-11 shrink-0"><img
                    src="https://images.pexels.com/photos/18096595/pexels-photo-18096595/free-photo-of-music-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="emilyt" className="h-full w-full rounded-full" /></div>
                <div className="block">
                  <p className="flex items-center text-gray-200">Emily Turner · <span className="text-sm">1 hour ago</span></p>
                  <p className="text-sm text-gray-200">@emilyt</p>
                  <p className="mt-3 text-sm">Higher-order components have been a mystery to me for far too long. Looking
                    forward to demystifying them with this series. Thanks!</p>
                </div>
              </div>
              <hr className="my-4 border-white" />
            </div>
            <div>
              <div className="flex gap-x-4">
                <div className="mt-2 h-11 w-11 shrink-0"><img
                    src="https://images.pexels.com/photos/18094275/pexels-photo-18094275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="davidc" className="h-full w-full rounded-full" /></div>
                <div className="block">
                  <p className="flex items-center text-gray-200">David Chen · <span className="text-sm">3 hour ago</span></p>
                  <p className="text-sm text-gray-200">@davidc</p>
                  <p className="mt-3 text-sm">Compound components are a game-changer for UI development. Can&#x27;t wait to
                    learn more about them. Great work on this series!</p>
                </div>
              </div>
              <hr className="my-4 border-white" />
            </div>
            <div>
              <div className="flex gap-x-4">
                <div className="mt-2 h-11 w-11 shrink-0"><img
                    src="https://images.pexels.com/photos/13847596/pexels-photo-13847596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="alex_p" className="h-full w-full rounded-full" /></div>
                <div className="block">
                  <p className="flex items-center text-gray-200">Alex Parker · <span className="text-sm">12 hour ago</span></p>
                  <p className="text-sm text-gray-200">@alex_p</p>
                  <p className="mt-3 text-sm">Controlled vs. uncontrolled components - finally! This topic has always
                    confused me. Thanks for breaking it down!</p>
                </div>
              </div>
              <hr className="my-4 border-white" />
            </div>
            <div>
              <div className="flex gap-x-4">
                <div className="mt-2 h-11 w-11 shrink-0"><img
                    src="https://images.pexels.com/photos/7775637/pexels-photo-7775637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="jessicalee" className="h-full w-full rounded-full" /></div>
                <div className="block">
                  <p className="flex items-center text-gray-200">Jessica Lee · <span className="text-sm">5 hour ago</span></p>
                  <p className="text-sm text-gray-200">@jessicalee</p>
                  <p className="mt-3 text-sm">This series is a goldmine for React developers! Compound components are
                    something I&#x27;ve been eager to master. Thanks for this!</p>
                </div>
              </div>
              <hr className="my-4 border-white" />
            </div>
            <div>
              <div className="flex gap-x-4">
                <div className="mt-2 h-11 w-11 shrink-0"><img
                    src="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="ryanjax" className="h-full w-full rounded-full" /></div>
                <div className="block">
                  <p className="flex items-center text-gray-200">Ryan Jackson · <span className="text-sm">Just now</span></p>
                  <p className="text-sm text-gray-200">@ryanjax</p>
                  <p className="mt-3 text-sm">This is exactly what I needed to take my React skills to the next level.
                    Looking forward to diving into the render props section!</p>
                </div>
              </div>
              <hr className="my-4 border-white" />
            </div>
            <div>
              <div className="flex gap-x-4">
                <div className="mt-2 h-11 w-11 shrink-0"><img
                    src="https://images.pexels.com/photos/3532552/pexels-photo-3532552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="lauraw" className="h-full w-full rounded-full" /></div>
                <div className="block">
                  <p className="flex items-center text-gray-200">Laura Williams · <span className="text-sm">1 minutes ago</span>
                  </p>
                  <p className="text-sm text-gray-200">@lauraw</p>
                  <p className="mt-3 text-sm">This series looks amazing! I&#x27;m especially excited to learn more about
                    controlled vs. uncontrolled components. Thanks for sharing!</p>
                </div>
              </div>
              <hr className="my-4 border-white" />
            </div>
          </div> 
  )
}

export default Commentsection