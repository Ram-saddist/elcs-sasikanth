import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Profile from './pages/Profile';
import Register from './pages/Register';
import AdminAddProduct from './pages/AdminAddProduct';
import Cart from './pages/Cart';
import Footer from './components/Footer'
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="after-nav" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/add-product" element={<AdminAddProduct />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App