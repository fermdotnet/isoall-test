import { AuthOptions } from 'next-auth';
import Okta from 'next-auth/providers/okta';

export const authOptions: AuthOptions = {
  providers: [
    Okta({
      clientId: process.env.OKTA_CLIENT_ID as string,
      clientSecret: process.env.OKTA_CLIENT_SECRET as string,
      issuer: process.env.OKTA_ISSUER as string
    })
  ],
  secret: process.env.SECRET as string,
  callbacks: {
    async session({ session }: any) {
      return session;
    }
  }
};
