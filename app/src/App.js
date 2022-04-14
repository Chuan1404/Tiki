
import { Header, LoginBox } from 'components'
import { Home, NotFound, ProductDetail } from 'pages'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store'
export default function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <LoginBox />
        </BrowserRouter>
      </div>
    </Provider>

  )
}
