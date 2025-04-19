import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://172.16.232.51:4000/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
