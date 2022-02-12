import { GoVerified } from 'react-icons/go'

function WidgetsRowsFollow({ name, username, userImg }) {
  return (
    <section className="flex h-[72px] cursor-pointer items-center justify-between pl-3 hover:bg-[#1C1F23]">
      <main className="flex">
        <div className="h-12 w-12 ">
          <img className=" rounded-full object-contain" src={userImg} alt="" />
        </div>

        <div className="pl-2">
          <div className='flex items-center'>
            <p className='pr-1'>{name}</p>
            <GoVerified />
          </div>
          <p className="text-[#6e767d]">{username}</p>
        </div>
      </main>

      <button className="mr-5 h-[33px] w-[90px] rounded-3xl bg-white font-medium text-black hover:bg-[#D7DBDC]">
        Follow
      </button>
    </section>
  )
}

export default WidgetsRowsFollow
