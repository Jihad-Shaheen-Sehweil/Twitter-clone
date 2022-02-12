import { useState } from 'react'

function SideBarOption({ Icon, text }) {
  const [value, setValue] = useState('')

  function handleClick(value) {
    setValue(value)
  }

  return (
    <div
      onClick={() => handleClick(text)}
      className="SideBarOption__navBtn p-3"
    >
      <Icon className="SideBarOption__navBtnSize" />
      <h2
        className={`${
          value === text && '!font-bold'
        } mr-5 hidden pl-5 text-xl xl:block`}
      >
        {text}
      </h2>
    </div>
  )
}
// font-extrabold for when selected
export default SideBarOption
