const db = require('../../db');
const graphql = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');
const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const FavoriteGistType = require('./favorite_gist_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // will mark a gist as a favorite and save it in the database
    markFavorite: {
      type: FavoriteGistType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        created_at: { type: GraphQLString },
        description: { type: GraphQLString },
        files: { type: GraphQLJSON },
      },
      async resolve(parentValue, { id, created_at, files, description }) {
        // add to fav list
        const favoriteRef = db.collection('favoritegists').doc(id);

        const res = await favoriteRef.set(
          {
            id,
            files,
            created_at,
            description,
          },
          { merge: true }
        );

        return res;
      },
    },
    // will delete a favorite gist from the database
    unmarkFavorite: {
      type: FavoriteGistType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parentValue, { id }) {
        // Delete a document
        const res = await db.collection('favoritegists').doc(id).delete();
        return res;
      },
    },
  },
});

module.exports = mutation;
