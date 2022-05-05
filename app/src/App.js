
import { Header, Popup } from 'components'
import { Checkout, Home, NotFound, ProductDetail } from 'pages'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from 'store'
export default function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/product/:slug' element={<ProductDetail />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Popup />
        </BrowserRouter>
      </div>
    </Provider>

  )
}
