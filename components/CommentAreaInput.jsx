import { setDoc } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
import { db } from '../firebase'
import { useSession } from 'next-auth/react'

function CommentAreaInput() {
  const { data: session } = useSession()
  const commentRef = useRef(null)
  const [comments, setComments] = useState([])
//   const [comment, setComment] = useState(true)

  const uploadComment = async ()=>{
    await setDoc(doc(db, 'tweets', id, 'likes', session.user.uid))
  }
  return (
    <div className="h-40 w-40 bg-black">
      <form  action="">
        <input className='bg-black' type="text" placeholder="Comment" ref={commentRef} />
        <button type="submit" onClick={uploadComment} >saewfewfwefve</button>
      </form>
    </div>
  )
}

export default CommentAreaInput
