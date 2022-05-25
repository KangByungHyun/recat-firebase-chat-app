import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; // 더이상 안씀. 
//import {legacy_createStore as createStore, applyMiddleware} from 'redux';

//import { applyMiddleware } from 'redux';
//import { configureStore } from 'redux-toolkit';

import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './redux/reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import {   BrowserRouter as Router } from 'react-router-dom';
//import './firebase'; // 이걸 해줘야 firebase 초기화

const root = ReactDOM.createRoot(document.getElementById('root'));
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore); 
// applyMiddleware(promiseMiddleware, ReduxThunk)가 함수를 return => 그 함수 (configureStore)

console.log('index.js');

root.render(
  //<React.StrictMode> // 애플리케이션 내의 잠재적인 문제를 알아내기 위한 도구 - 콘솔 두번찍힘
  // Provider는 App이 Redux.store에 접근할 수 있도록 해주는 컴포넌트
    <Provider store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__&&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
    <Router>  
      <App />
    </Router>
    </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
