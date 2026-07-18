import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Google from 'next-auth/providers/google';
import { prisma } from '@/lib/prisma';
import { authConfig } from './auth.config';

import Credentials from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET || "fallback_secret_for_dev_mode_only",
  trustHost: true, // Fixes CSRF issues when testing on mobile devices via local IP
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      id: "mock",
      name: "Mock Login",
      credentials: {
        accountId: { label: "Account ID", type: "text" }
      },
      async authorize(credentials) {
        const accountId = credentials?.accountId as string;
        
        // Hardcoded server-side mapping of allowed test accounts.
        // The client can NO LONGER inject a 'role' parameter.
        const TEST_ACCOUNTS: Record<string, { role: any, name: string, email: string }> = {
          'buyer': { role: 'BUYER', name: 'Rahul (Customer)', email: 'buyer_test@buywise.dev' },
          'seller': { role: 'SELLER', name: 'Manoj (Seller)', email: 'seller_test@buywise.dev' },
          'partner': { role: 'SERVICE_PROVIDER', name: 'Adv. Sharma (Lawyer)', email: 'partner_test@buywise.dev' },
          'admin': { role: 'ADMIN', name: 'Founder (Admin)', email: 'admin_test@buywise.dev' },
        };

        const account = TEST_ACCOUNTS[accountId];
        
        if (!account) {
          throw new Error('Invalid test account ID. Access denied.');
        }

        // Find or create the user in the database so that IDs are consistent
        let dbUser = await prisma.user.findFirst({ where: { email: account.email } });
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              name: account.name,
              email: account.email,
              role: account.role,
            }
          });
        }

        // Return a mock user for development
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          image: `https://ui-avatars.com/api/?name=${account.name.replace(' ', '+')}&background=random&color=fff`,
          role: dbUser.role
        };
      }
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // The Prisma adapter maps role if defined in User model
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
});
