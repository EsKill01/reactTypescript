import { ApolloServer} from 'apollo-server-micro'
import { db } from '../../backend/db';
import { typeDefs } from '../../backend/type-defs';
import { resolvers } from '../../backend/resolvers';
import { schema } from '../../backend/schema';




const apolloServer = new ApolloServer({ schema, resolvers, context: {db}});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({path: '/api/graphql'});