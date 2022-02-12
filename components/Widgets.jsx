import { SearchIcon, CogIcon } from '@heroicons/react/outline'
import WidgetsRowsTrends from './WidgetsRowsTrends'
import WidgetsRowsFollow from './WidgetsRowsFollow'

const trends = [
  { hashName: '#الطفل_ريان', numberTrend: '351K Tweets' },
  { hashName: '#باقي_متر', numberTrend: '81K Tweets' },
  { hashName: '#انقاذ_الطفل', numberTrend: '67.3K Tweets' },
  { hashName: '#اوقفوا_خطف_اطفالنا', numberTrend: '43.7K Tweets' },
  { hashName: '#الرياض_lلان', numberTrend: '23.2K Tweets' },
]

const follow = [
  {
    name: 'Chelsea FC',
    username: '@ChelseaFC',
    userImg: '/followUserImg_1.jpg',
  },
  {
    name: 'Manchester United',
    username: '@ManUtd',
    userImg: '/followUserImg_2.jpg',
  },
  {
    name: 'Premier League',
    username: '@premierleague',
    userImg: '/followUserImg_3.jpg',
  },
]

function Widgets() {
  return (
    <section className="flex flex-col lg:w-[290px] xl:w-[368px]">
      <div className="mb-2 hidden lg:block">
        <div className="group sticky top-0 mt-1 ml-7 flex max-w-[348px] items-center rounded-3xl bg-[#202327] text-[#656d73] ring-[#1d9bf0] focus-within:bg-black focus-within:ring-1">
          <SearchIcon className="ml-5 h-5 w-5 group-focus-within:text-[#1d9bf0]" />
          <input
            className="ml-2 h-[42px] w-[310px] rounded-3xl border-none bg-[#202327] focus-within:bg-black focus:ring-0"
            type="text"
            placeholder="Search Twitter"
          />
        </div>
      </div>

      <div className=" overflow-y-auto scrollbar-hide">
        <div className="ml-7 mt-2 hidden h-[430px] max-w-[348px] rounded-2xl bg-[#15181c] pt-0.5 lg:block">
          <div className="mt-2 mb-2 flex items-center justify-between">
            <h3 className="ml-3 text-xl font-extrabold">Trends for you</h3>
            <CogIcon className="mr-5 h-9 w-9 rounded-full p-2" />
          </div>

          {trends.map((trend, index) => (
            <WidgetsRowsTrends
              key={index}
              trendName={trend.hashName}
              numberTrend={trend.numberTrend}
            />
          ))}
          <div className="h-[45px] cursor-pointer rounded-b-2xl hover:bg-[#1C1F23]">
            <p className="ml-5 pt-3 text-[#1d9bf0]">Show more</p>
          </div>
        </div>

        <div className="ml-7 mt-4 hidden h-[318px] max-w-[348px] rounded-2xl bg-[#15181c] pt-1 lg:block">
          <h3 className="ml-3 mt-2 text-xl font-extrabold">Who to follow</h3>
          <div className="mt-3">
            {follow.map((user, index) => (
              <WidgetsRowsFollow
                key={index}
                name={user.name}
                username={user.username}
                userImg={user.userImg}
              />
            ))}
          </div>

          <div className="h-[50px] cursor-pointer rounded-b-2xl pt-3 hover:bg-[#1C1F23]">
            <p className="ml-5 text-[#1d9bf0]">Show more</p>
          </div>
        </div>

        <div className='ml-7 mt-4 text-xs text-[#6e767d] lg:block hidden'>
          <div className="flex pb-1">
            <p className="Widgets__extra">Terms of Service</p>
            <p className="Widgets__extra">Privacy Policy</p>
            <p className="Widgets__extra">Cookie Policy</p>
          </div>
          <div className="flex pb-1">
            <p className="Widgets__extra">Accessibility</p>
            <p className="Widgets__extra">Ads info</p>
            <p className="Widgets__extra">More</p><span className='ml-1 font-medium'>...</span>
          </div>
          <p className="pl-3 pb-10">© 2022 Twitter, Inc.</p>
        </div>
      </div>
    </section>
  )
}

export default Widgets
