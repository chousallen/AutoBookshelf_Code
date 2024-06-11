import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://192.168.23.35:4000", // Replace with your GraphQL server URL
    cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }) => {
    return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;