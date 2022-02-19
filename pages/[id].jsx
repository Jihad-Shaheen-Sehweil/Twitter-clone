import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getProviders, getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import Widgets from '../components/Widgets'
import Header from '../components/Header'
import TweetContent from '../components/TweetContent'
import Modal from '../components/Modal'

function tweetPage() {
  const { data: session } = useSession()
  const [comments, setComments] = useState([])
  const [tweet, setTweet] = useState()
  const router = useRouter()
  const { id } = router.query

  useEffect(
    () =>
      onSnapshot(doc(db, 'tweets', id), (snapshot) => {
        setTweet(snapshot.data())
      }),
    [db]
  )

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'tweets', id, 'comments'),
          orderBy('timeStamp', 'desc')
        ),
        (snapshot) => {
          setComments(snapshot.docs)
        }
      ),
    [db, id]
  )

  return (
    <section>
      <Head>
        <title>
          {tweet?.name} on Twiteer : "{tweet?.tweet}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex h-screen max-w-[1300px]">
        <Header />
        <TweetContent
          key={id}
          id={id}
          name={tweet?.name}
          username={tweet?.username}
          profileImg={tweet?.profileImg}
          tweet={tweet?.tweet}
          // content={tweet.content}
          comments={comments}
        />
        <Widgets />
        <Modal />
      </main>
    </section>
  )
}

export default tweetPage

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
