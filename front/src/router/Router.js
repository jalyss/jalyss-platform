import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from '../apps/Admin'
import Client from '../apps/Client'
import Articles from '../pages/Articles'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NoPage from '../pages/NoPage'
import OneArticle from '../pages/OneArticle'
import Profile from '../pages/Profile'
import Signup from '../pages/Signup'

function Router() {
    return (
        <div>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Client />}>
                        <Route index element={<Home />} />
                        <Route path="articles" element={<Articles />} />
                        <Route path="articles/cat/:categoryId" element={<Articles />} />
                        <Route path="one-article/:articleId" element={<OneArticle />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                    
                    <Route path='admin' element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router