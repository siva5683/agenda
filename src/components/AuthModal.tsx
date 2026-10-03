import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, Lock, User, Phone, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    registerUser,
    showToast,
  } = useApp();

  // Form states
  const [email, setEmail] = useState('aarav.patel@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Aarav Patel');
  const [phone, setPhone] = useState('+91 98765 43210');

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }
    login(email, name);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      showToast('Please fill out all registration fields', 'error');
      return;
    }
    registerUser(name, email, phone);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('Please enter your email address', 'error');
      return;
    }
    setForgotSent(true);
    showToast('Reset password link dispatched to ' + forgotEmail, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-b border-orange-100 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 mb-3">
            <User className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-black text-2xl text-stone-900">
            {authModalTab === 'login'
              ? 'Welcome to FoodHub'
              : authModalTab === 'register'
              ? 'Join FoodHub Family'
              : 'Reset Your Password'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {authModalTab === 'login'
              ? 'Log in to track orders, earn rewards, and order your favorite meals'
              : authModalTab === 'register'
              ? 'Sign up in seconds and get 100 bonus FoodHub coins'
              : 'Enter your registered email to receive password reset link'}
          </p>

          {/* Quick tab switcher (only between login and register) */}
          {authModalTab !== 'forgot' && (
            <div className="flex bg-white/80 p-1 rounded-2xl border border-stone-200/80 mt-5">
              <button
                type="button"
                onClick={() => setAuthModalTab('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  authModalTab === 'login'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthModalTab('register')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  authModalTab === 'register'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Create Account
              </button>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7">
          {/* TAB 1: LOGIN */}
          {authModalTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-sm pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthModalTab('forgot')}
                    className="text-xs text-orange-600 font-semibold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-sm pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-500/25 transition-transform active:scale-98"
              >
                Sign In to FoodHub
              </button>

              {/* 1-Click Demo Login */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => login('aarav.patel@example.com', 'Aarav Patel')}
                  className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>One-Click Demo Login (Aarav Patel)</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {authModalTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full text-sm pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@example.com"
                    className="w-full text-sm pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full text-sm pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full text-sm pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-500/25 transition-transform active:scale-98 mt-2"
              >
                Create My Account
              </button>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {authModalTab === 'forgot' && (
            <div className="space-y-4">
              {forgotSent ? (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-black text-lg text-stone-900">
                    Check your inbox
                  </h4>
                  <p className="text-xs text-stone-500">
                    We sent password recovery instructions to <strong>{forgotEmail}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setForgotSent(false);
                      setAuthModalTab('login');
                    }}
                    className="w-full py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl"
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Your Registered Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full text-sm pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-xs"
                  >
                    Send Reset Link
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthModalTab('login')}
                    className="w-full text-center text-xs font-semibold text-stone-600 hover:text-stone-900"
                  >
                    Back to Login
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
