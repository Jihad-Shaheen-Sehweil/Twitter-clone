import { useRouter } from 'next/router'

function Redirect() {
  const router = useRouter()
  router.push('/auth/signin')
  return <div></div>
}

export default Redirect
