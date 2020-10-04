import { readFileSync } from "fs";
import { ApolloServer, gql } from "apollo-server";
import resolvers from "./resolvers";

const typeDefs = readFileSync(`${__dirname}/schema.graphql`, "utf8");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 1234 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
