import './App.css'
import BooksPage from './pages/BooksPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DonatePage from './pages/DonatePage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';
import Layout from './components/Layout';

function App() {
  return (
    <>
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<BooksPage />} />
            <Route path='/books' element={<BooksPage />} />
            <Route path='/donate/:author/:bookId' element={<DonatePage />}/>
            <Route path='/cart' element={<CartPage />} />
            <Route path='/adminbooks' element={<AdminBooksPage />}/>
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
    </>
  );
}

export default App
