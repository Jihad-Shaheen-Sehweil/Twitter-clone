import { DotsHorizontalIcon } from '@heroicons/react/outline'

function WidgetsRowsTrends({ trendName, numberTrend }) {
  return (
    <section className=' cursor-pointer'>
      <div className="flex items-center justify-between hover:bg-[#1C1F23]">
        <div className="mt-3 mb-2">
          <h4 className="mx-5 text-[15px]">{trendName}</h4>
          <p className=" mx-5 mt-1 text-[13px] text-[#656d73]">{numberTrend}</p>
        </div>

        <DotsHorizontalIcon className="mx-5 h-5 w-5 cursor-pointer rounded-full transition-all ease-out hover:bg-[#0A171F] hover:text-[#1D9BF0]" />
        {/* fix hover */}
      </div>
    </section>
  )
}

export default WidgetsRowsTrends
