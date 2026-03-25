import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { cartCount } = useCart();
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) return null; // Landing page has its own header style

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const dashboardLink = role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard';

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/5 shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center px-6 md:px-10 h-16 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link
          to={dashboardLink}
          className="text-2xl font-black tracking-[0.08em] font-headline text-red-600 hover:text-red-500 transition-colors select-none"
        >
          EVENTLY
        </Link>

        {/* Search bar (events page only) */}
        {location.pathname === '/events' && (
          <div className="flex-1 max-w-md px-8 hidden md:block">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <input
                className="w-full bg-surface-container-lowest border border-neutral-800 focus:border-red-600/60 focus:ring-0 text-xs tracking-widest uppercase py-2.5 pl-10 pr-4 rounded-lg placeholder:text-outline/50 text-on-surface transition-all duration-200 outline-none"
                placeholder="QUERY SYSTEM..."
                type="text"
              />
            </div>
          </div>
        )}

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/events')}
            className={`text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors hidden md:block ${location.pathname === '/events' ? 'text-red-500' : ''
              }`}
          >
            Events
          </button>

          {/* Role-Specific Control */}
          {role === 'ADMIN' ? null : (
            /* Cart button for users */
            <button
              id="cart-nav-btn"
              onClick={() => navigate('/cart')}
              className="relative h-10 w-10 flex items-center justify-center rounded-full bg-surface-container-high border border-outline-variant/20 hover:border-red-600/40 hover:bg-red-900/20 transition-all duration-200 group"
              aria-label="Shopping Cart"
            >
              <span className="material-symbols-outlined text-[22px] text-neutral-400 group-hover:text-red-400 transition-colors">
                shopping_cart
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center animate-fade-in">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Profile avatar / Logout */}
          <button
            onClick={handleLogout}
            className="h-9 w-9 rounded-full bg-surface-container-highest border border-outline-variant/20 overflow-hidden flex items-center justify-center text-neutral-400 hover:border-red-600/40 transition-all duration-200 group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-red-400">logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

