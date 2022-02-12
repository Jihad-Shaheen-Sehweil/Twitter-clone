import Head from 'next/head'
import Header from "../components/Header"
import Feed from "../components/Feed"
import Widgets from "../components/Widgets"
import Modal from "../components/Modal"
import CommentModal from '../components/CommentModal'

export default function Home() {
  return (   
    <main className="flex max-w-[1300px] h-screen mx-auto">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <Feed />
      <Widgets />
      <Modal />
      <CommentModal />

    </main>
  ) 
}
