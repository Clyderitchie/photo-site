import React from 'react';
// import { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Nav from './Components/NavBar/Nav'
import Home from './pages/home';
// import Login from './pages/login.jsx';
// import UserProfile from './pages/user.jsx';
// import Profile from './pages/profile.jsx';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <>
      
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />}/>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App