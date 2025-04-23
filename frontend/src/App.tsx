import './App.css';

import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import MainApp from './pages/MainApp';

import Loading from './components/Loading';

import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useEffect, useLayoutEffect } from 'react';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useLayoutEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });

  if (!authUser && isCheckingAuth) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <Loading />
      <Routes>
        <Route path="/" element={authUser ? <MainApp /> : <Welcome />} />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
