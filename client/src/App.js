import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import FavoriteGists from './components/FavoriteGists';
import SingleGist from './components/SingleGist';
import Navbar from './components/Navbar';
import ApiClient from './gistLibrary/apiclient.mjs';

const App = () => {
  const [currentuser, setCurrentUser] = useState('hi');
  const [usergists, setUserGists] = useState([]);
  const [favoriteList, setFavoriteList] = useState({});

  // get favorites from database on render
  useEffect(() => {
    async function getFavorites() {
      const response = await ApiClient.getFavoriteGists();
      console.log('gettig favorites');
      console.log(response);
      setFavoriteList(response);
    }
    getFavorites();
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div>
          <Switch>
            <Route path='/' exact>
              <SearchBar user={currentuser} setCurrentUser={setCurrentUser} />
            </Route>
            <Route path='/gists' exact>
              <SearchResults
                user={currentuser}
                usergists={usergists}
                setUserGists={setUserGists}
                favoriteList={favoriteList}
                setFavoriteList={setFavoriteList}
              />
            </Route>
            <Route path='/gists/favorites' exact>
              <FavoriteGists
                favoriteList={favoriteList}
                setFavoriteList={setFavoriteList}
              />
            </Route>
            <Route path='/gists/:id' exact>
              <SingleGist
                favoriteList={favoriteList}
                setFavoriteList={setFavoriteList}
              />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
