import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Percent,
} from 'lucide-react';

export const CartSlideover: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    coupons,
    navigateTo,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code.trim()) return;

    setCouponError('');
    const result = applyCoupon(code);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-black text-lg text-stone-900">
                  Your Food Basket
                </h2>
                <p className="text-xs text-stone-500 font-medium">
                  {cart.length === 0
                    ? 'Empty'
                    : `${cart.reduce((sum, item) => sum + item.quantity, 0)} items selected`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-stone-500 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors mr-1"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-400 mb-4 animate-bounce">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="font-heading font-black text-xl text-stone-900 mb-2">
                  Your cart is hungry!
                </h3>
                <p className="text-stone-500 text-sm max-w-xs mb-6">
                  Explore our menu of royal biryanis, crispy pizzas, tandoori starters and desserts.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('menu');
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md shadow-orange-500/25 transition-transform active:scale-95 text-sm"
                >
                  Explore FoodHub Menu
                </button>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3.5 rounded-2xl border border-stone-200/90 bg-white hover:border-orange-200 transition-all shadow-xs"
                    >
                      <img
                        src={item.foodItem.image}
                        alt={item.foodItem.name}
                        className="w-18 h-18 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="shrink-0">
                                {item.foodItem.isVeg ? (
                                  <div className="w-3 h-3 border border-emerald-600 flex items-center justify-center p-0.5 rounded-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                  </div>
                                ) : (
                                  <div className="w-3 h-3 border border-rose-600 flex items-center justify-center p-0.5 rounded-xs">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                                  </div>
                                )}
                              </span>
                              <h4 className="font-heading font-bold text-sm text-stone-900 truncate">
                                {item.foodItem.name}
                              </h4>
                            </div>
                            {item.selectedAddons && item.selectedAddons.length > 0 && (
                              <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                                + {item.selectedAddons.map((a) => a.name).join(', ')}
                              </p>
                            )}
                            {item.specialInstructions && (
                              <p className="text-[10px] text-amber-700 italic mt-0.5 truncate">
                                Note: {item.specialInstructions}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-300 hover:text-red-500 p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price and Quantity Stepper */}
                        <div className="flex items-center justify-between mt-2 pt-1">
                          <span className="font-heading font-black text-stone-900 text-sm">
                            ₹{item.itemTotal}
                          </span>
                          <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-md bg-white hover:bg-stone-200 text-stone-700 shadow-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-black w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-md bg-white hover:bg-stone-200 text-stone-700 shadow-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Free Delivery Progress */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                  {subtotal >= 499 || (appliedCoupon && appliedCoupon.discountType === 'free_delivery') ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Hurray! Free delivery unlocked for this order. 🎉</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1.5">
                        <span>Free Delivery Goal</span>
                        <span className="text-orange-600 font-bold">
                          Add ₹{499 - subtotal} more
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Coupon Section */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-orange-500" />
                      Apply Promo Code
                    </span>
                    {appliedCoupon && (
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-600 font-bold hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {appliedCoupon ? (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <p className="text-xs font-black text-emerald-900">
                            '{appliedCoupon.code}' Applied
                          </p>
                          <p className="text-[11px] text-emerald-700">
                            You saved ₹{discount} with this promo!
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value.toUpperCase());
                            setCouponError('');
                          }}
                          placeholder="Enter code (e.g. FIRST20)"
                          className="flex-1 text-xs uppercase px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold"
                        />
                        <button
                          onClick={() => handleApplyCoupon()}
                          className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {couponError}
                        </p>
                      )}

                      {/* Quick Available Promo Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {coupons.slice(0, 3).map((cp) => (
                          <button
                            key={cp.code}
                            onClick={() => handleApplyCoupon(cp.code)}
                            className="text-[10px] font-bold px-2 py-1 rounded-lg bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 transition-colors flex items-center gap-1"
                          >
                            <Percent className="w-2.5 h-2.5" />
                            {cp.code}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="border-t border-stone-100 pt-4 space-y-2 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Item Subtotal</span>
                    <span className="font-semibold text-stone-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Restaurant GST (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="border-t border-stone-200 pt-2 flex justify-between text-base font-black font-heading text-stone-900">
                    <span>To Pay</span>
                    <span className="text-orange-600 text-lg">₹{total}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Checkout Footer Button */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50">
              <button
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-between bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold p-4 rounded-2xl shadow-lg shadow-orange-500/25 transition-transform active:scale-98"
              >
                <div className="text-left">
                  <span className="text-xs uppercase tracking-wider block opacity-90">
                    Total Amount
                  </span>
                  <span className="text-lg font-black font-heading">₹{total}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black">Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
