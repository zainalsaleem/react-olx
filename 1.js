import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/FirebaseContext';
import './Signup.css';

export default function Signup() {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [user, setUser] = useState('')
  const [hasAccount, setHasAccount] = useState(false)
  const { firebase } = useContext(FirebaseContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      result.user.updateProfile({ displayName: username }).then(() => {
        firebase.firestore().collection('users').add({
          id: result.user.uid,
          username: username,
          phone: phone
        }).then(() => {
          history.push('/login')
        })
      })
    }).catch((err) => {
      switch (err.code) {
        case 'auth/invalid-email':
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message)
          break;
        case "auth/wrong-password":
          setPasswordError(err.message)
          break;
      }
    })
  }
  const loginClick = () => {
    history.push('/login')
  }

  const authListner=()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        setUser(user)
      }else{
        setUser("")
      }
    })
  }

  useEffect(() => {
    authListner()
  }, [])
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <button onClick={loginClick}>Login</button>
      </div>
    </div>
  );
}
