import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLINT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
  },
  // the callbacks to bring more data from google
  callbacks: {
    async session({ session, token, user }) {
      session.user.username =
        '@' + session.user.name.split(' ').join('').toLocaleLowerCase()
      session.user.uid = token.sub
      return session
    },
  },
})
