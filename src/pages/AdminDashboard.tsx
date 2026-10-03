import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FoodItem, FoodCategory, OrderStatus, Coupon } from '../types';
import {
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Tag,
  ArrowRight,
  Eye,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    foodItems,
    addFoodItem,
    editFoodItem,
    deleteFoodItem,
    toggleStockStatus,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    deleteCoupon,
    navigateTo,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'menu' | 'orders' | 'coupons' | 'customers'>('analytics');

  // Food Item Modal state (Add / Edit)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);

  // Form states for Food Item
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(199);
  const [category, setCategory] = useState<FoodCategory>('Indian');
  const [isVeg, setIsVeg] = useState(true);
  const [image, setImage] = useState('');
  const [prepTime, setPrepTime] = useState('20-25 mins');
  const [ingredientsStr, setIngredientsStr] = useState('');

  // Coupon create form state
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDiscountType, setNewDiscountType] = useState<'percentage' | 'flat'>('percentage');
  const [newDiscountValue, setNewDiscountValue] = useState(20);
  const [newMinOrder, setNewMinOrder] = useState(299);
  const [newValidUntil, setNewValidUntil] = useState('31 Dec 2026');

  // Open modal for new item
  const openNewItemModal = () => {
    setEditingItem(null);
    setName('');
    setDescription('');
    setPrice(199);
    setCategory('Indian');
    setIsVeg(true);
    setImage('https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80');
    setPrepTime('20-25 mins');
    setIngredientsStr('Spices, Fresh Herbs, Butter, Cashews');
    setIsItemModalOpen(true);
  };

  // Open modal for editing existing item
  const openEditItemModal = (item: FoodItem) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setCategory(item.category);
    setIsVeg(item.isVeg);
    setImage(item.image);
    setPrepTime(item.preparationTime);
    setIngredientsStr(item.ingredients.join(', '));
    setIsItemModalOpen(true);
  };

  const handleSaveFoodItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const ingredients = ingredientsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingItem) {
      editFoodItem({
        ...editingItem,
        name,
        description,
        price: Number(price),
        category: category as any,
        isVeg,
        image,
        preparationTime: prepTime,
        ingredients,
      });
    } else {
      addFoodItem({
        id: 'dish-' + Date.now(),
        name,
        description,
        price: Number(price),
        rating: 4.8,
        reviewCount: 1,
        category: category as any,
        isVeg,
        image,
        isBestSeller: false,
        isFeatured: false,
        preparationTime: prepTime,
        ingredients,
        inStock: true,
      });
    }

    setIsItemModalOpen(false);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    addCoupon({
      code: newCode.toUpperCase().trim(),
      title: newTitle || `${newDiscountValue}% OFF Special`,
      description: `Save ${newDiscountType === 'percentage' ? `${newDiscountValue}%` : `₹${newDiscountValue}`} on orders above ₹${newMinOrder}`,
      discountType: newDiscountType,
      discountValue: Number(newDiscountValue),
      minOrder: Number(newMinOrder),
      validUntil: newValidUntil,
      badge: 'Admin Special',
    });

    setNewCode('');
    setNewTitle('');
  };

  // Sales statistics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const uniqueCustomers = new Set(orders.map((o) => o.customer.email)).size;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-orange-500/20 text-orange-400 px-2.5 py-0.5 rounded-full border border-orange-500/30">
                Restaurant Administration
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight mt-1">
              FoodHub Control Center
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigateTo('ai-studio')}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-md transition-transform active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Dish Studio</span>
          </button>
          <button
            onClick={openNewItemModal}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-md transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New Dish</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 text-sm font-bold gap-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all shrink-0 ${
            activeTab === 'analytics'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Sales & Analytics</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all shrink-0 ${
            activeTab === 'orders'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Live Orders ({orders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all shrink-0 ${
            activeTab === 'menu'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Menu Catalog ({foodItems.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all shrink-0 ${
            activeTab === 'coupons'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Offers & Coupons ({coupons.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all shrink-0 ${
            activeTab === 'customers'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Customer Records</span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs">
              <span className="text-xs font-bold text-stone-400 block mb-1">Total Revenue</span>
              <p className="text-3xl font-black font-heading text-stone-900">
                ₹{totalRevenue.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18.4% this week
              </p>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs">
              <span className="text-xs font-bold text-stone-400 block mb-1">Total Completed Orders</span>
              <p className="text-3xl font-black font-heading text-stone-900">
                {totalOrders}
              </p>
              <p className="text-[11px] text-stone-500 font-medium mt-2">
                100% fulfill rate
              </p>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs">
              <span className="text-xs font-bold text-stone-400 block mb-1">Avg Order Value (AOV)</span>
              <p className="text-3xl font-black font-heading text-stone-900">
                ₹{avgOrderValue}
              </p>
              <p className="text-[11px] text-emerald-600 font-bold mt-2">
                +₹45 above target
              </p>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs">
              <span className="text-xs font-bold text-stone-400 block mb-1">Active Customers</span>
              <p className="text-3xl font-black font-heading text-stone-900">
                {uniqueCustomers || 1}
              </p>
              <p className="text-[11px] text-stone-500 font-medium mt-2">
                Across Bengaluru & NCR
              </p>
            </div>
          </div>

          {/* Top Selling Dishes Summary */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs">
            <h3 className="font-heading font-black text-lg text-stone-900 mb-4">
              Top Selling Dishes & Kitchen Velocity
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Dish Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Rating</th>
                    <th className="pb-3">Stock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {foodItems.slice(0, 6).map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50">
                      <td className="py-3 font-bold text-stone-900 flex items-center gap-2">
                        <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                        <span>{item.name}</span>
                      </td>
                      <td className="py-3 text-stone-600">{item.category}</td>
                      <td className="py-3 font-bold text-stone-900">₹{item.price}</td>
                      <td className="py-3 text-amber-600 font-bold">★ {item.rating}</td>
                      <td className="py-3">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          In Kitchen Stock
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
            <h3 className="font-heading font-black text-lg text-stone-900 mb-1">
              Active Orders & Real-time Status Dispatcher
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Update an order's status to sync immediately with the user's live order tracking view.
            </p>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-black text-base text-stone-900">
                        #{ord.orderNumber}
                      </span>
                      <span className="text-xs font-bold text-stone-600">
                        {ord.customer.name} ({ord.customer.phone})
                      </span>
                      <span className="text-[11px] font-bold text-orange-600">
                        ₹{ord.total} ({ord.paymentMethod})
                      </span>
                    </div>

                    <p className="text-xs text-stone-500">
                      📍 {ord.customer.address}, {ord.customer.city}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {ord.items.map((it, idx) => (
                        <span
                          key={idx}
                          className="bg-white border text-stone-700 text-[11px] font-semibold px-2 py-0.5 rounded-md"
                        >
                          {it.quantity}x {it.foodItem.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status Change Selector */}
                  <div className="flex items-center gap-2 shrink-0">
                    <label className="text-xs font-bold text-stone-600">Status:</label>
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      aria-label="Order status"
                      className="text-xs font-bold px-3 py-2 bg-white border border-stone-300 rounded-xl shadow-xs cursor-pointer focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Order Placed">1. Order Placed</option>
                      <option value="Order Confirmed">2. Order Confirmed</option>
                      <option value="Food Being Prepared">3. Food Being Prepared</option>
                      <option value="Out for Delivery">4. Out for Delivery</option>
                      <option value="Delivered">5. Delivered</option>
                    </select>

                    <button
                      onClick={() => navigateTo('order-tracking', { orderId: ord.id })}
                      className="p-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl"
                      title="View live tracker"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MENU MANAGEMENT (ADD / EDIT / DELETE) */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-heading font-black text-lg text-stone-900">
              FoodHub Dish Menu Catalog ({foodItems.length} items)
            </h3>
            <button
              onClick={openNewItemModal}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Dish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col justify-between"
              >
                <div className="flex gap-3 mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      <span className="text-xs font-black text-stone-900">₹{item.price}</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-stone-900 truncate mt-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleStockStatus(item.id)}
                    className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                      item.inStock ?? true
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {item.inStock ?? true ? '● In Stock' : '○ Out of Stock'}
                  </button>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => openEditItemModal(item)}
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                      title="Edit dish"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteFoodItem(item.id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      title="Delete dish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: OFFERS & COUPONS */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Create coupon form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-heading font-black text-base text-stone-900">
              Create Promotional Coupon
            </h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MONSOON30"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  className="w-full text-xs font-mono uppercase font-bold p-2.5 border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Campaign Title</label>
                <input
                  type="text"
                  placeholder="e.g. 30% OFF Monsoon Feast"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Type</label>
                  <select
                    value={newDiscountType}
                    onChange={(e) => setNewDiscountType(e.target.value as any)}
                    className="w-full text-xs p-2.5 border rounded-xl"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Value</label>
                  <input
                    type="number"
                    value={newDiscountValue}
                    onChange={(e) => setNewDiscountValue(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Min Order (₹)</label>
                  <input
                    type="number"
                    value={newMinOrder}
                    onChange={(e) => setNewMinOrder(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Valid Until</label>
                  <input
                    type="text"
                    value={newValidUntil}
                    onChange={(e) => setNewValidUntil(e.target.value)}
                    className="w-full text-xs p-2.5 border rounded-xl"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Publish Coupon
              </button>
            </form>
          </div>

          {/* Existing coupons list */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-heading font-black text-base text-stone-900">
              Active Promo Codes ({coupons.length})
            </h3>
            {coupons.map((c) => (
              <div
                key={c.code}
                className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center justify-between shadow-xs"
              >
                <div>
                  <span className="font-mono font-black text-sm text-stone-900 bg-stone-100 px-2.5 py-1 rounded-md">
                    {c.code}
                  </span>
                  <p className="text-xs font-bold text-stone-800 mt-1.5">{c.title}</p>
                  <p className="text-[11px] text-stone-500">
                    Min order ₹{c.minOrder} • Valid until {c.validUntil}
                  </p>
                </div>
                <button
                  onClick={() => deleteCoupon(c.code)}
                  className="p-2 text-stone-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Delete coupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CUSTOMER DIRECTORY */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
          <h3 className="font-heading font-black text-base text-stone-900 mb-4">
            Recent Customer Directory
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase font-bold tracking-wider">
                  <th className="pb-3">Customer Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">City</th>
                  <th className="pb-3">Total Orders</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-stone-50">
                    <td className="py-3 font-bold text-stone-900">{o.customer.name}</td>
                    <td className="py-3 text-stone-600">{o.customer.email}</td>
                    <td className="py-3 text-stone-600">{o.customer.phone}</td>
                    <td className="py-3 text-stone-600">{o.customer.city}</td>
                    <td className="py-3 font-bold text-orange-600">1 Order</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT FOOD ITEM */}
      {isItemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-stone-200 max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="font-heading font-black text-xl text-stone-900">
              {editingItem ? 'Edit Dish Details' : 'Add New Dish to Menu'}
            </h3>

            <form onSubmit={handleSaveFoodItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lucknowi Mutton Biryani"
                  className="w-full text-xs p-3 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Appetizing 1-2 sentence description"
                  className="w-full text-xs p-3 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Price in ₹</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full text-xs p-3 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-xs p-3 border rounded-xl"
                  >
                    <option value="Indian">Indian</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Snacks">Snacks</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Diet Type</label>
                  <select
                    value={isVeg ? 'veg' : 'non-veg'}
                    onChange={(e) => setIsVeg(e.target.value === 'veg')}
                    className="w-full text-xs p-3 border rounded-xl"
                  >
                    <option value="veg">Pure Vegetarian 🟢</option>
                    <option value="non-veg">Non-Vegetarian 🔴</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Prep Time</label>
                  <input
                    type="text"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="20-25 mins"
                    className="w-full text-xs p-3 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs p-3 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Ingredients (comma separated)</label>
                <input
                  type="text"
                  value={ingredientsStr}
                  onChange={(e) => setIngredientsStr(e.target.value)}
                  placeholder="Rice, Spices, Saffron, Ghee"
                  className="w-full text-xs p-3 border rounded-xl"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl"
                >
                  Save to Menu
                </button>
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="py-3 px-5 bg-stone-100 text-stone-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
