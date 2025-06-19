import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
});

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default {
    install: (app: any) => {
        app.provide(DefaultApolloClient, apolloClient);
    },
};
