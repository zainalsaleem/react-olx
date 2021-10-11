import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Loader from './Components/loader/Loader';
import { AuthContext, FirebaseContext } from './store/Context';



function App() {
  const [load, setLoad] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 1500)
  })

  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
  })
  return (
    <div>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          {
            load == true ? <Loader /> : <Signup />
          }
        </Route>
        <Route path="/login">
          {
            load == true ? <Loader /> : <Login />
          }
        </Route>
      </Router>
    </div>
  );
}

export default App;
