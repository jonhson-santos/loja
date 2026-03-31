import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../StoreContext';

export default function Navbar() {
  const location = useLocation();
  const { user } = useStore();

  const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Loja', path: '/shop' },
  ];

  const cartCount = user.cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-100">
      <div className="flex justify-between items-center px-4 md:px-6 py-2 md:py-3 w-full max-w-7xl mx-auto relative">
        <div className="flex items-center gap-2 md:gap-3 w-1/3">
          <button className="p-1 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-xl md:text-2xl">menu</span>
          </button>
          <h1 className="font-headline font-black text-lg md:text-xl tracking-tight text-primary">NUTRILAB</h1>
        </div>
        
        {/* Centered Navigation */}
        <nav className="hidden md:flex gap-8 items-center justify-center w-1/3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/shop' && location.pathname.startsWith('/category'));
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`text-[14px] transition-colors ${
                  isActive 
                    ? 'text-primary font-bold' 
                    : 'text-on-surface-variant font-medium hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-3 md:gap-4 w-1/3">
          <Link to="/favorites" className="relative p-1.5 rounded-full hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-xl md:text-2xl">favorite</span>
            {user.favorites.length > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {user.favorites.length}
              </span>
            )}
          </Link>
          
          <Link to="/cart" className="relative p-1.5 rounded-full hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-xl md:text-2xl">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/profile" className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-surface-container-high overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all flex-shrink-0">
            <img src={user.avatar} alt="User Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </Link>
        </div>
      </div>
    </header>
  );
}
