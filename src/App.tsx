import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CartSlideover } from './components/CartSlideover';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { OffersPage } from './pages/OffersPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AiStudioPage } from './pages/AiStudioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activePage, toasts } = useApp();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'menu':
        return <MenuPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'offers':
        return <OffersPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'profile':
        return <UserProfilePage />;
      case 'admin':
        return <AdminDashboard />;
      case 'ai-studio':
        return <AiStudioPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-stone-800">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Global Interactive Modals & Slideouts */}
      <FoodDetailModal />
      <CartSlideover />
      <AuthModal />

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-xl border text-xs sm:text-sm font-bold transition-all animate-in slide-in-from-bottom-5 duration-200 ${
              toast.type === 'error'
                ? 'bg-red-900 text-white border-red-800'
                : toast.type === 'info'
                ? 'bg-stone-900 text-white border-stone-800'
                : 'bg-stone-900 text-white border-orange-500/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span className="leading-snug">{toast.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
