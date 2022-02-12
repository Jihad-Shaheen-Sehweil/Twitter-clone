import {
  HashtagIcon,
  BellIcon,
  BookmarkIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  SearchIcon,
  HomeIcon as HomeIconOurline,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { BiEnvelope } from 'react-icons/bi'
import { IoNewspaperOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { GiFeather } from 'react-icons/gi'
import { BsTwitter } from 'react-icons/bs'
import SideBarOption from './SideBarOption'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

function Header() {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const router = useRouter()

  return (
    <header className="mt-2 ml-8 w-16 max-w-[400px] sm:w-[88px] lg:mr-5 lg:w-16 xl:w-[234px] xl:pr-10">
      <nav className="flex flex-col">
        <div
          onClick={() => router.push('/')}
          className="relative left-5 mb-3 cursor-pointer text-center"
        >
          <BsTwitter className="h-[33.38px] w-[28.07px]" />
        </div>

        <SideBarOption Icon={HomeIcon} text="Home" />
        <SideBarOption Icon={HashtagIcon} text="Explore" />
        <SideBarOption Icon={BellIcon} text="Notifications" />
        <SideBarOption Icon={BiEnvelope} text="Messages" />
        <SideBarOption Icon={BookmarkIcon} text="Bookmarks" />
        <SideBarOption Icon={IoNewspaperOutline} text="Lists" />
        <SideBarOption Icon={CgProfile} text="Profile" clikedStyle={''} />
        <SideBarOption Icon={DotsCircleHorizontalIcon} text="More" />

        <button onClick={() => setOpen(true)} className="Header__btn">
          Tweet
        </button>

        <button
          onClick={() => setOpen(true)}
          className="Header__btn__icon mx-auto"
        >
          <GiFeather className="mx-auto" />
        </button>

        <section className=" mt-[55px] flex w-full cursor-pointer items-center justify-between rounded-3xl hover:bg-[#d9d9d91a]">
          <div className="flex items-center">
            <div className="h-[40px] w-[40px] cursor-pointer ">
              <img
                className="rounded-full"
                onClick={signOut}
                src={session?.user?.image}
                layout="fill"
              />
            </div>
            <div className="ml-5 rounded-2xl">
              <p className="hidden font-bold lg:block">{session?.user?.name}</p>
              <p className="hidden text-[#6e767d] lg:block">
                {session?.user?.username}
              </p>
            </div>
          </div>

          <DotsHorizontalIcon className="h-5 w-5" />
        </section>
      </nav>
    </header>
  )
}

export default Header
