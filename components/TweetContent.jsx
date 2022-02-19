import { SparklesIcon, ArrowLeftIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'
import Comments from './Comments'
import ShowTweetInComment from './ShowTweetInComment'

function TweetContent({
  id,
  name,
  username,
  profileImg,
  tweet,
  content,
  comments,
}) {
  const router = useRouter()
  return (
    <section className=" mt-3 max-w-[600px] overflow-y-scroll border-x border-[#393939] pl-3 scrollbar-hide">
      <div className="sticky top-0 z-10 flex items-center bg-black bg-opacity-60 backdrop-blur-sm backdrop-filter">
        <ArrowLeftIcon
          onClick={() => router.push('/')}
          className="SideBarOption__navBtnSize cursor-pointer rounded-full p-2 transition-all ease-out hover:bg-[#d9d9d91a]"
        />
        <h1 className="ml-10 cursor-pointer text-lg font-bold text-[#D9D9D9]">
          Tweet
        </h1>
      </div>

      <ShowTweetInComment
        key={id}
        id={id}
        name={name}
        username={username}
        profileImg={profileImg}
        tweet={tweet}
        // content={content}
      />
      {comments.map((comment, index) => (
        <Comments
          key={index}
          id={comment.uid}
          name={comment.data().name}
          username={comment.data().username}
          profileImg={comment.data().profileImg}
          comment={comment.data().comment}
          // content={comment.data().image}
        />
      ))}
    </section>
  )
}

export default TweetContent
