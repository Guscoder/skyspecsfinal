import React, { useEffect, useState } from 'react';
import ApiClient from '../gistLibrary/apiclient.mjs';
import SingleGist from './SingleGist';

const SearchResults = ({
  user,
  usergists,
  setUserGists,
  favoriteList,
  setFavoriteList,
}) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getGists(user) {
      const response = await ApiClient.getGists(user);
      console.log(response);
      setUserGists([...response]);
      setLoading(false);
      return response;
    }
    getGists(user);
  }, []);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th scope='col'>Description</th>
            <th scope='col'>Date Created</th>
            <th scope='col'>Favorite?</th>
          </tr>
          {isLoading ? (
            <tr>Data loading...</tr>
          ) : usergists.length > 0 ? (
            usergists.map((gist) => {
              console.log('gist printing');
              return (
                <SingleGist
                  key={gist.gist_id}
                  gist={gist}
                  favoriteList={favoriteList}
                  setFavoriteList={setFavoriteList}
                />
              );
            })
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResults;
