import Head from 'next/head'
import Header from "../components/Header"
import Feed from "../components/Feed"
import Widgets from "../components/Widgets"
import Modal from "../components/Modal"
import {getSession } from "next-auth/react";
import React from 'react'

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


    </main>
  ) 
}

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
    props: { session }
  }
}