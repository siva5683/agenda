import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CartAddon, FoodAddon } from '../types';
import {
  X,
  Star,
  Clock,
  Heart,
  Plus,
  Minus,
  Check,
  Flame,
  Info,
  ShoppingBag,
} from 'lucide-react';

export const FoodDetailModal: React.FC = () => {
  const {
    selectedFoodForModal,
    closeFoodModal,
    addToCart,
    toggleFavorite,
    isFavorite,
    setIsCartOpen,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<CartAddon[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset local state when a new item is opened
  useEffect(() => {
    setQuantity(1);
    setSelectedAddons([]);
    setSpecialInstructions('');
  }, [selectedFoodForModal]);

  if (!selectedFoodForModal) return null;

  const food = selectedFoodForModal;
  const isFav = isFavorite(food.id);

  const toggleAddon = (addon: FoodAddon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const calculatedUnitPrice = food.price + addonsTotal;
  const calculatedTotalPrice = calculatedUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(food, quantity, selectedAddons, specialInstructions);
    closeFoodModal();
  };

  const handleOrderNow = () => {
    addToCart(food, quantity, selectedAddons, specialInstructions);
    closeFoodModal();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-8 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeFoodModal}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-colors shadow-lg"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(food.id)}
          className={`absolute top-4 left-4 z-20 p-2.5 rounded-full backdrop-blur-md transition-colors shadow-lg ${
            isFav
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-stone-700 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label="Toggle favorite"
        >
          <Heart className={`w-5 h-5 ${isFav ? 'fill-white' : ''}`} />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Large Hero Image */}
          <div className="relative h-64 sm:h-80 w-full bg-stone-100 overflow-hidden">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />

            {/* Badges on bottom of image */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="bg-white/90 backdrop-blur-md p-1.5 rounded-lg shadow-sm">
                  {food.isVeg ? (
                    <div className="w-4 h-4 border-2 border-emerald-600 flex items-center justify-center p-0.5 rounded-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 border-2 border-rose-600 flex items-center justify-center p-0.5 rounded-sm">
                      <div className="w-2 h-2 rounded-full bg-rose-600" />
                    </div>
                  )}
                </span>
                <span className="bg-orange-600 font-bold text-xs uppercase px-3 py-1 rounded-full">
                  {food.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1 rounded-xl text-sm font-black shadow-md">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                  {food.rating}
                  <span className="text-xs opacity-80">({food.reviewCount})</span>
                </span>
              </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-stone-900">
                  {food.name}
                </h2>
                <div className="text-right shrink-0">
                  <span className="text-xs text-stone-400 block font-medium">Base Price</span>
                  <span className="text-2xl sm:text-3xl font-black text-orange-600 font-heading">
                    ₹{food.price}
                  </span>
                </div>
              </div>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {food.description}
              </p>
            </div>

            {/* Preparation time & Nutritional info */}
            <div className="flex flex-wrap gap-4 py-3 px-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>Prep: <strong>{food.preparationTime}</strong></span>
              </div>
              {food.calories && (
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Calories: <strong>~{food.calories} kcal</strong></span>
                </div>
              )}
              {food.spicyLevel && (
                <div className="flex items-center gap-1.5">
                  <span className="text-orange-600">🌶️</span>
                  <span>Spice Level: <strong>{food.spicyLevel === 1 ? 'Mild' : food.spicyLevel === 2 ? 'Medium' : 'Hot & Spicy'}</strong></span>
                </div>
              )}
            </div>

            {/* Ingredients */}
            {food.ingredients && food.ingredients.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                  Fresh Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {food.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="bg-stone-100 text-stone-700 text-xs font-semibold px-3 py-1.5 rounded-xl border border-stone-200/70"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {food.availableAddons && food.availableAddons.length > 0 && (
              <div className="border-t border-stone-100 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading font-bold text-stone-900 text-base">
                    Customize with Add-ons
                  </h4>
                  <span className="text-xs text-stone-400">Optional</span>
                </div>
                <div className="space-y-2.5">
                  {food.availableAddons.map((addon) => {
                    const isSelected = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/70 shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                              isSelected
                                ? 'bg-orange-600 border-orange-600 text-white'
                                : 'border-stone-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-sm font-semibold text-stone-800">
                            {addon.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-orange-600">
                          +₹{addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special instructions */}
            <div className="border-t border-stone-100 pt-5">
              <label className="block font-heading font-bold text-stone-900 text-base mb-2">
                Special Cooking Instructions
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Less spicy, extra lemon on the side, no raw onions..."
                rows={2}
                className="w-full text-sm p-3.5 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-stone-50/50"
              />
            </div>
          </div>
        </div>

        {/* Sticky Bottom Actions Bar */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-2xl border border-stone-200 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-heading font-bold text-lg text-stone-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart • ₹{calculatedTotalPrice}</span>
            </button>
            <button
              onClick={handleOrderNow}
              className="hidden sm:inline-flex items-center justify-center bg-stone-900 hover:bg-stone-800 text-white font-bold px-5 py-3.5 rounded-2xl transition-colors shadow-xs"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
