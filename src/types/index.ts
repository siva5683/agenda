export type FoodCategory =
  | 'All'
  | 'Pizza'
  | 'Burgers'
  | 'Indian'
  | 'Chinese'
  | 'Desserts'
  | 'Drinks'
  | 'Snacks';

export interface FoodAddon {
  id: string;
  name: string;
  price: number;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number; // in ₹ INR
  rating: number; // e.g. 4.8
  reviewCount: number;
  category: 'Pizza' | 'Burgers' | 'Indian' | 'Chinese' | 'Desserts' | 'Drinks' | 'Snacks';
  isVeg: boolean;
  image: string;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  preparationTime: string; // e.g. "20-25 mins"
  ingredients: string[];
  calories?: number;
  spicyLevel?: 1 | 2 | 3; // 1: Mild, 2: Medium, 3: Spicy
  availableAddons?: FoodAddon[];
  inStock?: boolean;
}

export interface CartAddon {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string; // unique cart entry key
  foodItem: FoodItem;
  quantity: number;
  selectedAddons: CartAddon[];
  specialInstructions?: string;
  itemTotal: number;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'flat' | 'free_delivery';
  discountValue: number; // e.g. 20 for 20%, 50 for ₹50
  minOrder: number;
  maxDiscount?: number;
  validUntil: string;
  isFeatured?: boolean;
  badge?: string;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Order Confirmed'
  | 'Food Being Prepared'
  | 'Out for Delivery'
  | 'Delivered';

export interface DeliveryPartner {
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  photoUrl: string;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  instructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  couponApplied?: string;
  customer: OrderCustomer;
  paymentMethod: 'Cash on Delivery' | 'UPI' | 'Credit/Debit Card';
  paymentStatus: 'Paid' | 'Pending';
  orderStatus: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    completed: boolean;
  }[];
  estimatedDeliveryTime: string;
  deliveryPartner: DeliveryPartner;
  driverLocation?: {
    latPercent: number;
    lngPercent: number;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  savedAddresses: {
    id: string;
    label: string; // e.g. 'Home', 'Office'
    address: string;
    city: string;
    postalCode: string;
    isDefault?: boolean;
  }[];
  favorites: string[]; // food item IDs
  rewardPoints: number;
}

export interface CustomerReview {
  id: string;
  foodItemId?: string;
  foodName?: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  dishImage?: string;
}

export interface SalesStat {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  topDishes: { name: string; orders: number; revenue: number }[];
}
