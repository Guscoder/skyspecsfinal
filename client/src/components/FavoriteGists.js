import React, { useEffect } from 'react';
import ApiClient from '../gistLibrary/apiclient.mjs';
import SingleGist from './SingleGist';

const FavoriteGists = ({ favoriteList, setFavoriteList }) => {
  useEffect(() => {
    async function getFavs() {
      const response = await ApiClient.getFavoriteGists();
      console.log(response);
      setFavoriteList(response);
      return response;
    }
    getFavs();
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
          {favoriteList
            ? Object.entries(favoriteList).map((gist) => (
                <SingleGist
                  key={gist[1].id}
                  gist={gist[1]}
                  favoriteList={favoriteList}
                  setFavoriteList={setFavoriteList}
                />
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default FavoriteGists;
