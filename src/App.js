import React, {useEffect} from 'react';
import './App.css';
import {
  // Switch, // react-router-dom 버젼 6에선 지원X -> Routes로 적용
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

import firebase from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions/user_action';

//import './firebase'; // 이걸 해줘야 firebase 초기화 index.js로 옮김

function App(props) { 
  //console.log('props',props);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      // if (user) {
      //   navigate("/");
      //   //dispatch(setUser(user));

      //   // User is signed in, see docs for a list of available properties
      //   // https://firebase.google.com/docs/reference/js/firebase.User
      //   //const uid = user.uid;
      //   // ...
      // } else {
      //   navigate("/login");
      //   //dispatch(clearUser());
      //   // User is signed out
      //   // ...
      // }
    });

  }, []);
  
  // if (isLoading) {
  //   return <div>...loading</div>;
  // } else {
    return (
        <Routes> 
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
    );
  //}
}

export default App;
