import jwt from "jsonwebtoken"
import NextAuth, { AuthOptions, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string
  }
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session }) => {
      if (!session.accessToken) {
        session.accessToken = jwt.sign(
          {
            name: session.user?.name,
            email: session.user?.email,
          },
          "TESTE_SECRET",
          {
            expiresIn: "30d",
          }
        )
      }
      return session
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign-in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
