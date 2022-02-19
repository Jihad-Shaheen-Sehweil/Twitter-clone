import React from 'react'

function InputComment({ id, name, username, profileImg, tweet }) {
  return (
    <div className="flex items-center border-b border-[#393939] py-4">
      <div className="flex items-center">
        <div className="ml-5 h-[48px] min-h-[48px] w-[48px] min-w-[48px] cursor-pointer">
          <img className="rounded-full" src={profileImg} layout="fill" />
        </div>
        <input
          className={`w-[500px] max-w-lg border-none bg-black placeholder:text-[20px]  placeholder:text-[#6e767d] focus:ring-0`}
          type="text"
          placeholder="Tweet your reply"
        />
      </div>
      <button
        // fix the button color when inputing
        className={`${'!bg-[#0E4D77] !text-[#7b7d7e]'} -ml-32 h-[36px] w-[73px] rounded-3xl bg-[#1d9bf0] text-white`}
        // onClick={uploadComment}
        type="submit"
      >
        Reply
      </button>
    </div>
  )
}

export default InputComment
