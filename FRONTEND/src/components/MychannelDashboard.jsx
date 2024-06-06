import React from 'react'
import { Link } from 'react-router-dom'

function MychannelDashboard({user}) {
  return (
  <>
    <div class="flex flex-wrap gap-4 pb-4 pt-6"><span
              class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2"><img
                src={user.avatar}
                alt="Channel" class="h-full w-full" /></span>
            <div class="mr-auto inline-block">
              <h1 class="font-bolg text-xl">{user.fullname}</h1>
              <p class="text-sm text-gray-400">@{user.username}</p>
              <p class="text-sm text-gray-400">{user.subscribercount} Subscribers · {user.numberofchannelsubscribed} Subscribed</p>
            </div>
            <Link to="/mychannel/edit-personal-info">
            <div class="inline-block"><button
                class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"><span
                  class="inline-block w-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125">
                    </path>
                  </svg></span>Edit</button></div></Link>
          </div>
          
  </>
  )
}

export default MychannelDashboard