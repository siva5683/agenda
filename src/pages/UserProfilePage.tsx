import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FoodCard } from '../components/FoodCard';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  ShoppingBag,
  Award,
  Edit2,
  Check,
  Plus,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const {
    currentUser,
    updateProfile,
    orders,
    foodItems,
    favorites,
    navigateTo,
    reorder,
    setActiveOrderId,
    setIsAuthModalOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'addresses'>('orders');

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');

  // Add new address state
  const [newLabel, setNewLabel] = useState('Home');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('Bengaluru');
  const [newPostal, setNewPostal] = useState('560038');
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black font-heading text-stone-900 mb-2">
          Please log in to view your profile
        </h2>
        <p className="text-stone-500 text-sm mb-6">
          Access your order history, manage delivery locations, and view saved favorite dishes.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
    });
    setIsEditing(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) return;

    const newAddrObj = {
      id: 'addr-' + Date.now(),
      label: newLabel,
      address: newAddress,
      city: newCity,
      postalCode: newPostal,
      isDefault: false,
    };

    updateProfile({
      savedAddresses: [...(currentUser.savedAddresses || []), newAddrObj],
    });

    setNewAddress('');
    setIsAddingAddress(false);
  };

  const favoriteFoodItems = foodItems.filter((f) => favorites.includes(f.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={
              currentUser.avatar ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
            }
            alt={currentUser.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-orange-500/40 shadow-lg"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
                {currentUser.name}
              </h1>
              <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full">
                Gold Member
              </span>
            </div>
            <p className="text-xs text-stone-400 flex items-center gap-1.5 justify-center sm:justify-start">
              <Mail className="w-3.5 h-3.5 text-orange-400" />
              {currentUser.email}
            </p>
            <p className="text-xs text-stone-400 flex items-center gap-1.5 justify-center sm:justify-start">
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              {currentUser.phone}
            </p>
          </div>
        </div>

        {/* Reward Coins & Edit Profile */}
        <div className="flex items-center gap-4">
          <div className="bg-stone-800/80 border border-stone-700/80 p-4 rounded-2xl text-center">
            <span className="text-xs text-stone-400 block font-semibold">Reward Points</span>
            <span className="text-2xl font-black text-amber-400 font-heading">
              🪙 {currentUser.rewardPoints}
            </span>
          </div>

          <button
            onClick={() => {
              setEditName(currentUser.name);
              setEditEmail(currentUser.email);
              setEditPhone(currentUser.phone);
              setIsEditing(!isEditing);
            }}
            className="p-3 rounded-2xl bg-stone-800 hover:bg-orange-600 text-stone-300 hover:text-white transition-colors"
            title="Edit Profile"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Edit Profile Form if toggled */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4 animate-in slide-in-from-top duration-200">
          <h3 className="font-heading font-black text-base text-stone-900">
            Edit Profile Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1">Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1">Email</label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1">Phone</label>
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-xl"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-stone-100 text-stone-700 text-xs font-bold px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 text-sm font-bold gap-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'orders'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Order History ({orders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'favorites'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Favorites ({favorites.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'addresses'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses ({currentUser.savedAddresses?.length || 0})</span>
        </button>
      </div>

      {/* TAB 1: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-stone-200">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-800">No past orders yet</p>
              <button
                onClick={() => navigateTo('menu')}
                className="mt-3 text-xs font-bold text-orange-600 hover:underline"
              >
                Order your first meal →
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs hover:border-orange-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-black text-base text-stone-900">
                      Order #{ord.orderNumber}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        ord.orderStatus === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500">
                    {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    • {ord.items.length} items • Total: <strong>₹{ord.total}</strong> ({ord.paymentMethod})
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {ord.items.map((i, idx) => (
                      <span
                        key={idx}
                        className="bg-stone-100 text-stone-700 text-xs px-2.5 py-1 rounded-lg"
                      >
                        {i.quantity}x {i.foodItem.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setActiveOrderId(ord.id);
                      navigateTo('order-tracking', { orderId: ord.id });
                    }}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Track Live</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => reorder(ord.id)}
                    className="flex-1 md:flex-initial px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: FAVORITES */}
      {activeTab === 'favorites' && (
        <div>
          {favoriteFoodItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-stone-200">
              <Heart className="w-12 h-12 text-stone-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-800">No favorite dishes saved yet</p>
              <p className="text-xs text-stone-400 mt-1">
                Tap the heart icon on any dish card to keep them saved here!
              </p>
              <button
                onClick={() => navigateTo('menu')}
                className="mt-3 text-xs font-bold text-orange-600 hover:underline"
              >
                Browse Menu →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteFoodItems.map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentUser.savedAddresses?.map((addr) => (
              <div
                key={addr.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-heading font-black text-sm text-stone-900 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold uppercase bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {addr.address}
                  </p>
                  <p className="text-xs text-stone-600 font-semibold mt-1">
                    {addr.city} - {addr.postalCode}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Address Area */}
          {isAddingAddress ? (
            <form onSubmit={handleAddAddress} className="bg-stone-50 rounded-3xl p-6 border border-stone-200 space-y-3">
              <h4 className="font-heading font-bold text-sm text-stone-900">Add New Delivery Location</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Label (e.g. Home, Office, Gym)"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="text-xs p-2.5 bg-white border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="text-xs p-2.5 bg-white border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={newPostal}
                  onChange={(e) => setNewPostal(e.target.value)}
                  className="text-xs p-2.5 bg-white border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Complete Address"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="text-xs p-2.5 bg-white border rounded-xl sm:col-span-3"
                  required
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(false)}
                  className="bg-stone-200 text-stone-700 font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAddingAddress(true)}
              className="flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 border border-orange-200 px-4 py-3 rounded-2xl transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Address</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
