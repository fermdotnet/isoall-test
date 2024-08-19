import NextAuth from 'next-auth';
import Okta from 'next-auth/providers/okta';

console.log(process.env.OKTA_CLIENT_ID, process.env.OKTA_CLIENT_SECRET, process.env.OKTA_ISSUER, process.env.SECRET);

const handler = NextAuth({
  providers: [
    Okta({
      clientId: process.env.OKTA_CLIENT_ID as string,
      clientSecret: process.env.OKTA_CLIENT_SECRET as string,
      issuer: process.env.OKTA_ISSUER as string
    })
  ],
  secret: process.env.SECRET as string
});

export { handler as GET, handler as POST };
