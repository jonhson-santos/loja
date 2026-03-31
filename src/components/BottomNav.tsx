import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { name: 'Início', path: '/', icon: 'home' },
    { name: 'Loja', path: '/shop', icon: 'shopping_bag' },
    { name: 'Favoritos', path: '/favorites', icon: 'favorite' },
    { name: 'Perfil', path: '/profile', icon: 'person' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-[2000] px-6 pb-6 pointer-events-none">
      <div className="bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-xl border border-surface-variant/10 flex justify-around items-center px-2 py-1.5 rounded-[2rem] shadow-2xl shadow-black/10 pointer-events-auto max-w-[320px] mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === '/shop' && location.pathname.startsWith('/category'));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                isActive ? 'text-primary bg-primary/10 scale-105' : 'text-on-surface-variant/40 hover:text-on-surface-variant/80'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {item.icon}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
