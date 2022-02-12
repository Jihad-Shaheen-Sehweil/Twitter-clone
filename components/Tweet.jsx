import {
  PhotographIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  XIcon,
} from '@heroicons/react/outline'
import { MdGif } from 'react-icons/md'
import { BiPoll } from 'react-icons/bi'
import { AiOutlineSchedule } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { db, storage } from '../firebase'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { ref, getDownloadURL, uploadString } from 'firebase/storage'
import { useRef, useState } from 'react'

function Tweet() {
  const { data: session } = useSession()
  const filePickerRef = useRef(null)
  const tweetRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useRecoilState(modalState)

  const uploadPost = async () => {
    if (loading) return

    setLoading(true)

    // 1) Create a post and add to firestore "posts" collection
    // 2) get the post ID for the newly created post
    // 3) upload the image to firebase storage with the post ID
    // 4) get the download URL form firebase storage and update the original post with image

    const docRef = await addDoc(collection(db, 'tweets'), {
      name: session.user.name,
      username: session.user.username,
      tweet: tweetRef.current.value,
      profileImg: session.user.image,
      timeStamp: serverTimestamp(),
    })

    console.log('New Doc Added with ID', docRef.id)

    if (selectedFile) {
      const imageRef = ref(storage, `tweets/${docRef.id}/image`)
      console.log(imageRef)
      await uploadString(imageRef, selectedFile, 'data_url').then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef)
          await updateDoc(doc(db, 'tweets', docRef.id), {
            image: downloadURL,
          })
        }
      )
    }
    setLoading(false)
    setSelectedFile(null)
    setOpen(false)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  return (
    <section className="border-b-2 border-[#393939]">
      <div className="flex">
      
        <div className="h-[48px] w-[48px] min-h-[48px] min-w-[48px] cursor-pointer ml-5">
          <img
            className="rounded-full"
            src={session?.user?.image}
            layout="fill"
          />

        </div>

        <div className="flex flex-col pt-2">
          <form action="">
            <input
              className={`w-[500px] max-w-lg border-none bg-black placeholder:text-[20px]  placeholder:text-[#6e767d] focus:ring-0`}
              type="text"
              placeholder="What's happening?"
              ref={tweetRef}
            />
            <div>
              <input
                ref={filePickerRef}
                type="file"
                hidden
                onChange={addImageToPost}
              />
            </div>
          </form>

          {selectedFile && (
            <div className="mt-5 mr-4">
              <div className="absolute mt-2 ml-2 h-8 w-8 rounded-full bg-black bg-opacity-70 backdrop-blur-sm backdrop-filter hover:bg-opacity-60">
                <XIcon
                  onClick={() => setSelectedFile(null)}
                  className="my-auto mx-auto mt-1.5 h-5 w-5 cursor-pointer text-white "
                />
              </div>
              <img
                className="w-full max-w-[500px] cursor-pointer rounded-3xl object-contain"
                src={selectedFile}
                alt="Selected File"
              />
            </div>
          )}

          <div className={`flex justify-between ${
            !selectedFile && open &&
        'mt-[125px]'
    }`}>
            <div className="flex pl-2 pt-5 pb-3">
              <PhotographIcon
                onClick={() => filePickerRef.current.click()}
                className="Tweet__icons"
              />
              <MdGif className="Tweet__icons" />
              <BiPoll className="Tweet__icons" />
              <EmojiHappyIcon className="Tweet__icons" />
              <AiOutlineSchedule className="Tweet__icons" />
              <LocationMarkerIcon className="mr-1 h-8 w-8 p-1 text-[#0E4D77]" />
            </div>

            <button
              className="Header__btn h-9 w-20 bg-[#0E4D77] text-[#7b7d7e]"
              onClick={uploadPost}
              type="submit"
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tweet
