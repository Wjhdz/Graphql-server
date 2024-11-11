import { ApolloServer, ApolloError } from "apollo-server";
import resolvers from "./src/graphql/resolvers.js";
import typeDefs from "./src/graphql/typeDefs.js";
import connectDB from "./db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: async ({ req }) => {
  //   try {
  //     const auth = req ? req.headers.authorization : null;

  //     if (auth && auth.toLowerCase()) {
  //       const token = auth.substring(7);

  //       const decodedToken = jwt
  //         .verify(token, process.env.JWT_SECRET)
  //         .then(() => {
  //           console.log(" error de credecidal", token, process.env.JWT_SECRET);
  //         });

  //       const currentUser = await User.findById(decodedToken.id);
  //       return { currentUser };
  //     }
  //   } catch (error) {
  //     throw new ApolloError("Invalid token", "AUTHENTICATION_ERROR");
  //   }
  // },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
