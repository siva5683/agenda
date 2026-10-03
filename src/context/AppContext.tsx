import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  FoodItem,
  FoodCategory,
  CartItem,
  CartAddon,
  Coupon,
  Order,
  OrderStatus,
  UserProfile,
  CustomerReview,
} from '../types';
import {
  INITIAL_FOOD_ITEMS,
  SAMPLE_COUPONS,
  SAMPLE_REVIEWS,
  INITIAL_USER,
  INITIAL_ORDERS,
} from '../data/sampleData';

export type AppPage =
  | 'home'
  | 'menu'
  | 'categories'
  | 'offers'
  | 'about'
  | 'contact'
  | 'checkout'
  | 'order-tracking'
  | 'profile'
  | 'admin'
  | 'ai-studio';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  activePage: AppPage;
  setActivePage: (page: AppPage) => void;
  navigateTo: (page: AppPage, params?: Record<string, any>) => void;
  
  // Food Items
  foodItems: FoodItem[];
  addFoodItem: (item: FoodItem) => void;
  editFoodItem: (item: FoodItem) => void;
  deleteFoodItem: (id: string) => void;
  toggleStockStatus: (id: string) => void;
  
  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: FoodCategory;
  setSelectedCategory: (cat: FoodCategory) => void;
  vegFilter: 'all' | 'veg' | 'non-veg';
  setVegFilter: (f: 'all' | 'veg' | 'non-veg') => void;
  sortBy: 'popular' | 'rating' | 'price-low' | 'price-high';
  setSortBy: (s: 'popular' | 'rating' | 'price-low' | 'price-high') => void;
  
  // Modal Details
  selectedFoodForModal: FoodItem | null;
  openFoodModal: (item: FoodItem) => void;
  closeFoodModal: () => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    food: FoodItem,
    quantity?: number,
    selectedAddons?: CartAddon[],
    specialInstructions?: string
  ) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;

  // Favorites
  favorites: string[];
  toggleFavorite: (foodId: string) => void;
  isFavorite: (foodId: string) => boolean;

  // Auth & Profile
  currentUser: UserProfile | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register' | 'forgot';
  setAuthModalTab: (tab: 'login' | 'register' | 'forgot') => void;
  login: (email: string, name?: string) => void;
  registerUser: (name: string, email: string, phone: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;

  // Orders
  orders: Order[];
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
  placeOrder: (orderPayload: {
    customer: {
      name: string;
      phone: string;
      email: string;
      address: string;
      city: string;
      postalCode: string;
      instructions?: string;
    };
    paymentMethod: 'Cash on Delivery' | 'UPI' | 'Credit/Debit Card';
  }) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  simulateNextOrderStatus: (orderId: string) => void;
  reorder: (orderId: string) => void;

  // Offers
  coupons: Coupon[];
  addCoupon: (c: Coupon) => void;
  deleteCoupon: (code: string) => void;

  // Reviews
  reviews: CustomerReview[];
  addReview: (r: Omit<CustomerReview, 'id' | 'date'>) => void;

  // Toast
  toasts: Toast[];
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<AppPage>('home');

  // Food Items state (with persistence check)
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem('foodhub_menu_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_FOOD_ITEMS;
      }
    }
    return INITIAL_FOOD_ITEMS;
  });

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('All');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-low' | 'price-high'>('popular');

  // Food modal
  const [selectedFoodForModal, setSelectedFoodForModal] = useState<FoodItem | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('foodhub_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('foodhub_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER.favorites;
      }
    }
    return INITIAL_USER.favorites;
  });

  // Auth & User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('foodhub_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER; // Start with logged in demo user for immediate checkout / profile access
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'forgot'>('login');

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('foodhub_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });
  const [activeOrderId, setActiveOrderId] = useState<string | null>('ord-1002');

  // Coupons & Reviews
  const [coupons, setCoupons] = useState<Coupon[]>(SAMPLE_COUPONS);
  const [reviews, setReviews] = useState<CustomerReview[]>(SAMPLE_REVIEWS);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('foodhub_menu_items', JSON.stringify(foodItems));
  }, [foodItems]);

  useEffect(() => {
    localStorage.setItem('foodhub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('foodhub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('foodhub_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('foodhub_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('foodhub_user');
    }
  }, [currentUser]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const navigateTo = (page: AppPage, params?: Record<string, any>) => {
    if (params?.category) {
      setSelectedCategory(params.category);
    }
    if (params?.orderId) {
      setActiveOrderId(params.orderId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openFoodModal = (item: FoodItem) => {
    setSelectedFoodForModal(item);
  };

  const closeFoodModal = () => {
    setSelectedFoodForModal(null);
  };

  // Cart operations
  const addToCart = (
    food: FoodItem,
    quantity = 1,
    selectedAddons: CartAddon[] = [],
    specialInstructions = ''
  ) => {
    // Generate unique key based on item ID and selected addons
    const addonKey = selectedAddons
      .map((a) => a.id)
      .sort()
      .join('-');
    const cartItemId = `${food.id}_${addonKey}`;

    const addonsPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = food.price + addonsPrice;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + quantity;
            return {
              ...item,
              quantity: newQty,
              itemTotal: unitPrice * newQty,
              specialInstructions: specialInstructions || item.specialInstructions,
            };
          }
          return item;
        });
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            foodItem: food,
            quantity,
            selectedAddons,
            specialInstructions,
            itemTotal: unitPrice * quantity,
          },
        ];
      }
    });

    showToast(`Added "${food.name}" to cart! 🛒`, 'success');
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const addonsPrice = item.selectedAddons.reduce((sum, a) => sum + a.price, 0);
          const unitPrice = item.foodItem.price + addonsPrice;
          return {
            ...item,
            quantity: newQty,
            itemTotal: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Delivery fee logic: ₹40 standard, free if subtotal >= 499 or if coupon is free_delivery
  let deliveryFee = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 40;
  if (appliedCoupon && appliedCoupon.discountType === 'free_delivery' && subtotal >= appliedCoupon.minOrder) {
    deliveryFee = 0;
  }

  // Tax calculation (5% restaurant GST)
  const tax = subtotal === 0 ? 0 : Math.round(subtotal * 0.05);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else if (appliedCoupon.discountType === 'flat') {
      discount = appliedCoupon.discountValue;
    } else if (appliedCoupon.discountType === 'free_delivery') {
      discount = 40; // value of delivery fee
    }
  }

  const total = Math.max(0, subtotal + deliveryFee + tax - discount);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!found) {
      return { success: false, message: 'Invalid promo code. Please check and try again.' };
    }

    if (subtotal < found.minOrder) {
      return {
        success: false,
        message: `Add items worth ₹${found.minOrder - subtotal} more to apply code "${found.code}". (Min order: ₹${found.minOrder})`,
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied! You save with this deal. 🎉`, 'success');
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Favorites
  const toggleFavorite = (foodId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(foodId);
      let updated: string[];
      if (exists) {
        updated = prev.filter((id) => id !== foodId);
        showToast('Removed from favorites', 'info');
      } else {
        updated = [...prev, foodId];
        showToast('Added to your favorites ❤️', 'success');
      }
      return updated;
    });
  };

  const isFavorite = (foodId: string) => favorites.includes(foodId);

  // Auth
  const login = (email: string, name = 'Aarav Patel') => {
    const user: UserProfile = {
      id: 'usr-' + Date.now(),
      name: name || 'Aarav Patel',
      email,
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      savedAddresses: INITIAL_USER.savedAddresses,
      favorites,
      rewardPoints: 250,
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${user.name}! 👋`, 'success');
  };

  const registerUser = (name: string, email: string, phone: string) => {
    const user: UserProfile = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      savedAddresses: [
        {
          id: 'addr-new',
          label: 'Home',
          address: 'Indiranagar 12th Main Road',
          city: 'Bengaluru',
          postalCode: '560038',
          isDefault: true,
        },
      ],
      favorites: [],
      rewardPoints: 100, // 100 welcome bonus points
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast(`Account created! You received 100 FoodHub coins 🪙`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!currentUser) return;
    const next = { ...currentUser, ...updated };
    setCurrentUser(next);
    showToast('Profile updated successfully!', 'success');
  };

  // Orders
  const placeOrder = (payload: {
    customer: {
      name: string;
      phone: string;
      email: string;
      address: string;
      city: string;
      postalCode: string;
      instructions?: string;
    };
    paymentMethod: 'Cash on Delivery' | 'UPI' | 'Credit/Debit Card';
  }): Order => {
    const orderNum = `FH-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal,
      deliveryFee,
      tax,
      discount,
      total,
      couponApplied: appliedCoupon?.code,
      customer: payload.customer,
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      orderStatus: 'Order Placed',
      statusHistory: [
        { status: 'Order Placed', timestamp: 'Just now', completed: true },
        { status: 'Order Confirmed', timestamp: 'Pending', completed: false },
        { status: 'Food Being Prepared', timestamp: 'Pending', completed: false },
        { status: 'Out for Delivery', timestamp: 'Pending', completed: false },
        { status: 'Delivered', timestamp: 'Pending', completed: false },
      ],
      estimatedDeliveryTime: '25-30 mins',
      deliveryPartner: {
        name: 'Karthik Raja',
        phone: '+91 99002 11445',
        vehicle: 'Honda Activa 6G (KA-01-JJ-3920)',
        rating: 4.9,
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      },
      driverLocation: {
        latPercent: 35,
        lngPercent: 42,
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    clearCart();
    showToast(`Order ${orderNum} placed successfully! 🚀`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const statusOrder: OrderStatus[] = [
      'Order Placed',
      'Order Confirmed',
      'Food Being Prepared',
      'Out for Delivery',
      'Delivered',
    ];

    const targetIdx = statusOrder.indexOf(newStatus);

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedHistory = ord.statusHistory.map((step) => {
            const stepIdx = statusOrder.indexOf(step.status);
            const isCompleted = stepIdx <= targetIdx;
            return {
              ...step,
              completed: isCompleted,
              timestamp:
                step.status === newStatus
                  ? 'Updated just now'
                  : isCompleted
                  ? step.timestamp === 'Pending'
                    ? 'Completed'
                    : step.timestamp
                  : 'Pending',
            };
          });

          return {
            ...ord,
            orderStatus: newStatus,
            paymentStatus: newStatus === 'Delivered' ? 'Paid' : ord.paymentStatus,
            statusHistory: updatedHistory,
            estimatedDeliveryTime:
              newStatus === 'Delivered'
                ? 'Delivered safely'
                : newStatus === 'Out for Delivery'
                ? '5-10 mins away'
                : '15-20 mins',
          };
        }
        return ord;
      })
    );

    showToast(`Order status updated to: "${newStatus}"`, 'info');
  };

  const simulateNextOrderStatus = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;

    const statusOrder: OrderStatus[] = [
      'Order Placed',
      'Order Confirmed',
      'Food Being Prepared',
      'Out for Delivery',
      'Delivered',
    ];

    const currentIdx = statusOrder.indexOf(target.orderStatus);
    if (currentIdx < statusOrder.length - 1) {
      const nextStatus = statusOrder[currentIdx + 1];
      updateOrderStatus(orderId, nextStatus);
    } else {
      showToast('Order is already marked as Delivered! 🎉', 'info');
    }
  };

  const reorder = (orderId: string) => {
    const oldOrder = orders.find((o) => o.id === orderId);
    if (!oldOrder) return;

    clearCart();
    oldOrder.items.forEach((item) => {
      addToCart(
        item.foodItem,
        item.quantity,
        item.selectedAddons,
        item.specialInstructions
      );
    });

    setIsCartOpen(true);
    showToast('Items from previous order re-added to your cart!', 'success');
  };

  // Food Menu Management
  const addFoodItem = (newItem: FoodItem) => {
    setFoodItems((prev) => [newItem, ...prev]);
    showToast(`"${newItem.name}" added to menu! 🍽️`, 'success');
  };

  const editFoodItem = (updatedItem: FoodItem) => {
    setFoodItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    showToast(`"${updatedItem.name}" updated successfully!`, 'success');
  };

  const deleteFoodItem = (id: string) => {
    const item = foodItems.find((f) => f.id === id);
    setFoodItems((prev) => prev.filter((f) => f.id !== id));
    showToast(`"${item?.name || 'Item'}" removed from menu`, 'info');
  };

  const toggleStockStatus = (id: string) => {
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock: !(item.inStock ?? true) } : item
      )
    );
  };

  // Coupons
  const addCoupon = (c: Coupon) => {
    setCoupons((prev) => [c, ...prev]);
    showToast(`Coupon "${c.code}" created!`, 'success');
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`Coupon "${code}" deleted`, 'info');
  };

  // Reviews
  const addReview = (r: Omit<CustomerReview, 'id' | 'date'>) => {
    const newRev: CustomerReview = {
      ...r,
      id: 'rev-' + Date.now(),
      date: 'Just now',
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you for your rating & review! ⭐', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        navigateTo,

        foodItems,
        addFoodItem,
        editFoodItem,
        deleteFoodItem,
        toggleStockStatus,

        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        vegFilter,
        setVegFilter,
        sortBy,
        setSortBy,

        selectedFoodForModal,
        openFoodModal,
        closeFoodModal,

        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartCount,
        subtotal,
        deliveryFee,
        tax,
        discount,
        total,

        favorites,
        toggleFavorite,
        isFavorite,

        currentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        login,
        registerUser,
        logout,
        updateProfile,

        orders,
        activeOrderId,
        setActiveOrderId,
        placeOrder,
        updateOrderStatus,
        simulateNextOrderStatus,
        reorder,

        coupons,
        addCoupon,
        deleteCoupon,

        reviews,
        addReview,

        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
