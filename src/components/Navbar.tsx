import React, { useState } from 'react';
import { useApp, AppPage } from '../context/AppContext';
import {
  UtensilsCrossed,
  Search,
  ShoppingBag,
  User,
  Menu as MenuIcon,
  X,
  Sparkles,
  ShieldCheck,
  Percent,
  Layers,
  Heart,
  LogOut,
  MapPin,
  ChevronDown,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    navigateTo,
    cartCount,
    subtotal,
    setIsCartOpen,
    currentUser,
    setIsAuthModalOpen,
    setAuthModalTab,
    logout,
    favorites,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('menu');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks: { label: string; page: AppPage; icon?: any }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Menu', page: 'menu' },
    { label: 'Categories', page: 'categories' },
    { label: 'Offers', page: 'offers' },
    { label: 'AI Dish Studio', page: 'ai-studio', icon: Sparkles },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
        {/* Top delivery notification bar */}
        <div className="bg-stone-900 text-white text-xs py-1.5 px-4 hidden sm:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-medium text-stone-200">
                Delivering hot & fresh across Bengaluru, Mumbai, Delhi NCR & Hyderabad!
              </span>
            </div>
            <div className="flex items-center gap-4 text-stone-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" /> Indiranagar, Bengaluru
              </span>
              <span className="text-orange-400 font-semibold cursor-pointer hover:underline" onClick={() => navigateTo('offers')}>
                Use code FIRST20 for 20% OFF
              </span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigateTo('home')}
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight font-heading text-stone-900 flex items-center gap-0.5">
                  Food<span className="text-orange-600">Hub</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 block -mt-1">
                  Fresh • Fast • Delicious
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((item) => {
                const isActive = activePage === item.page;
                const Icon = item.icon;
                return (
                  <button
                    key={item.page}
                    onClick={() => navigateTo(item.page)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'text-orange-600 bg-orange-50/80 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 text-amber-500" />}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle / Input */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search biryani, pizza, dosa..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-48 sm:w-64 pl-3.5 pr-8 py-2 text-sm bg-stone-100 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-2 text-stone-400 hover:text-stone-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                    title="Search Menu"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Admin Portal Shortcut */}
              <button
                onClick={() => navigateTo('admin')}
                className={`hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors ${
                  activePage === 'admin'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
                title="Admin Control Center"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                Admin
              </button>

              {/* User Auth / Profile Dropdown */}
              <div className="relative">
                {currentUser ? (
                  <div>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-stone-200 hover:border-orange-300 bg-stone-50/70 hover:bg-orange-50/40 transition-colors"
                    >
                      <img
                        src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                        alt={currentUser.name}
                        className="w-7 h-7 rounded-lg object-cover ring-1 ring-orange-400/40"
                      />
                      <span className="text-xs font-bold text-stone-800 hidden md:block max-w-[90px] truncate">
                        {currentUser.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-stone-500 hidden sm:block" />
                    </button>

                    {/* Dropdown Menu */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-4 py-2 border-b border-stone-100">
                          <p className="text-xs text-stone-500">Signed in as</p>
                          <p className="text-sm font-bold text-stone-900 truncate">{currentUser.name}</p>
                          <p className="text-xs text-amber-600 font-semibold mt-0.5">
                            🪙 {currentUser.rewardPoints} FoodHub Coins
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigateTo('profile');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-orange-600 flex items-center gap-2.5"
                        >
                          <User className="w-4 h-4 text-stone-400" />
                          My Profile & Addresses
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('order-tracking');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-orange-600 flex items-center gap-2.5"
                        >
                          <MapPin className="w-4 h-4 text-stone-400" />
                          Track Active Order
                        </button>
                        <button
                          onClick={() => {
                            navigateTo('profile');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-orange-600 flex items-center gap-2.5"
                        >
                          <Heart className="w-4 h-4 text-stone-400" />
                          Favorite Dishes ({favorites.length})
                        </button>
                        <div className="border-t border-stone-100 my-1"></div>
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAuthModalTab('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-xs"
                  >
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                )}
              </div>

              {/* Shopping Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-orange-500/25 transition-transform active:scale-95"
                title="View Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-stone-950 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline-block font-heading">
                  {cartCount > 0 ? `₹${subtotal}` : 'Cart'}
                </span>
              </button>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white/98 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search food, cuisines, dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-stone-100 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </form>

            <div className="grid grid-cols-2 gap-2 pb-2">
              {navLinks.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    navigateTo(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-left ${
                    activePage === item.page
                      ? 'bg-orange-50 text-orange-600 font-bold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  navigateTo('admin');
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-left ${
                  activePage === 'admin'
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-700 bg-stone-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                Admin Dashboard
              </button>
              <button
                onClick={() => {
                  navigateTo('order-tracking');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-left text-orange-700 bg-orange-100/70"
              >
                <MapPin className="w-4 h-4 text-orange-600" />
                Track Order
              </button>
            </div>

            {currentUser ? (
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <div
                  className="flex items-center gap-2.5 cursor-pointer"
                  onClick={() => {
                    navigateTo('profile');
                    setMobileMenuOpen(false);
                  }}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-500">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-red-600 px-3 py-1.5 rounded-lg bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-stone-100">
                <button
                  onClick={() => {
                    setAuthModalTab('login');
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-sm font-bold text-center"
                >
                  Login or Register
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};
