import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FoodCard } from '../components/FoodCard';
import { FoodCategory } from '../types';
import {
  Search,
  SlidersHorizontal,
  Flame,
  X,
  Filter,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';

export const MenuPage: React.FC = () => {
  const {
    foodItems,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    vegFilter,
    setVegFilter,
    sortBy,
    setSortBy,
    navigateTo,
  } = useApp();

  const categories: { name: FoodCategory; label: string; icon: string }[] = [
    { name: 'All', label: 'All Items', icon: '🍽️' },
    { name: 'Pizza', label: 'Pizza', icon: '🍕' },
    { name: 'Burgers', label: 'Burgers', icon: '🍔' },
    { name: 'Indian', label: 'Indian', icon: '🍛' },
    { name: 'Chinese', label: 'Chinese', icon: '🥢' },
    { name: 'Desserts', label: 'Desserts', icon: '🍰' },
    { name: 'Drinks', label: 'Drinks', icon: '🥤' },
    { name: 'Snacks', label: 'Snacks', icon: '🍢' },
  ];

  // Filtering & Sorting
  const filteredItems = useMemo(() => {
    return foodItems
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }

        // Veg / Non-Veg filter
        if (vegFilter === 'veg' && !item.isVeg) return false;
        if (vegFilter === 'non-veg' && item.isVeg) return false;

        // Search Query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = item.name.toLowerCase().includes(query);
          const matchDesc = item.description.toLowerCase().includes(query);
          const matchIng = item.ingredients?.some((ing) => ing.toLowerCase().includes(query));
          const matchCat = item.category.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchIng && !matchCat) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'price-low') {
          return a.price - b.price;
        }
        if (sortBy === 'price-high') {
          return b.price - a.price;
        }
        // 'popular' default: best sellers first, then rating
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviewCount - a.reviewCount;
      });
  }, [foodItems, selectedCategory, vegFilter, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs uppercase font-extrabold tracking-widest bg-black/20 px-3 py-1 rounded-full mb-3 inline-block">
            Our Culinary Repertoire
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight mb-2">
            Explore FoodHub Menu
          </h1>
          <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
            Freshly prepared gourmet dishes crafted with authentic spices, slow-dum technique, and love. Order now for lightning-fast doorstep delivery!
          </p>
        </div>
      </div>

      {/* Filter and Search Control Bar */}
      <div className="space-y-4">
        {/* Search Input & Quick Filters Row */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Biryani, Pizza, Paneer, Dosa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-stone-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Secondary Controls: Veg/Non-Veg & Sort */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0">
            {/* Veg / Non-Veg segmented pill */}
            <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200 text-xs font-bold shrink-0">
              <button
                onClick={() => setVegFilter('all')}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  vegFilter === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setVegFilter('veg')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  vegFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-current" />
                Pure Veg
              </button>
              <button
                onClick={() => setVegFilter('non-veg')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  vegFilter === 'non-veg'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-rose-700 hover:bg-rose-50'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-current" />
                Non-Veg
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort food items"
                className="bg-white border border-stone-200 text-stone-700 font-bold text-xs px-3 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs cursor-pointer"
              >
                <option value="popular">Sort: Popular First</option>
                <option value="rating">Sort: Top Rated ★</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Bar (All, Pizza, Burgers, Indian, Chinese, Desserts, Drinks, Snacks) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-md scale-102'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-orange-300 hover:bg-orange-50/50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Active Filters Badges */}
      <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-3">
        <p>
          Showing <strong className="text-stone-900">{filteredItems.length}</strong> items in{' '}
          <strong className="text-orange-600">{selectedCategory}</strong>
        </p>

        {(searchQuery || vegFilter !== 'all' || selectedCategory !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setVegFilter('all');
              setSelectedCategory('All');
            }}
            className="text-orange-600 hover:underline font-bold flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Food Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300 p-8">
          <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-400 mx-auto mb-3">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-heading font-black text-stone-900 mb-1">
            No dishes found matching your search
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
            Try adjusting your search keywords or clear your diet filters to see all delicious choices.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setVegFilter('all');
                setSelectedCategory('All');
              }}
              className="bg-stone-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-stone-800"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => navigateTo('ai-studio')}
              className="bg-orange-50 text-orange-700 font-bold text-xs px-5 py-2.5 rounded-xl border border-orange-200 hover:bg-orange-100 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Generate with AI Studio
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};
