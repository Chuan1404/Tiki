
import { Header } from 'components'
import { Home, NotFound } from 'pages'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
