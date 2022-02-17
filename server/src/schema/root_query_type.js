const graphql = require('graphql');
const axios = require('axios');
const db = require('../../db');
const { GraphQLJSON } = require('graphql-type-json');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} = graphql;
const GistType = require('./gist_type');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    // this fetches all the gists for a particular user
    gists: {
      type: new GraphQLList(GistType),
      args: { username: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, args) {
        console.log('resolving');
        return axios
          .get(`https://api.github.com/users/${args.username}/gists`)
          .then((res) => {
            console.log(res.data);
            return res.data;
          })
          .catch((error) => console.log(error));
      },
    },
    // this fetches a single gist wiven the gist id as argument
    gist: {
      type: GistType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return axios.get(`https://api.github.com/gists/${id}`).then((res) => {
          console.log(res.data.files);
          return res.data;
        });
      },
    },
    // this fetches all the favorite gists from the database
    favoriteGists: {
      type: GraphQLJSON,
      async resolve() {
        const favRef = db.collection('favoritegists');
        const snapshot = await favRef.get();
        let favorites = {};
        snapshot.docs.forEach((doc) => {
          favorites[doc.id] = doc.data();
        });
        console.log(favorites);
        return favorites;
      },
    },
  }),
});

module.exports = RootQuery;
