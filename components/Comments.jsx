import { DotsHorizontalIcon } from '@heroicons/react/outline'
import React from 'react'
import { GoVerified } from 'react-icons/go'

function Comments({ id, name, username, profileImg, comment }) {
  return (
    <section className="mt-2.5 flex flex-col border-[#393939] border-b pb-3">
      <div className="flex items-center">
        <img
          className="h-12 w-12 rounded-full object-contain"
          src={profileImg}
          alt=""
        />
        <div className="ml-3 flex items-center justify-between xl:w-[490px]">
          <div className="flex flex-col">
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="pr-1 font-bold hover:underline">{name}</p>
                <GoVerified />
                <p className="pl-1 text-[#6e767d]">{username}</p>
              </div>
              <div>
                <p className="text-[#6e767d]">Replying to</p>
                {/* the username of the relpied to */}
              </div>

              <p className="">{comment}</p>
            </div>
          </div>

          <div className=" -mt-3 cursor-pointer rounded-full transition-all ease-out hover:bg-[#0A171F] hover:text-[#1D9BF0]">
            <DotsHorizontalIcon className="h-9 w-9 p-2" />
          </div>
        </div>
      </div>
      {/* icons */}
      
    </section>
  )
}

export default Comments
