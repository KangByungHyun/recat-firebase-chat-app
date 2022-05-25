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
import {
  setUser 
} from './redux/actions/user_action';

//import './firebase'; // 이걸 해줘야 firebase 초기화 index.js로 옮김

function App(props) { 
  //console.log('props',props);
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading); // redux store에서 user 상태를 가져와서 넣어줌

  console.log('App.js');
  
  useEffect(() => { // 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 Hook
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => { // firebase에서 제공하는 auth 콜백함수
      console.log('onAuthStateChanged user - App.js', user);
      if (user) {
        navigate("/");
        dispatch(setUser(user)); // redux store에 user 상태를 넣어줌
      } else {
        navigate("/login");
        //dispatch(clearUser());
      }
    });

  }, []);
  
  if (isLoading) {
    return <div>...loading</div>;
  } else {
    return (
        <Routes> 
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
    );
  }
}

export default App;
