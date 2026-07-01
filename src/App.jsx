import { createBrowserRouter,RouterProvider  } from 'react-router-dom'
import React from 'react'
// import './App.css'
import Home from './components/Home';
import Pastes from './components/Paste';
import ViewPaste from './components/ViewPaste';
import NavBar from './components/NavBar';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <div>
          <NavBar />
          <Home />
        </div>
    },
    {
      path: "/pastes",
      element:
        <div>
          <NavBar />
          <Pastes />
        </div>
    },
    {
      path: "/pastes/:id",
      element:
        <div>
          <NavBar />
          <ViewPaste />
        </div>
    }

  ]
);

const App = () => {
  return  <RouterProvider router={router} />;
 
}

export default App
