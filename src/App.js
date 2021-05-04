
import React from 'react'
import './App.css';
import './assets/css/style.css';
import AppRouter from './Routes';
import Header from './components/Header'
 class App extends React.Component {
  render(){
  return (
    <React.Fragment>
    <Header/>
    <AppRouter/>
    </React.Fragment>
    
  );
}
}

export default App;

