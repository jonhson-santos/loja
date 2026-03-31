/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import ProductDetails from './components/ProductDetails';
import BrandPage from './components/BrandPage';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import CartPage from './components/CartPage';
import FavoritesPage from './components/FavoritesPage';
import { StoreProvider } from './StoreContext';

function AppContent() {
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/');
  const isBrandPage = location.pathname.includes('/brand/');
  const isAdminPage = location.pathname.startsWith('/admin');
  const isProfilePage = location.pathname.startsWith('/profile');
  const isCartPage = location.pathname === '/cart';
  const isFavoritesPage = location.pathname === '/favorites';

  const hideNavs = isProductPage || isAdminPage || isProfilePage || isCartPage;

  return (
    <div className={`bg-background text-on-background font-body ${hideNavs ? 'pb-0' : 'pb-20'}`}>
      {!hideNavs && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/brand/:brandName" element={<BrandPage />} />
        <Route path="/category/:category/brand/:brandName" element={<BrandPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/shop" element={<CategoryPage isShopAll={true} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
      {!hideNavs && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </StoreProvider>
  );
}


