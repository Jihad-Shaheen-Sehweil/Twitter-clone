import { getProviders, signIn as signInToProviders } from 'next-auth/react'
import { BsTwitter } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

function signin({ providers }) {
  return (
    <>
      <div className=" flex min-h-screen text-white">
        {/* log */}
        <div className="h-[721px] w-[828px] bg-[url('/signin_img.png')]">
          <BsTwitter className="relative mx-auto mt-56 h-[280px] w-[345px] " />
        </div>

        <div>
          <div className="ml-8 mt-8 text-[#d9d9d9] font-body">
            <BsTwitter className="h-[45px] w-[57px] " />
            <h1 className='text-[64px] font-extrabold mt-5 mb-5 py-10'>Happining now</h1>
            <h2 className='text-[32px] font-bold py-5'>Join Twitter Now</h2>

            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className="flex h-[38px] w-[300px] items-center justify-center rounded-3xl bg-white p-3 text-sm font-bold text-[#524d50]"
                  onClick={() =>
                    signInToProviders(provider.id, { callbackUrl: '/' })
                  }
                >
                  <FcGoogle className="mr-3 h-5 w-5" />
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// this the middle server that gets the settings
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

export default signin
