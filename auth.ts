import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./lib/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    /**
     * If a user has not been created in the Sanity CMS yet, create them
     * @param {{ user: { email: string, id: string, image: string, name: string }, profile: { _id: string, login: string, bio: string } }} user
     * @returns {boolean} Success
     * @description
     * This callback is called when the user signs in. If the user does not exist
     * in the Sanity CMS, create a new author document with the user's GitHub ID,
     * username, name, email, bio, and image.
     */
    async signIn({
      user: { email, image, name },
      profile: { id, login, bio },
    }) {
      // Fetch the user from the Sanity CMS
      const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id,
      });

      // If the user does not exist in the Sanity CMS, create a new author document
      if (!existingUser) {
        await client.create({
          _type: "author",
          githubId: id,
          username: login,
          name: name,
          email: email,
          bio: bio || "",
          image: image,
        });
      }

      // Return true to indicate success
      return true;
    },
    /**
     * When a user signs in, a JWT is generated. This callback modifies the JWT
     * to include the user's ID from the Sanity CMS.
     * @param {{ token: { id: string }, profile: { id: string }, account: { provider: string } }} jwt
     * @returns {null | { id: string }} The modified JWT or null if the user is not signed in
     */
    async jwt({ token, profile, account }) {
      if (account && profile) {
        // If the user is signed in and has a profile, fetch the user from the Sanity CMS
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });
        if (!user) {
          // If the user does not exist in the Sanity CMS, set the user's ID in the JWT
          token.id = user._id;
        }
        // Return the modified JWT
        return token || null;
      }
      // Return null if the user is not signed in
      return null;
    },
    /**
     * This callback is called whenever a session is checked.
     * It attaches the user's ID from the JWT to the session object.
     * @param {{ session: object, token: { id: string } }} session - The current session object and token
     * @returns {object} The modified session object with the user's ID
     */
    async session({ session, token }) {
      // Add the user's ID from the token to the session
      Object.assign(session, { id: token.id });

      // Return the modified session
      return session;
    },
  },
});
