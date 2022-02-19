import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

function LikePost({ id, showNumber }) {
  const { data: session } = useSession()
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(true)

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
      {showNumber && likes.length > 0 && (
        <p className="bl-1 font-bold">{likes.length}</p>
      )}
    </div>
  )
}

export default LikePost
