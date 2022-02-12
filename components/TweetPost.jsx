import {
  HeartIcon,
  UploadIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline'
import { FaRetweet } from 'react-icons/fa'
import { SiTheconversation } from 'react-icons/Si'
import { GoVerified } from 'react-icons/go'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import CommentModal from '../components/CommentModal'
import Moment from 'react-moment'
import { useRecoilState } from 'recoil'
import { modalStateComment } from '../atoms/modalAtom'

function TweetPost({ id, profileImg, name, username, tweet, content }) {
  const { data: session } = useSession()
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(true)
  const [openComment, setOpenComment] = useRecoilState(modalStateComment)

  useEffect(
    () =>
      onSnapshot(collection(db, 'tweets', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  )

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'tweets', id, 'likes', session.user.uid))
    } else {
      await setDoc(doc(db, 'tweets', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    }
  }

  return (
    <section>
      <div className="flex cursor-pointer border-b border-[#393939] px-5 pb-1 pt-5 hover:bg-[#080808]">
        <img src={profileImg} className="h-12 w-12 rounded-full" alt="" />

        <div className="pl-5">
          {/* fix width */}
          <div className="flex justify-between xl:w-[490px]">
            <div className="flex items-center">
              <p className="pr-1 font-bold">{name}</p>
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
            <div className="group flex items-center hover:!text-[#1D9BF0]">
              <SiTheconversation
                onClick={() => setOpenComment(true)}
                className="TweetTemp__icons group-hover:bg-[#0A171F]"
              />
              <p className="pl-1">5</p>
            </div>

            <div className="group flex items-center hover:!text-[#00BA7C]">
              <FaRetweet className="TweetTemp__icons group-hover:bg-[#071A14]" />
              <p className="pl-1">100</p>
            </div>

            <div className="group flex items-center hover:!text-[#720F3C]">
              {hasLiked ? (
                <>
                  <HeartIconFilled
                    onClick={likePost}
                    className="TweetTemp__icons text-[#720F3C] group-hover:bg-[#200914]"
                  />
                </>
              ) : (
                <>
                  <HeartIcon
                    onClick={likePost}
                    className="TweetTemp__icons group-hover:bg-[#200914]"
                  />
                </>
              )}
              {likes.length > 0 && (
                <p className="bl-1 font-bold">{likes.length}</p>
              )}
            </div>

            <UploadIcon className="TweetTemp__icons hover:bg-[#0A171F] hover:text-[#1D9BF0]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TweetPost
