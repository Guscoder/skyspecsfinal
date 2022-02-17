import { request, gql } from 'graphql-request';

const getGists = (username) => {
  const query = gql`
    query getUserGists($username: String!) {
      gists(username: $username) {
        id
        url
        created_at
        description
        files
      }
    }
  `;

  const variables = {
    username: username,
  };
  return request('http://localhost:3010/graphql', query, variables)
    .then((data) => data.gists)
    .catch((error) => console.log(error));
};

const getSingleGist = (gistId) => {
  //gist id '8696de510e0723bb953be577426d937a';
  const query = gql`
    query getSingleGist($id: ID!) {
      gist(id: $id) {
        id
        url
        created_at
        description
        files
      }
    }
  `;

  const variables = {
    gist_id: gistId,
  };
  request('http://localhost:3010/graphql', query, variables)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

const getFavoriteGists = () => {
  const query = gql`
    query getFavorites {
      favoriteGists
    }
  `;

  return request('http://localhost:3010/graphql', query)
    .then((data) => data.favoriteGists)
    .catch((error) => console.log(error));
};

const markFavoriteGists = (id, description = '', created_at, files) => {
  console.log(id, description, created_at, files);
  const mutation = gql`
    mutation markFavorite(
      $id: ID!
      $description: String
      $created_at: String
      $files: JSON
    ) {
      markFavorite(
        id: $id
        description: $description
        created_at: $created_at
        files: $files
      ) {
        id
        description
        created_at
        files
      }
    }
  `;

  const variables = {
    id,
    description,
    created_at,
    files,
  };

  return request('http://localhost:3010/graphql', mutation, variables)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.log(error));
};

const unmarkFavoriteGists = (id) => {
  const mutation = gql`
    mutation unmarkFavorite($id: ID!) {
      unmarkFavorite(id: $id) {
        id
      }
    }
  `;
  const variables = {
    id,
  };

  request('http://localhost:3010/graphql', mutation, variables)
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

const ApiClient = {
  getGists,
  getSingleGist,
  getFavoriteGists,
  markFavoriteGists,
  unmarkFavoriteGists,
};

export default ApiClient;
