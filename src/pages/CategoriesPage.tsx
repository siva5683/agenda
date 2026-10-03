import React from 'react';
import { useApp } from '../context/AppContext';
import { FoodCategory } from '../types';
import { ArrowRight, Utensils, Sparkles } from 'lucide-react';

interface CategoryCardInfo {
  id: FoodCategory;
  title: string;
  tagline: string;
  description: string;
  image: string;
  popularItems: string[];
}

export const CategoriesPage: React.FC = () => {
  const { setSelectedCategory, navigateTo, foodItems } = useApp();

  const categoryDetails: CategoryCardInfo[] = [
    {
      id: 'Indian',
      title: 'Royal Indian',
      tagline: 'Aromatic Biryanis, Butter Gravies & Tandoori Classics',
      description: 'Slow-cooked Awadhi dum biryanis, velvety paneer butter masala, crispy South Indian dosas, and clay-oven charred tandoori starters.',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
      popularItems: ['Chicken Biryani', 'Paneer Butter Masala', 'Masala Dosa', 'Butter Chicken'],
    },
    {
      id: 'Pizza',
      title: 'Artisan Wood-Fired Pizza',
      tagline: 'Hand-Stretched Sourdough & San Marzano Sauce',
      description: 'Fermented crusts baked at 450°C, fresh buffalo mozzarella, fragrant Genovese basil, and gourmet vegetable toppings.',
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
      popularItems: ['Margherita Pizza', 'Veggie Supreme Pizza', 'Cheese Burst Base'],
    },
    {
      id: 'Burgers',
      title: 'Gourmet Burgers',
      tagline: 'Crispy Patties, Brioche Buns & Secret Sauces',
      description: 'Stacked high with crispy seasoned chicken or veggie crunch patties, sharp cheddar slices, tangy pickles, and house-made aioli.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      popularItems: ['Crispy Chicken Burger', 'Veggie Crunch Burger', 'Peri-Peri Fries'],
    },
    {
      id: 'Chinese',
      title: 'Wok-Tossed Asian Cuisines',
      tagline: 'Sizzling Noodles, Fried Rice & Sichuan Delights',
      description: 'Wok-charred long-grain fried rice, silky Hakka noodles, and fiery chilli cottage cheese prepared with fresh ginger and scallions.',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
      popularItems: ['Chicken Fried Rice', 'Chilli Paneer Dry', 'Veg Manchurian'],
    },
    {
      id: 'Desserts',
      title: 'Divine Desserts & Sweets',
      tagline: 'Warm Gulab Jamuns, Belgian Brownies & Sundaes',
      description: 'Pure indulgence! Velvety milk dumplings in saffron cardamom syrup, gooey warm dark chocolate fudge brownies, and gelato.',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      popularItems: ['Gulab Jamun (Saffron)', 'Chocolate Brownie', 'Vanilla Ice Cream Float'],
    },
    {
      id: 'Drinks',
      title: 'Refreshing Coolers & Lassis',
      tagline: 'Alphonso Mango Lassi, Fresh Lime Soda & Shakes',
      description: 'Beat the heat with thick chilled yogurt mango smoothies, fizzy Himalayan rock salt lime sodas, and fresh fruit blends.',
      image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
      popularItems: ['Royal Alphonso Mango Lassi', 'Fresh Lime Soda', 'Mint Coolers'],
    },
    {
      id: 'Snacks',
      title: 'Crispy Starters & Tandoori',
      tagline: 'Paneer Tikka, Bhatures & Crunchy Appetizers',
      description: 'Perfect for quick cravings and family sharing. Clay oven charred paneer skewers, golden fried street snacks and chutneys.',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      popularItems: ['Paneer Tikka Tandoori', 'Chole Bhature', 'Mint Yogurt Chutney'],
    },
  ];

  const handleSelectCategory = (cat: FoodCategory) => {
    setSelectedCategory(cat);
    navigateTo('menu');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600">
          Curated Food Collections
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-stone-900 tracking-tight">
          Explore by Food Category
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          From hearty Indian curries to sizzling wood-fired pizzas, browse through our specialized kitchen sections.
        </p>
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryDetails.map((cat) => {
          const count = foodItems.filter((i) => i.category === cat.id).length;
          return (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 hover:border-orange-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm">
                  {count} dishes
                </div>
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="font-heading font-black text-2xl tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-orange-300 font-semibold line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-stone-600 leading-relaxed">
                  {cat.description}
                </p>

                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                    Popular Items
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.popularItems.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-stone-100 text-stone-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-orange-600 font-bold text-xs group-hover:text-orange-700">
                  <span>Browse {cat.title} Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
