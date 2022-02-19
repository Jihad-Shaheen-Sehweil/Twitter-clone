import { UploadIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import { FaRetweet } from 'react-icons/fa'
import { GoVerified } from 'react-icons/go'
import CommentModal from '../components/CommentModal'
import LikePost from '../components/LikePost'
import { useRouter } from 'next/router'
import Moment from 'react-moment'

function TweetPost({ id, profileImg, name, username, tweet, content }) {
  const router = useRouter()

  return (
    <section onClick={() => router.push(`/${id}`)}>
      <div className="flex cursor-pointer border-b border-[#393939] px-5 pb-1 pt-5 hover:bg-[#080808]">
        <img src={profileImg} className="h-12 w-12 rounded-full" alt="" />

        <div className="pl-5">
          {/* fix width */}
          <div className="flex justify-between xl:w-[490px]">
            <div className="flex items-center">
              <p className="pr-1 font-bold hover:underline">{name}</p>
              <GoVerified />
              <p className="pl-2 text-[#6e767d]">{username}</p>
              {/*add . after username then time */}
            </div>
            <div className=" -mt-3 cursor-pointer rounded-full transition-all ease-out hover:bg-[#0A171F] hover:text-[#1D9BF0]">
              <DotsHorizontalIcon className="h-9 w-9 p-2" />
            </div>
          </div>

          <p className="text-sm ">{tweet}</p>

          {content && (
            <div className=" pr-5 pt-5">
              <div className="rounded-2xl border border-[#393939]">
                <img
                  className="rounded-2xl object-contain"
                  src={content}
                  alt=""
                />
              </div>
            </div>
          )}
          <div className="flex justify-around pt-1 text-[13px] text-[#6e767d] ">
            <CommentModal
              key={id}
              id={id}
              name={name}
              username={username}
              profileImg={profileImg}
              tweet={tweet}
              content={content}
              showNumber
            />

            <div className="group flex items-center hover:!text-[#00BA7C]">
              <FaRetweet className="TweetTemp__icons group-hover:bg-[#071A14]" />
              <p className="pl-1">100</p>
            </div>

            <LikePost id={id} showNumber />

            <UploadIcon className="TweetTemp__icons hover:bg-[#0A171F] hover:text-[#1D9BF0]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TweetPost
