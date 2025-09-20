import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Demo credentials validation
        if (
          credentials.email === "demo@voar.com" &&
          credentials.password === "demo123"
        ) {
          return {
            id: "1",
            email: "demo@voar.com",
            name: "João Silva",
            image: "/placeholder-avatar.jpg",
          };
        }

        // In production, validate against your database
        // const user = await validateUserCredentials(credentials.email, credentials.password);
        // return user;

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful login
      if (url.startsWith("/login")) {
        return `${baseUrl}/dashboard`;
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt" as const,
  },
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);