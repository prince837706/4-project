export interface Product {
  slug: string;
  name: string;
  model: string;
  material: string;
  price: number;
  description: string;
  gradient: string;
}

export interface User {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  pincode: string;
}

export interface CartItem {
  slug: string;
  qty: number;
}

export interface OrderLine {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderLine[];
  total: number;
  date: string;
}