import React from 'react';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  Award,
  ShieldCheck,
  Heart,
  Truck,
  Users,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-widest text-orange-600 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
          Our Culinary Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-stone-900 tracking-tight">
          Crafting Unforgettable Flavors, Delivered with Care
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Founded in Bengaluru with a passion for authentic regional recipes and contemporary dining, FoodHub connects discerning food lovers with the finest biryanis, sourdough pizzas, tandoori grills, and sweets across India.
        </p>
      </div>

      {/* Image & Mission Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 bg-stone-100">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
            alt="FoodHub Kitchen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="bg-orange-600 text-xs font-black uppercase px-3 py-1 rounded-full">
              FSSAI Hygiene Certified
            </span>
            <h3 className="font-heading font-black text-xl mt-2">
              State-of-the-Art Commercial Kitchens
            </h3>
            <p className="text-xs text-stone-300">Daily sanitizer audits & temperature-monitored prep stations</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-stone-900">
              The FoodHub Philosophy
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We believe great food is a harmony of ancient slow-cooking secrets and modern packaging technology. Our biryanis simmer for hours in sealed handis to let spices infuse every grain, while our sourdough crusts ferment for 36 hours for effortless digestibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
              <h4 className="font-heading font-bold text-sm text-stone-900 mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-orange-600" />
                Pure Ingredients
              </h4>
              <p className="text-xs text-stone-600">
                100% farm-fresh vegetables, pure A2 cow ghee, whole spices, and no artificial coloring.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80">
              <h4 className="font-heading font-bold text-sm text-stone-900 mb-1 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-orange-600" />
                Thermal Hot Bags
              </h4>
              <p className="text-xs text-stone-600">
                Triple-layer insulated thermal carrying units keep meals steaming hot up to 45 minutes.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('menu')}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md transition-transform active:scale-95"
            >
              <span>Taste Our Creations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Leadership & Chef Team */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-stone-900">
            Meet the Masterminds
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Seasoned culinary directors bringing regional recipes alive with artistic perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              name: 'Chef Ranveer Oberoi',
              role: 'Executive Indian Chef',
              bio: '3rd generation Awadhi culinary specialist with 18 years perfecting royal dum biryanis and kebabs.',
              image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
            },
            {
              name: 'Chef Matteo D’Souza',
              role: 'Head of Artisan Pizza & Continental',
              bio: 'Trained in Naples, specializing in wood-fired sourdough fermentation and gourmet hand-stretched pizzas.',
              image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80',
            },
            {
              name: 'Chef Meera Sen',
              role: 'Chief Patissier & Desserts',
              bio: 'Celebrated dessert curator combining saffron cardamom syrups with Belgian chocolate mastery.',
              image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80',
            },
          ].map((chef, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs text-center space-y-3">
              <img
                src={chef.image}
                alt={chef.name}
                className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-orange-400/30"
              />
              <div>
                <h4 className="font-heading font-bold text-base text-stone-900">{chef.name}</h4>
                <p className="text-xs font-semibold text-orange-600">{chef.role}</p>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">{chef.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
