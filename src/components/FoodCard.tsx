import React from 'react';
import { FoodItem } from '../types';
import { useApp } from '../context/AppContext';
import { Star, Heart, Plus, Minus, Clock, Flame } from 'lucide-react';

interface FoodCardProps {
  food: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const {
    openFoodModal,
    addToCart,
    cart,
    updateCartQuantity,
    toggleFavorite,
    isFavorite,
  } = useApp();

  const isFav = isFavorite(food.id);

  // Check if item is already in cart
  const cartEntries = cart.filter((item) => item.foodItem.id === food.id);
  const totalInCart = cartEntries.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If food has addons, open the modal so user can choose, otherwise add directly
    if (food.availableAddons && food.availableAddons.length > 0) {
      openFoodModal(food);
    } else {
      addToCart(food, 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartEntries.length > 0) {
      updateCartQuantity(cartEntries[0].id, cartEntries[0].quantity + 1);
    } else {
      addToCart(food, 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartEntries.length > 0) {
      updateCartQuantity(cartEntries[0].id, cartEntries[0].quantity - 1);
    }
  };

  return (
    <div
      onClick={() => openFoodModal(food)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200/80 hover:border-orange-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Food Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/20" />

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-1.5 rounded-lg shadow-sm">
          {food.isVeg ? (
            <div className="w-4 h-4 border-2 border-emerald-600 flex items-center justify-center p-0.5 rounded-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
            </div>
          ) : (
            <div className="w-4 h-4 border-2 border-rose-600 flex items-center justify-center p-0.5 rounded-sm">
              <div className="w-2 h-2 rounded-full bg-rose-600" />
            </div>
          )}
        </div>

        {/* Badges: Best Seller / Featured */}
        <div className="absolute top-3 right-12 flex gap-1.5">
          {food.isBestSeller && (
            <span className="bg-amber-500 text-stone-950 font-extrabold text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-full shadow-md">
              Bestseller
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(food.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isFav
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-stone-600 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label="Add to favorites"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-white' : ''}`} />
        </button>

        {/* Bottom image overlay: Prep time and Rating */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md font-medium">
            <Clock className="w-3 h-3 text-amber-300" />
            {food.preparationTime}
          </span>
          <span className="flex items-center gap-1 bg-emerald-600/95 font-bold px-2 py-0.5 rounded-md shadow-xs">
            <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
            {food.rating} <span className="text-[10px] opacity-80">({food.reviewCount})</span>
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-heading font-bold text-base sm:text-lg text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
              {food.name}
            </h3>
          </div>
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
            {food.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-stone-400 block font-medium">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black font-heading text-stone-900">
                ₹{food.price}
              </span>
            </div>
          </div>

          {/* Quick Add or Quantity Selector */}
          <div>
            {totalInCart > 0 ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center bg-orange-600 text-white rounded-xl shadow-sm px-2 py-1 font-bold text-sm"
              >
                <button
                  onClick={handleDecrement}
                  className="p-1 hover:bg-orange-700 rounded-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2.5 text-xs font-black">{totalInCart}</span>
                <button
                  onClick={handleIncrement}
                  className="p-1 hover:bg-orange-700 rounded-lg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleQuickAdd}
                className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm border border-orange-200 hover:border-orange-600 transition-all shadow-xs group/btn active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
