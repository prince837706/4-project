"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { CartItem, Order, User } from "@/types";
import { products } from "@/data/products";

interface StoreValue {
  ready: boolean;
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  cartCount: number;
  addToCart: (slug: string) => void;
  changeQty: (slug: string, delta: number) => void;
  removeFromCart: (slug: string) => void;
  saveUser: (u: User) => void;
  placeOrder: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);
const KEY = "iphone-cases-store";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
          const d = JSON.parse(raw);
          setCart(d.cart ?? []);
          setUser(d.user ?? null);
          setOrders(d.orders ?? []);
        }
      } catch {}
      setReady(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ cart, user, orders }));
    } catch {}
  }, [cart, user, orders, ready]);

  const addToCart = (slug: string) =>
    setCart((c) =>
      c.some((i) => i.slug === slug)
        ? c.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i))
        : [...c, { slug, qty: 1 }]
    );

  const changeQty = (slug: string, delta: number) =>
    setCart((c) =>
      c
        .map((i) => (i.slug === slug ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );

  const removeFromCart = (slug: string) => setCart((c) => c.filter((i) => i.slug !== slug));

  const saveUser = (u: User) => setUser(u);

  const placeOrder = () => {
    const items = cart
      .map((i) => {
        const p = products.find((x) => x.slug === i.slug);
        return p ? { name: `${p.name} (${p.model})`, qty: i.qty, price: p.price } : null;
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
    if (items.length === 0) return;
    const order: Order = {
      id: "ORD-" + Date.now().toString().slice(-8),
      items,
      total: items.reduce((s, i) => s + i.price * i.qty, 0),
      date: new Date().toISOString(),
    };
    setOrders((o) => [order, ...o]);
    setCart([]);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <StoreContext.Provider
      value={{ ready, cart, user, orders, cartCount, addToCart, changeQty, removeFromCart, saveUser, placeOrder }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}