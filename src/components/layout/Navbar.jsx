import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, User, Heart, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { cartCount, openCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Men', path: '/shop/Men' },
    { name: 'Women', path: '/shop/Women' },
    { name: 'Kids', path: '/shop/Kids' },
    { name: 'Beauty', path: '/shop/Beauty' },
    { name: 'Home', path: '/shop/Home' },
  ];

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-[#e42529] text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        Complimentary express shipping on all domestic orders over ₹2000.
      </div>

      <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-black"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link to="/" className="text-3xl font-display font-bold tracking-tighter shrink-0 lg:mr-10 text-center lg:text-left flex-none">
              VASTRA<span className="text-[#e42529]">.</span>
            </Link>
            
            {/* Search Bar - Center */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-xl mx-8 relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for brands, products and more..." 
                className="w-full bg-[#f4f4f4] text-sm text-gray-900 rounded-full pl-5 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#e42529]/20 transition-all"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                <Search size={18} strokeWidth={2} />
              </button>
            </form>

            {/* Desktop Navigation - Hidden on very small screens, shown as menu below search usually, but let's put links here for simplicity */}
            <div className="hidden xl:flex items-center space-x-6 mr-8">
              {navLinks.slice(0, 4).map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className="text-[13px] font-semibold text-gray-600 hover:text-[#e42529] uppercase tracking-wider transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center justify-end space-x-4 lg:space-x-6 shrink-0">
              <button className="text-gray-700 hover:text-black transition-colors lg:hidden">
                <Search size={22} strokeWidth={1.5} />
              </button>
              
              <Link to="/wishlist" className="text-gray-700 hover:text-black transition-colors hidden sm:block relative">
                <Heart size={22} strokeWidth={1.5} />
              </Link>

              {user ? (
                <div className="group relative">
                  <button className="text-gray-700 hover:text-black transition-colors flex items-center justify-center">
                    <User size={22} strokeWidth={1.5} />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-100 mb-2 truncate text-sm font-medium">
                      {user.email.split('@')[0]}
                    </div>
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Manage Products</Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">My Orders</Link>
                    <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Wishlist</Link>
                    <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-sm text-[#e42529] hover:bg-red-50 rounded-lg">Sign Out</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-black transition-colors">
                  <User size={22} strokeWidth={1.5} />
                </Link>
              )}

              <button 
                onClick={openCart} 
                className="text-gray-700 hover:text-black transition-colors relative"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#f5b82e] text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xl font-display font-semibold">VASTRA</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-black">
                <X size={24} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-4">
              <div className="space-y-1">
                {navLinks.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-medium border-b border-gray-50 hover:bg-gray-50"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
