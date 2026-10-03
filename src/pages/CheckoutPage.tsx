import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  QrCode,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    deliveryFee,
    tax,
    discount,
    total,
    appliedCoupon,
    currentUser,
    placeOrder,
    navigateTo,
    showToast,
  } = useApp();

  // Form states
  const defaultAddress = currentUser?.savedAddresses?.find((a) => a.isDefault) || currentUser?.savedAddresses?.[0];

  const [name, setName] = useState(currentUser?.name || 'Aarav Patel');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [email, setEmail] = useState(currentUser?.email || 'aarav.patel@example.com');
  const [address, setAddress] = useState(defaultAddress?.address || 'Flat 402, Sunshine Heights, Indiranagar 100ft Road');
  const [city, setCity] = useState(defaultAddress?.city || 'Bengaluru');
  const [postalCode, setPostalCode] = useState(defaultAddress?.postalCode || '560038');
  const [instructions, setInstructions] = useState('Ring bell and leave at door step');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'UPI' | 'Credit/Debit Card'>('UPI');

  // Card mock state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  // UPI mock state
  const [upiId, setUpiId] = useState('aarav@okaxis');

  // Loading state
  const [isPlacing, setIsPlacing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black font-heading text-stone-900 mb-2">
          Your cart is currently empty
        </h2>
        <p className="text-stone-500 text-sm mb-6">
          Add some delicious food from our menu before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('menu')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md"
        >
          Explore FoodHub Menu
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim() || !city.trim() || !postalCode.trim()) {
      showToast('Please fill in all delivery details', 'error');
      return;
    }

    setIsPlacing(true);

    setTimeout(() => {
      const order = placeOrder({
        customer: {
          name,
          phone,
          email,
          address,
          city,
          postalCode,
          instructions,
        },
        paymentMethod,
      });

      setIsPlacing(false);
      navigateTo('order-tracking', { orderId: order.id });
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-stone-500 text-sm mt-1">
          Review your order and select your preferred payment mode.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery Info & Payment Selection */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Customer & Delivery Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-stone-900">
                  Delivery Details
                </h3>
                <p className="text-xs text-stone-500">Where should we deliver your hot food?</p>
              </div>
            </div>

            {/* Quick saved address chips if user has addresses */}
            {currentUser?.savedAddresses && currentUser.savedAddresses.length > 0 && (
              <div className="flex gap-2 pb-1">
                {currentUser.savedAddresses.map((addr) => (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => {
                      setAddress(addr.address);
                      setCity(addr.city);
                      setPostalCode(addr.postalCode);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      address === addr.address
                        ? 'bg-orange-50 border-orange-500 text-orange-700'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    📍 Use {addr.label}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full text-sm pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Email Address (for Invoice & Live Tracking)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Complete Street Address / Apartment / House No.
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 402, Sunshine Heights, 12th Main Road"
                  className="w-full text-sm px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Postal Code / PIN
                </label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Leave with security guard, don't ring bell..."
                  className="w-full text-sm px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method Selector */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-black text-lg text-stone-900">
                  Select Payment Method
                </h3>
                <p className="text-xs text-stone-500">100% safe & encrypted payments</p>
              </div>
            </div>

            {/* Methods Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'UPI',
                  title: 'Instant UPI',
                  desc: 'GPay, PhonePe, Paytm',
                  icon: QrCode,
                },
                {
                  id: 'Credit/Debit Card',
                  title: 'Credit / Debit',
                  desc: 'Visa, Master, RuPay',
                  icon: CreditCard,
                },
                {
                  id: 'Cash on Delivery',
                  title: 'Cash on Delivery',
                  desc: 'Pay cash at door',
                  icon: Banknote,
                },
              ].map((opt) => {
                const isSelected = paymentMethod === opt.id;
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setPaymentMethod(opt.id as any)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-orange-600 bg-orange-50/60 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-orange-600' : 'text-stone-400'}`} />
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-orange-600 bg-orange-600 text-white'
                            : 'border-stone-300'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900">{opt.title}</p>
                      <p className="text-[11px] text-stone-500">{opt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Method Details Form Area */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">Enter UPI ID / VPA</span>
                  <span className="text-[11px] text-emerald-600 font-bold">Fastest Verification</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okhdfcbank"
                    className="flex-1 text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => showToast('UPI ID verified! ✅', 'success')}
                    className="px-4 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold"
                  >
                    Verify
                  </button>
                </div>
                <div className="flex items-center gap-3 pt-1 text-[11px] text-stone-500">
                  <span>Supported:</span>
                  <span className="font-bold text-stone-700">Google Pay</span>
                  <span className="font-bold text-stone-700">PhonePe</span>
                  <span className="font-bold text-stone-700">Paytm</span>
                  <span className="font-bold text-stone-700">BHIM</span>
                </div>
              </div>
            )}

            {paymentMethod === 'Credit/Debit Card' && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs font-mono px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={4}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'Cash on Delivery' && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Banknote className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Pay cash or UPI directly at your doorstep</p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Our delivery rider will carry a QR code scanner or cash change.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-5 sticky top-28">
            <h3 className="font-heading font-black text-lg text-stone-900 pb-3 border-b border-stone-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-bold text-stone-500">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </h3>

            {/* Items scroll */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold text-orange-600 shrink-0">
                      {item.quantity}x
                    </span>
                    <div className="truncate">
                      <p className="font-bold text-stone-900 truncate">
                        {item.foodItem.name}
                      </p>
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <p className="text-[10px] text-stone-500 truncate">
                          +{item.selectedAddons.map((a) => a.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-stone-800 shrink-0">
                    ₹{item.itemTotal}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="border-t border-stone-100 pt-4 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
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
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="border-t border-stone-200 pt-3 flex justify-between text-lg font-black font-heading text-stone-900">
                <span>Total Payable</span>
                <span className="text-orange-600 font-black">₹{total}</span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isPlacing}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-orange-500/25 transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isPlacing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Confirming Order...</span>
                </div>
              ) : (
                <>
                  <span>Place Order • ₹{total}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-stone-400 text-[11px] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Touchless Delivery Guaranteed</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
