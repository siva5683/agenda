import React from 'react';
import { useApp } from '../context/AppContext';
import { FoodCard } from '../components/FoodCard';
import { FoodCategory } from '../types';
import {
  ArrowRight,
  Flame,
  Star,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  Percent,
  Copy,
  ChevronRight,
  Award,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    navigateTo,
    foodItems,
    setSelectedCategory,
    coupons,
    reviews,
    showToast,
  } = useApp();

  const categories: { name: FoodCategory; label: string; icon: string; image: string }[] = [
    {
      name: 'Indian',
      label: 'Royal Indian',
      icon: '🍛',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Pizza',
      label: 'Artisan Pizza',
      icon: '🍕',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Burgers',
      label: 'Juicy Burgers',
      icon: '🍔',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Chinese',
      label: 'Asian Wok',
      icon: '🥢',
      image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Desserts',
      label: 'Sweet Treats',
      icon: '🍰',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Drinks',
      label: 'Cool Drinks',
      icon: '🥤',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Snacks',
      label: 'Crispy Bites',
      icon: '🍢',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const featuredDishes = foodItems.filter((item) => item.isFeatured).slice(0, 4);
  const bestSellers = foodItems.filter((item) => item.isBestSeller).slice(0, 4);

  const copyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(`Code "${code}" copied to clipboard!`, 'success');
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 bg-radial from-amber-100/40 via-orange-50/30 to-transparent">
        {/* Subtle decorative circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200/80 px-4 py-1.5 rounded-full text-xs font-bold text-orange-800 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-orange-600 animate-ping" />
                <span>Superfast 30-Minute Guaranteed Delivery</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </div>

              {/* Exact required heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-stone-900 tracking-tight leading-[1.1]">
                Delicious Food, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                  Delivered to Your Door
                </span>
              </h1>

              {/* Short description */}
              <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Indulge in royal Awadhi biryanis, authentic stone-baked pizzas, sizzling tandoori delicacies, and divine desserts prepared by master chefs and delivered fresh to your doorsteps.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => navigateTo('menu')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/30 transition-all hover:scale-102 active:scale-98"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateTo('menu')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-800 font-bold text-base px-7 py-4 rounded-2xl border-2 border-stone-200 shadow-xs transition-colors"
                >
                  Explore Menu
                </button>
              </div>

              {/* Trust & Metric highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-heading text-stone-900">
                    45k+
                  </p>
                  <p className="text-xs text-stone-500 font-medium">Happy Foodies</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-heading text-stone-900">
                    25 Mins
                  </p>
                  <p className="text-xs text-stone-500 font-medium">Avg Delivery</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black font-heading text-stone-900 flex items-center gap-1 justify-center lg:justify-start">
                    4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                  </p>
                  <p className="text-xs text-stone-500 font-medium">Food Quality</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Food Montage with Live Floating Cards */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg">
                {/* Main Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-square bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80"
                    alt="Royal Chicken Biryani"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="bg-orange-600 text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                      Chef Special
                    </span>
                    <h3 className="text-xl font-heading font-black mt-1">
                      Royal Hyderabadi Dum Biryani
                    </h3>
                    <p className="text-xs text-stone-300">Served with Burani Raita & Mirchi Salan</p>
                  </div>
                </div>

                {/* Floating Card 1: Fast Delivery */}
                <div className="absolute -top-5 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-200/80 flex items-center gap-3 animate-pulse-subtle">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-stone-900">Live Delivery</p>
                    <p className="text-[11px] text-emerald-600 font-bold">Hot in ~24 mins</p>
                  </div>
                </div>

                {/* Floating Card 2: Popular Dish & Rating */}
                <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-stone-200/80 flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=120&q=80"
                    alt="Paneer Butter Masala"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-stone-900">Paneer Butter Masala</p>
                    <div className="flex items-center gap-1 text-xs font-black text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>4.8 (290+ reviews)</span>
                    </div>
                    <span className="text-xs font-black text-orange-600">₹199</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block mb-1">
              Explore Cuisines
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-stone-900">
              Popular Food Categories
            </h2>
          </div>
          <button
            onClick={() => navigateTo('categories')}
            className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Cards Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                navigateTo('menu');
              }}
              className="group bg-white rounded-2xl p-3 border border-stone-200/80 hover:border-orange-400 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mb-2.5 relative bg-stone-100 shadow-inner">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-1 right-1 text-base">{cat.icon}</span>
              </div>
              <h3 className="font-heading font-bold text-xs sm:text-sm text-stone-800 group-hover:text-orange-600 transition-colors">
                {cat.label}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED DISHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block mb-1">
              Handpicked Delights
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-stone-900 flex items-center gap-2">
              Featured Dishes <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
            </h2>
          </div>
          <button
            onClick={() => navigateTo('menu')}
            className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
          >
            <span>See Full Menu</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      {/* 4. SPECIAL OFFERS & COUPONS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 relative z-10">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block mb-1">
                Pocket Friendly Feasts
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                Special Offers & Promo Codes
              </h2>
            </div>
            <button
              onClick={() => navigateTo('offers')}
              className="text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              <span>Explore All Offers</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {coupons.map((coupon) => (
              <div
                key={coupon.code}
                className="bg-stone-800/80 backdrop-blur-md rounded-2xl p-4 border border-stone-700/80 hover:border-orange-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 px-2.5 py-0.5 rounded-full border border-orange-500/30">
                      {coupon.badge || 'Limited Deal'}
                    </span>
                    <Percent className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-white mb-1">
                    {coupon.title}
                  </h4>
                  <p className="text-xs text-stone-400 line-clamp-2 mb-3">
                    {coupon.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-700/60 flex items-center justify-between">
                  <span className="font-mono font-black text-sm text-amber-400 tracking-wider">
                    {coupon.code}
                  </span>
                  <button
                    onClick={() => copyCoupon(coupon.code)}
                    className="p-1.5 rounded-lg bg-stone-700 hover:bg-orange-600 text-stone-300 hover:text-white transition-colors"
                    title="Copy code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BEST-SELLING ITEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block mb-1">
              Top Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-stone-900 flex items-center gap-2">
              Best-Selling Items <Award className="w-6 h-6 text-amber-500" />
            </h2>
          </div>
          <button
            onClick={() => navigateTo('menu')}
            className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
          >
            <span>View All Bestsellers</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      {/* 6. WHY CHOOSE FOODHUB (USP CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block mb-1">
            Our Promise to You
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-stone-900">
            Why Food Lovers Choose FoodHub
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Every meal is freshly prepared using handpicked ingredients, sealed in temperature-controlled hygiene packaging, and delivered at top speed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Clock,
              title: '30-Minute Express Delivery',
              desc: 'Our intelligent routing ensures your food arrives piping hot and fresh right from the pan.',
              color: 'text-orange-600 bg-orange-50 border-orange-200',
            },
            {
              icon: ShieldCheck,
              title: '100% Hygienic Kitchens',
              desc: 'FSSAI certified commercial hygiene standards with daily temperature & sanitizer checks.',
              color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
            },
            {
              icon: Award,
              title: 'Master Indian Chefs',
              desc: 'Secret family recipes and traditional dum technique honed over decades of culinary mastery.',
              color: 'text-amber-600 bg-amber-50 border-amber-200',
            },
            {
              icon: Sparkles,
              title: 'AI Menu Visualizer',
              desc: 'Dream up custom culinary dishes and visualize them in high definition using our AI Studio.',
              color: 'text-purple-600 bg-purple-50 border-purple-200',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-base text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 block mb-1">
            Real Customer Voices
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-stone-900">
            Loved by Over 45,000+ Foodies
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Read what our food enthusiasts have to say about their dining experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rev.rating) ? 'fill-amber-400' : 'text-stone-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-stone-600 ml-1.5">{rev.rating}</span>
                </div>

                <p className="text-xs text-stone-700 italic leading-relaxed mb-4">
                  "{rev.comment}"
                </p>

                {rev.dishImage && (
                  <div className="mb-4 rounded-xl overflow-hidden aspect-16/9 bg-stone-100">
                    <img
                      src={rev.dishImage}
                      alt={rev.foodName || 'Reviewed dish'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-3">
                <img
                  src={rev.userAvatar}
                  alt={rev.userName}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-orange-400/40"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-stone-900">{rev.userName}</p>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400">
                    Ordered {rev.foodName || 'FoodHub Dish'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
