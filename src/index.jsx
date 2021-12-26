import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< Updated upstream
=======

import { LoginView } from './components/login-view/login-view';
>>>>>>> Stashed changes
import MainView from './components/main-view/main-view';
import { MovieCard } from './components/movie-card/movie-card';
import { RegistrationView } from "./components/registration-view/registration-view";


// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
      return (
        <MainView/>
      );
    }
  }


// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);