import { Dialog, Transition } from '@headlessui/react'
import {
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'
import { SiTheconversation } from 'react-icons/si'
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import React, { Fragment, useEffect, useState } from 'react'
import { db } from '../firebase'
import { useSession } from 'next-auth/react'
import { GoVerified } from 'react-icons/go'
import { MdGif } from 'react-icons/md'
import { BiPoll } from 'react-icons/bi'
import { AiOutlineSchedule } from 'react-icons/ai'

export default function CommentModal({
  id,
  profileImg,
  name,
  username,
  tweet,
  content,
  showNumber,
}) {
  let [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  useEffect(
    () =>
      onSnapshot(collection(db, 'tweets', id, 'comments'), (snapshot) =>
        setComments(snapshot.docs)
      ),
    [db, id]
  )
  // add multi comments
  const uploadComment = async (e) => {
    e.preventDefault()
    await addDoc(collection(db, 'tweets', id, 'comments'), {
      uid: session.user.uid,
      name: session.user.name,
      username: session.user.username,
      comment: comment,
      profileImg: session.user.image,
      timeStamp: serverTimestamp(),
    })
    setComment('')
    setIsOpen(false)
  }
  return (
    <>
      <div className="group flex items-center hover:!text-[#1D9BF0]">
        <SiTheconversation
          onClick={() => setIsOpen(true)}
          className="TweetTemp__icons group-hover:bg-[#0A171F]"
        />
        {showNumber && comments.length > 0 && (
          <p className="bl-1 font-bold">{comments.length}</p>
        )}
      </div>

      <Transition.Root appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as="Fragment"
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-[#3a444b] bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-top"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as="Fragment"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <section className="mx-4 mb-4 inline-block transform overflow-hidden rounded-xl bg-black pt-5 text-left align-bottom text-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 sm:align-middle">
                <div
                  onClick={() => setIsOpen(false)}
                  className="absolute -mt-3 -ml-2 h-8 w-8 cursor-pointer rounded-full bg-black bg-opacity-70 backdrop-blur-sm backdrop-filter hover:bg-gray-700 hover:bg-opacity-60"
                >
                  <XIcon className="my-auto mx-auto mt-1.5 h-5 w-5 cursor-pointer text-white " />
                </div>

                <div className=" w-[600px] bg-black ">
                  <div className="flex items-center pt-12">
                    <img
                      src={profileImg}
                      className="h-12 w-12 rounded-full"
                      alt=""
                    />

                    <div className="pl-5">
                      {/* fix width */}
                      <div className="flex flex-col">
                        <div className="flex justify-between xl:w-[490px]">
                          <div className="flex items-center">
                            <p className="pr-1 font-bold">{name}</p>
                            <GoVerified />
                            <p className="pl-2 text-[#6e767d]">{username}</p>
                          </div>
                        </div>
                        <p className="">{tweet}</p>
                        <p className="font-light text-[#6e767d]">
                          Replying to{' '}
                          <span className="cursor-pointer text-[#1D9BF0]">
                            {username}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 h-9 w-[1.5px] bg-[#2f3336d9]"></div>
                  <div className="mt-2 flex">
                    <img
                      src={session?.user?.image}
                      className="h-12 w-12 rounded-full"
                      alt=""
                    />
                    <form action="">
                      <input
                        className={`w-[500px] max-w-lg border-none bg-black placeholder:text-[20px]  placeholder:text-[#6e767d] focus:ring-0`}
                        type="text"
                        placeholder="Tweet your reply"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </form>
                  </div>

                  <div className="-mb-5 flex items-center justify-around pt-20">
                    <div className="flex">
                      <PhotographIcon
                        // onClick={() => filePickerRef.current.click()}
                        className="Tweet__icons"
                      />
                      <MdGif className="Tweet__icons" />
                      <BiPoll className="Tweet__icons" />
                      <EmojiHappyIcon className="Tweet__icons" />
                      <AiOutlineSchedule className="Tweet__icons" />
                      <LocationMarkerIcon className="mr-1 h-8 w-8 p-1 text-[#0E4D77]" />
                    </div>
                    <button
                      // fix the button color when inputing
                      className={`${
                        comment.length == 0 && '!bg-[#0E4D77] !text-[#7b7d7e]'
                      } h-[36px] w-[73px] rounded-3xl bg-[#1d9bf0] text-white`}
                      onClick={uploadComment}
                      type="submit"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </section>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
