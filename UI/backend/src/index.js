import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { Query } from "./resolvers/Query.js";
import { Mutation } from "./resolvers/Mutation.js";

// Read type definitions from schema.gql
const typeDefs = readFileSync("./src/schema.gql", "utf8");

// Resolvers
const resolvers = {
    Query,
    Mutation,
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);