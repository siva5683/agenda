import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Send,
  CheckCircle2,
  ShieldCheck,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    showToast('Subscribed to FoodHub Secret Deals! 📧', 'success');
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Bar */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 sm:p-10 mb-16 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase font-extrabold tracking-widest bg-black/20 px-3 py-1 rounded-full mb-3 inline-block">
              Exclusive Weekly Deals
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight">
              Get ₹150 OFF your next order
            </h3>
            <p className="text-orange-100 text-sm mt-1">
              Subscribe to the FoodHub newsletter for secret recipes, weekend discounts, and early culinary launches.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                <span>You're subscribed! Check your inbox for the ₹150 coupon code.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-4 py-3 rounded-2xl bg-white text-stone-900 placeholder:text-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 min-w-[280px]"
                />
                <button
                  type="submit"
                  className="bg-stone-950 hover:bg-black text-white font-bold px-6 py-3 rounded-2xl transition-transform active:scale-95 text-sm flex items-center justify-center gap-2 shadow-md shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black tracking-tight font-heading text-white">
                Food<span className="text-orange-500">Hub</span>
              </span>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              FoodHub is India’s premier gourmet food delivery network. From royal Awadhi dum biryanis and wood-fired Neapolitan pizzas to crisp dosas and fresh desserts, we deliver happiness straight to your doorstep.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-orange-600 text-stone-400 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#twitter" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-orange-600 text-stone-400 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#facebook" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-orange-600 text-stone-400 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-orange-600 text-stone-400 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-bold text-base mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-orange-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('menu')} className="hover:text-orange-400 transition-colors">
                  Complete Menu
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('categories')} className="hover:text-orange-400 transition-colors">
                  Categories
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('offers')} className="hover:text-orange-400 transition-colors">
                  Offers & Coupons
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('ai-studio')} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-400">✨</span> AI Dish Studio
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-orange-400 transition-colors">
                  About FoodHub
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-orange-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Top Cuisines */}
          <div>
            <h4 className="text-white font-heading font-bold text-base mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              {['Indian', 'Pizza', 'Burgers', 'Chinese', 'Desserts', 'Drinks', 'Snacks'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat as any);
                      navigateTo('menu');
                    }}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {cat} Special
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-heading font-bold text-base mb-4">
              Contact & Support
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>1800-FOODHUB / +91 80 4910 2200</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@foodhub.in</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Open 24/7 • Fast 30 min delivery</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 FoodHub India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 cursor-pointer">FSSAI License #10019022009214</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
