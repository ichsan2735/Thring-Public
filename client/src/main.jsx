import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import Auth from './layouts/Auth'
import Unauth from './layouts/Unauth'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'

import { Provider } from "react-redux";
import store from "./store.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>

          <Route element={<Unauth />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>

          <Route element={<Auth />}>

            <Route path='/' element={<Home />} />
            <Route path='/add-post' element={<AddPost />} />
            <Route path='/edit-post/:PostId' element={<EditPost />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
