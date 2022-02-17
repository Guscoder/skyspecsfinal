import React, { useEffect, useState } from 'react';
import ApiClient from '../gistLibrary/apiclient.mjs';

const SingleGist = ({ gist, favoriteList, setFavoriteList }) => {
  const [isFavorite, setFavorite] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  // console.log(gist);

  const checkFavoriteStatus = (id) => {
    // console.log(id);
    console.log(favoriteList[id] ? true : false);
    return favoriteList[id] ? true : false;
  };

  useEffect(() => {
    if (checkFavoriteStatus(gist.id)) setFavorite(true);
  }, []);

  const handleGistClick = () => {
    setShowFiles(true);
    showGistFiles();
  };

  const showGistFiles = () => {
    console.log(Object.keys(gist.files)[0]);
    return <p>{Object.keys(gist.files)[0]}</p>;
  };

  const changeFavoriteStatus = async () => {
    console.log('mark this');
    if (isFavorite) {
      console.log(gist);
      console.log('unmark it');

      await ApiClient.unmarkFavoriteGists(gist.id);
    } else {
      console.log(gist);
      console.log('mark it');

      ApiClient.markFavoriteGists(
        gist.id,
        gist.description,
        gist.created_at,
        gist.files
      );

      setFavoriteList({
        ...favoriteList,
        [gist.id]: {
          id: gist.id,
          description: gist.description,
          created_at: gist.created_at,
          files: gist.files,
        },
      });
    }
    isFavorite ? setFavorite(false) : setFavorite(true);
  };

  return (
    <>
      <tr onClick={handleGistClick}>
        <td>{gist.description}</td>
        <td>{gist.created_at}</td>
        <td onClick={() => changeFavoriteStatus(gist.id)}>
          {isFavorite ? 'YES' : 'NO'}
        </td>
      </tr>
      {showFiles ? (
        <tr>
          <td>Gist Files:</td>
          <td>{showGistFiles}</td>
        </tr>
      ) : (
        ''
      )}
    </>
  );
};

export default SingleGist;
