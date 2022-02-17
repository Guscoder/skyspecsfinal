const graphql = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const GistType = new GraphQLObjectType({
  name: 'GistType',
  fields: () => ({
    id: { type: GraphQLID },
    url: { type: GraphQLString },
    forks_url: { type: GraphQLString },
    commits_url: { type: GraphQLString },
    node_id: { type: GraphQLString },
    created_at: { type: GraphQLString },
    description: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    files: { type: GraphQLJSON },
    // owner: { type: GraphQLObjectType },
  }),
});

module.exports = GistType;
