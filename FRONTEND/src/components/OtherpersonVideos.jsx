import React from 'react'
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

function OtherpersonVideos({ video }) {


  

  const timeAgo = formatDistanceToNow(new Date(video.createdAt), { addSuffix: true });

  return (
    <div class="w-full">
    <Link to={`/watch/${video._id}`}>
    <div class="relative mb-2 w-full pt-[56%]">
      <div class="absolute inset-0"><img
          src={video?.thumbnail}
          alt="JavaScript Fundamentals: Variables and Data Types" class="h-full w-full" /></div><span
        class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">{video.duration}</span>
    </div></Link>
    <h6 class="mb-1 font-semibold">{video?.title}</h6>
    <p class="flex text-sm text-gray-200">{video?.views?.length} Views · {timeAgo}</p>
  </div>
  )
}

export default OtherpersonVideos