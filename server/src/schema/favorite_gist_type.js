const graphql = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = graphql;

const FavoriteGistType = new GraphQLObjectType({
  name: 'FavoriteGist',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    description: { type: GraphQLString },
    created_at: { type: GraphQLString },
    files: { type: GraphQLJSON },
  }),
});

module.exports = FavoriteGistType;
