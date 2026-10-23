"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";
import { inr } from "@/lib/format";
import UserForm from "@/components/UserForm";

export default function CheckoutPage() {
  const router = useRouter();
  const { ready, cart, user, saveUser, placeOrder } = useStore();

  if (!ready) return <div className="container section">Loading…</div>;

  if (cart.length === 0)
    return (
      <div className="container section center">
        <h1>Nothing to order</h1>
        <Link href="/#collection" className="btn">Browse collection</Link>
      </div>
    );

  const total = cart.reduce((s, i) => {
    const p = products.find((x) => x.slug === i.slug);
    return s + (p ? p.price * i.qty : 0);
  }, 0);

  return (
    <div className="container section narrow">
      <h1>{user ? "Confirm your order" : "Register to place your order"}</h1>
      <p className="muted">Order total: <strong>{inr(total)}</strong> · Pay on delivery</p>

      {!user ? (
        <div className="panel">
          <UserForm
            submitLabel="Register & place order"
            onSubmit={(u) => {
              saveUser(u);
              placeOrder();
              router.push("/profile");
            }}
          />
        </div>
      ) : (
        <div className="panel">
          <h3>Delivering to</h3>
          <p><strong>{user.name}</strong> · {user.phone}</p>
          <p className="muted">{user.address}, {user.city} - {user.pincode}</p>
          <p className="small"><Link href="/profile" className="link">Wrong details? Edit profile</Link></p>
          <button
            className="btn btn-full"
            onClick={() => {
              placeOrder();
              router.push("/profile");
            }}
          >
            Place order
          </button>
        </div>
      )}
    </div>
  );
}