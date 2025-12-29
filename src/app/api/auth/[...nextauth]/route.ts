import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Call DummyJSON Auth API
          const res = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          const user = await res.json();

          if (res.ok && user) {
            return user; // Success
          }
          return null; // Failed
        } catch (e) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Pass the backend user object (with token) to the JWT
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the JWT data to the Client Session
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/login', // We will build this custom page next
  },
  secret: process.env.NEXTAUTH_SECRET || "super_secret_key_123", // Hardcoded for this test to save time
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };