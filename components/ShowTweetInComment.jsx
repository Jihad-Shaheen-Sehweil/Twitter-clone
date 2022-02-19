import { DotsHorizontalIcon, UploadIcon } from '@heroicons/react/outline'
import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import { db } from '../firebase'
import CommentModal from '../components/CommentModal'
import LikePost from '../components/LikePost'
import { FaRetweet } from 'react-icons/fa'
import InputComment from './InputComment'

function ShowTweetInComment({ id, name, username, profileImg, tweet }) {
  const [likes, setLikes] = useState([])
  useEffect(
    () =>
      onSnapshot(collection(db, 'tweets', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )
  return (
    <main>
      <section className="flex items-center justify-between pt-5 xl:w-[490px]">
        <div className="flex">
          <div className="ml-5 h-[48px] min-h-[48px] w-[48px] min-w-[48px] cursor-pointer">
            <img className="rounded-full" src={profileImg} layout="fill" />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center pl-3">
              <p className="pr-1 font-bold hover:underline">{name}</p>
              <GoVerified />
            </div>
            <p className="-ml-2 text-[#6e767d]">{username}</p>
          </div>
        </div>
        <div className=" -mt-3 -mr-10 cursor-pointer rounded-full transition-all ease-out hover:bg-[#0A171F] hover:text-[#1D9BF0]">
          <DotsHorizontalIcon className="h-9 w-9 p-2" />
        </div>
      </section>
      <section className="ml-5 mb-3">
        <h1 className=" text-2xl">{tweet}</h1>
      </section>

      <section>{/* content */}</section>

      <section>{/* timestamp */}</section>

      <section className="mx-2  border-y border-[#393939]">
        <div className="my-5 flex">
          <div className="flex">
            <p>1,160</p>
            <p className="pl-0.5 text-[#6e767d]">Retweets</p>
          </div>
          <div className="flex pl-5">
            <p>500</p>
            <p className="pl-0.5 text-[#6e767d]">Quote Tweets</p>
          </div>
          <div className="flex pl-5">
            <p>{likes.length}</p>
            <p className="pl-0.5 text-[#6e767d]">Likes</p>
          </div>
        </div>
      </section>
      <section className="mx-2 flex items-center justify-evenly border-b border-[#393939]">
        <CommentModal
          key={id}
          id={id}
          name={name}
          username={username}
          profileImg={profileImg}
          tweet={tweet}
          showNumber={false}
          //   content={content}
        />
        <div className="group flex items-center ">
          <FaRetweet className="TweetTemp__icons hover:!text-[#00BA7C] group-hover:bg-[#071A14]" />
        </div>
        <LikePost id={id} showNumber={false} />
        <UploadIcon className="TweetTemp__icons hover:bg-[#0A171F] hover:text-[#1D9BF0]" />
      </section>
      <section>
        <InputComment
          key={id}
          id={id}
          name={name}
          username={username}
          profileImg={profileImg}
          tweet={tweet}
          showNumber={false}
          //   content={content}
        />
      </section>
    </main>
  )
}

export default ShowTweetInComment
