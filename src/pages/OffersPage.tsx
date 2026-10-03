import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Tag,
  Percent,
  Copy,
  Clock,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Gift,
  Flame,
  ArrowRight,
} from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { coupons, applyCoupon, setIsCartOpen, showToast, navigateTo } = useApp();

  const handleApplyAndOpenCart = (code: string) => {
    applyCoupon(code);
    setIsCartOpen(true);
  };

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Code "${code}" copied to clipboard! 📋`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-black/25 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span>FoodHub Savings Fest</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
            Exclusive Deals & Promo Codes
          </h1>
          <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
            Apply these handpicked verified coupon codes during checkout to enjoy massive savings on your biryanis, pizzas, burgers, and sweets!
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-dashed border-stone-300 hover:border-orange-500 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="text-[11px] font-black uppercase tracking-wider bg-orange-100 text-orange-800 px-3 py-1 rounded-full border border-orange-200">
                {coupon.badge || 'Limited Time'}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Valid until: <strong>{coupon.validUntil}</strong></span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2 mb-6">
              <h3 className="font-heading font-black text-2xl text-stone-900 group-hover:text-orange-600 transition-colors">
                {coupon.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {coupon.description}
              </p>
              <div className="text-xs text-stone-400 font-medium">
                Min. Order: ₹{coupon.minOrder}
                {coupon.maxDiscount && ` • Maximum Savings: ₹${coupon.maxDiscount}`}
              </div>
            </div>

            {/* Code Box & Actions */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Code Chip */}
              <div className="flex items-center justify-between sm:justify-start gap-2 bg-stone-100 px-3.5 py-2 rounded-xl border border-stone-200">
                <span className="font-mono font-black text-base tracking-wider text-stone-900">
                  {coupon.code}
                </span>
                <button
                  onClick={() => copyCode(coupon.code)}
                  className="p-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-white transition-colors"
                  title="Copy coupon code"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Apply / Cart Button */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleApplyAndOpenCart(coupon.code)}
                  className="flex-1 sm:flex-initial bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/25 transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Apply to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Terms and FAQ section */}
      <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200">
        <h3 className="font-heading font-black text-lg text-stone-900 mb-3">
          How to Redeem FoodHub Coupons
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-600">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center shrink-0">1</span>
            <span>Browse delicious dishes and add your favorites to the food cart.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center shrink-0">2</span>
            <span>Click the promo code button above or type code directly in your cart slideover.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center shrink-0">3</span>
            <span>Watch your bill total drop instantly and proceed to seamless checkout!</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
