import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';

// Pages

// Component
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import { Cart, CategoryProduct, Home } from './pages';

import ProductSinglePage from './pages/ProductSinglPage/ProductSinglPage';
import SearchPage from './pages/SearchPage/SearchPage';
import store from './store/store';


function App() {


  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <SideBar />
          <div className='container'>
            <Routes>

              <Route path='/' element={<Home />} />

              <Route path='product/:id' element={<ProductSinglePage />} />

              <Route path='category/:category' element={<CategoryProduct />} />
              <Route path='cart' element={<Cart />} />
              <Route path='search/:search' element={<SearchPage />} />




            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
