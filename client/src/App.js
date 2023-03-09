import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import CreateBreed from './components/CreateBreed/CreateBreed';
import Details from './components/Details/Details';
import Home from './components/Home/Home';
import Landing from './components/Landig/Landing';
import './style/App.css';

function App() {
  return (
    <Router> 
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/details/:id" element={<Details />} />
        <Route exact path='/home/create' element={<CreateBreed/>} />
        {/* <Route path='*' element={<div>404 Page not found!</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
