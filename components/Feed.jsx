import { SparklesIcon } from '@heroicons/react/outline'
import TweetPost from './TweetPost'
import Tweet from './Tweet'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'

function Feed() {
  const [tweets, setTweets] = useState([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'tweets'), orderBy('timeStamp', 'desc')),
        (snapshot) => {
          setTweets(snapshot.docs)
        }
      ),
    [db]
  )

  return (
    // add burr in the sticky home
    <main className=" max-w-[600px] overflow-y-scroll border-x border-[#393939] scrollbar-hide">
      {/* add blur on the home + scrll screen */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-black bg-opacity-60 pt-2 pb-3 backdrop-blur-sm backdrop-filter">
        <h1 className="cursor-pointer pl-5 text-lg font-extrabold">Home</h1>
        <div className="">
          <SparklesIcon className="SideBarOption__navBtnSize cursor-pointer rounded-full p-2 transition-all ease-out hover:bg-[#d9d9d91a]" />
        </div>
      </div>

      {/* tweet upload */}
      <Tweet />
      {tweets.map((tweet) => (
        <TweetPost
          key={tweet.id}
          id={tweet.id}
          name={tweet.data().name}
          username={tweet.data().username}
          profileImg={tweet.data().profileImg}
          tweet={tweet.data().tweet}
          content={tweet.data().image}
        />
      ))}
    </main>
  )
}

export default Feed
