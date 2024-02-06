import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

const handler = NextAuth({
  providers: [
    CognitoProvider({
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
      issuer: process.env.NEXT_PUBLIC_COGNITO_ISSUER,
    }),
  ],
});

export { handler as GET, handler as POST };
