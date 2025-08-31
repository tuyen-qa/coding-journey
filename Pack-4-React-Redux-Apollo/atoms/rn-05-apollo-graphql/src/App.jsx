import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
const client = new ApolloClient({ uri:'http://localhost:4000/graphql', cache:new InMemoryCache() });
const HELLO = gql`query{ hello }`;
function Hello(){ const { data,loading }=useQuery(HELLO); if(loading) return <p>Loading...</p>; return <h1>{data.hello}</h1>; }
export default function App(){ return <ApolloProvider client={client}><Hello/></ApolloProvider>; }
