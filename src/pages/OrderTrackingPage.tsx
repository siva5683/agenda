import React from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Truck,
  ChefHat,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  User,
} from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const {
    orders,
    activeOrderId,
    setActiveOrderId,
    simulateNextOrderStatus,
    reorder,
    navigateTo,
  } = useApp();

  // Find active order or fallback to first order
  const currentOrder = orders.find((o) => o.id === activeOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black font-heading text-stone-900 mb-2">
          No orders found yet
        </h2>
        <p className="text-stone-500 text-sm mb-6">
          You haven't placed an order yet. Treat yourself to our delicious dishes!
        </p>
        <button
          onClick={() => navigateTo('menu')}
          className="bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl shadow-md"
        >
          Explore Food Menu
        </button>
      </div>
    );
  }

  const steps: { status: OrderStatus; label: string; icon: any; desc: string }[] = [
    {
      status: 'Order Placed',
      label: 'Order Placed',
      icon: ShoppingBag,
      desc: 'Order received & dispatched to restaurant kitchen',
    },
    {
      status: 'Order Confirmed',
      label: 'Order Confirmed',
      icon: CheckCircle2,
      desc: 'Kitchen has accepted and verified the order',
    },
    {
      status: 'Food Being Prepared',
      label: 'Food Being Prepared',
      icon: ChefHat,
      desc: 'Master chefs are cooking your fresh hot meal',
    },
    {
      status: 'Out for Delivery',
      label: 'Out for Delivery',
      icon: Truck,
      desc: 'Delivery partner has picked up your sealed food package',
    },
    {
      status: 'Delivered',
      label: 'Delivered',
      icon: Sparkles,
      desc: 'Meal delivered safely right at your doorstep. Enjoy!',
    },
  ];

  const statusOrder: OrderStatus[] = [
    'Order Placed',
    'Order Confirmed',
    'Food Being Prepared',
    'Out for Delivery',
    'Delivered',
  ];

  const currentIdx = statusOrder.indexOf(currentOrder.orderStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header with order number and ETA */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600">
              Live Order Tracker
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-stone-900">
            Order #{currentOrder.orderNumber}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Placed on {new Date(currentOrder.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        {/* ETA & Simulation Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-amber-50 border border-amber-200/80 px-4 py-2.5 rounded-2xl">
            <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
              Estimated Delivery
            </p>
            <p className="text-base sm:text-lg font-black font-heading text-amber-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-600" />
              {currentOrder.estimatedDeliveryTime}
            </p>
          </div>

          {/* Interactive Simulation Button for Testing/Evaluation */}
          <button
            onClick={() => simulateNextOrderStatus(currentOrder.id)}
            className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xs transition-colors"
            title="Advance the order status to demonstrate the 5-step progress"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
            <span>Simulate Next Step</span>
          </button>
        </div>
      </div>

      {/* Other Orders Selector pills if multiple orders exist */}
      {orders.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-stone-400 shrink-0">Your Orders:</span>
          {orders.map((ord) => (
            <button
              key={ord.id}
              onClick={() => setActiveOrderId(ord.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                ord.id === currentOrder.id
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              #{ord.orderNumber} • {ord.orderStatus}
            </button>
          ))}
        </div>
      )}

      {/* 2-Column: Left Tracker & Map, Right Delivery Partner & Bill */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 5-Step Visual Progress Indicator & Live Map */}
        <div className="lg:col-span-7 space-y-6">
          {/* Visual Step Tracker */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
            <h3 className="font-heading font-black text-lg text-stone-900 mb-6">
              Order Progress
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-8">
              {/* Connecting vertical line */}
              <div className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-1 bg-stone-200 -translate-x-1/2">
                <div
                  className="bg-gradient-to-b from-orange-500 to-amber-500 w-full transition-all duration-500"
                  style={{
                    height: `${(currentIdx / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {steps.map((step, idx) => {
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;
                const Icon = step.icon;

                return (
                  <div key={step.status} className="relative flex items-start gap-4">
                    {/* Step Icon circle */}
                    <div
                      className={`absolute -left-6 sm:-left-8 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center -translate-x-1/2 transition-colors ring-4 ring-white ${
                        isCurrent
                          ? 'bg-orange-600 text-white shadow-md shadow-orange-500/30 scale-110'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-100 text-stone-400 border border-stone-300'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`font-heading font-black text-sm sm:text-base ${
                            isCurrent
                              ? 'text-orange-600 font-extrabold'
                              : isPassed
                              ? 'text-stone-900'
                              : 'text-stone-400'
                          }`}
                        >
                          {step.label}
                        </h4>
                        {isCurrent && (
                          <span className="text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full">
                            In Progress
                          </span>
                        )}
                        {isPassed && !isCurrent && (
                          <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Done
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simulated Live GPS Map Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-black text-base text-stone-900">
                  Live GPS Rider Location
                </h3>
                <p className="text-xs text-stone-500">Live GPS satellite tracking telemetry</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                GPS Active
              </span>
            </div>

            {/* Simulated Map Canvas */}
            <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900 border border-stone-800">
              {/* Street grid stylized background */}
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    'radial-gradient(#f97316 1px, transparent 1px), radial-gradient(#38bdf8 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                  backgroundPosition: '0 0, 15px 15px',
                }}
              />

              {/* Road lines simulation */}
              <svg className="absolute inset-0 w-full h-full stroke-stone-700/60 stroke-[3] fill-none">
                <path d="M 20 80 Q 150 120 300 90 T 500 160" />
                <path d="M 100 20 L 120 220" />
                <path d="M 250 30 L 260 230" />
                <path d="M 380 20 L 390 240" stroke="#f97316" strokeDasharray="6,6" />
              </svg>

              {/* Restaurant Hub Pin */}
              <div className="absolute top-12 left-16 sm:left-24 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-600/50 mx-auto">
                  <ChefHat className="w-5 h-5" />
                </div>
                <span className="inline-block mt-1 text-[10px] font-black text-white bg-black/70 px-2 py-0.5 rounded-md">
                  FoodHub Kitchen
                </span>
              </div>

              {/* Destination Customer Pin */}
              <div className="absolute bottom-10 right-16 sm:right-24 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/50 mx-auto">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="inline-block mt-1 text-[10px] font-black text-white bg-black/70 px-2 py-0.5 rounded-md">
                  Delivery Address
                </span>
              </div>

              {/* Delivery Rider Pin (Pulsing in Middle) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-all duration-700"
                style={{
                  top: `${currentOrder.driverLocation?.latPercent || 50}%`,
                  left: `${currentOrder.driverLocation?.lngPercent || 50}%`,
                }}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-xl shadow-amber-500/50 animate-bounce">
                    <Truck className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div className="absolute -inset-1 rounded-full border-2 border-amber-400 animate-ping pointer-events-none" />
                </div>
                <span className="inline-block mt-1 text-[10px] font-black text-white bg-amber-600 px-2 py-0.5 rounded-md shadow-md">
                  Rider on the way
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Delivery Partner, Order Items & Invoice */}
        <div className="lg:col-span-5 space-y-6">
          {/* Delivery Partner Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-4">
            <h3 className="font-heading font-black text-base text-stone-900 pb-3 border-b border-stone-100">
              Delivery Hero
            </h3>

            <div className="flex items-center gap-4">
              <img
                src={currentOrder.deliveryPartner.photoUrl}
                alt={currentOrder.deliveryPartner.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-orange-500/30"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-base text-stone-900 truncate">
                    {currentOrder.deliveryPartner.name}
                  </h4>
                  <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                    ★ {currentOrder.deliveryPartner.rating}
                  </span>
                </div>
                <p className="text-xs text-stone-500 truncate">
                  {currentOrder.deliveryPartner.vehicle}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Vaccinated & Temperature Checked</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`tel:${currentOrder.deliveryPartner.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Driver</span>
              </a>
              <button
                type="button"
                onClick={() => alert(`Messaging partner: ${currentOrder.deliveryPartner.name}`)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send Note</span>
              </button>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-3">
            <h3 className="font-heading font-black text-base text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              Delivery Destination
            </h3>
            <div>
              <p className="text-xs font-bold text-stone-900">{currentOrder.customer.name}</p>
              <p className="text-xs text-stone-600 mt-0.5">{currentOrder.customer.address}</p>
              <p className="text-xs text-stone-600">
                {currentOrder.customer.city} - {currentOrder.customer.postalCode}
              </p>
              {currentOrder.customer.instructions && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg mt-2 font-medium">
                  Note: {currentOrder.customer.instructions}
                </p>
              )}
            </div>
          </div>

          {/* Order Items & Total */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-4">
            <h3 className="font-heading font-black text-base text-stone-900 pb-2 border-b border-stone-100">
              Items Ordered
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {currentOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs">
                  <div className="flex gap-2">
                    <span className="font-bold text-orange-600">{item.quantity}x</span>
                    <div>
                      <p className="font-bold text-stone-900">{item.foodItem.name}</p>
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <p className="text-[10px] text-stone-400">
                          +{item.selectedAddons.map((a) => a.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-stone-800">₹{item.itemTotal}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-3 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{currentOrder.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>{currentOrder.deliveryFee === 0 ? 'FREE' : `₹${currentOrder.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & GST (5%)</span>
                <span>₹{currentOrder.tax}</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-₹{currentOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-stone-200 font-heading font-black text-base text-stone-900">
                <span>Total Paid ({currentOrder.paymentMethod})</span>
                <span className="text-orange-600">₹{currentOrder.total}</span>
              </div>
            </div>

            <button
              onClick={() => reorder(currentOrder.id)}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
              <span>Repeat / Reorder This Meal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
