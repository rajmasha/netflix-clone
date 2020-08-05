import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './components/Home';
import Movie from './components/Movie';
import TV from './components/TV';
import MyList from './components/MyList';
import MovieHome from './components/MovieHome';
import TVHome from './components/TVHome';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/movie/:id">
            <Movie />
          </Route>
          <Route path="/tv/:id">
            <TV />
          </Route>
          <Route path="/mylist">
            <MyList />
          </Route>
          <Route path="/movies">
            <MovieHome />
          </Route>
          <Route path="/tvshows">
            <TVHome />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
