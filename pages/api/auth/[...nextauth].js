import NextAuth from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import User from "../../../models/user";
import connectMongo from "../../../utils/connectMongo";
import { compare } from "bcrypt";
import { redirect } from "next/dist/server/api-utils";

export default NextAuth({
  //Configure JWT
  session: {
    jwt: true,
  },
  //Specify Provider
  providers: [
    credentialsProvider({
      async authorize(credentials) {
        //Connect to DB
        await connectMongo();
        //Get all the users

        //Find user with the email
        const result = await User.findOne({
          email: credentials.email,
        });
        //Not found - send error res
        if (!result) {
          throw new Error("No user found with the email");
        }
        //Check hased password with DB password
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        //Incorrect password - send response
        if (!checkPassword) {
          throw new Error("Password doesnt match");
        }
        //Else send success response

        return { email: result.email, name: result.name };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  database: process.env.MONGO_URI,
  //   callbacks: {
  //     session: async (session, user) => {
  //       session.id = user.id;
  //       return Promise.resolve(session);
  //     },
  //   },
  //   jwt: {
  //     encryption: true,
  //   },
  secret: process.env.JWT_SECRET,
  //   callbacks: {
  //     async jwt(token, account) {
  //       if (account?.accessToken) {
  //         token.accessToken = account.accessToken;
  //       }
  //       return token;
  //     },
  // redirect: async (url, _baseUrl) => {
  //   if (url === "/dashboard") {
  //     return Promise.resolve("/login");
  //   }
  //   return Promise.resolve("/login");
  // },

  //   },
  events: {
    signOut: async (message) => {
      redirect: async () => Promise.resolve("/login");
    },
    signIn: async (message) => {
      //   const session = await getSession();
      if (
        message.account.provider === "facebook" ||
        message.account.provider === "google"
      ) {
        console.log(message.account.provider);
        console.log(message);
        try {
          await connectMongo();
          if (await User.findOne({ email: message.user.email })) {
            return;
          }
          await new User({
            name: message.user.name,
            email: message.user.email,
          }).save();
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  },
});
