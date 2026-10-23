"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";
import { inr } from "@/lib/format";

export default function CartPage() {
  const { ready, cart, changeQty, removeFromCart } = useStore();
  if (!ready) return <div className="container section">Loading…</div>;

  const lines = cart
    .map((i) => ({ ...i, product: products.find((p) => p.slug === i.slug) }))
    .filter((l): l is typeof l & { product: NonNullable<typeof l.product> } => !!l.product);
  const total = lines.reduce((s, l) => s + l.product.price * l.qty, 0);

  if (lines.length === 0)
    return (
      <div className="container section center">
        <h1>Your cart is empty</h1>
        <p className="muted">Find a cover you love.</p>
        <Link href="/#collection" className="btn">Browse collection</Link>
      </div>
    );

  return (
    <div className="container section narrow">
      <h1>Your cart</h1>
      {lines.map((l) => (
        <div key={l.slug} className="cart-line">
          <div className="case thumb" style={{ background: l.product.gradient }} />
          <div className="grow">
            <strong>{l.product.name}</strong>
            <p className="muted small">{l.product.model}</p>
            <button className="link" onClick={() => removeFromCart(l.slug)}>Remove</button>
          </div>
          <div className="qty">
            <button onClick={() => changeQty(l.slug, -1)}>−</button>
            <span>{l.qty}</span>
            <button onClick={() => changeQty(l.slug, 1)}>+</button>
          </div>
          <strong>{inr(l.product.price * l.qty)}</strong>
        </div>
      ))}
      <div className="total">
        <span>Total</span>
        <strong>{inr(total)}</strong>
      </div>
      <Link href="/checkout" className="btn btn-full">Proceed to order</Link>
    </div>
  );
}