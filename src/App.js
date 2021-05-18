import React from 'react';

import MainView from './components/navigationpane/MainView';
import MainHeader from "./components/UI/MainHeader";

const App = props => {
  return (
      <React.Fragment>
        <MainHeader/>
        <MainView />
      </React.Fragment>);
};

export default App;
