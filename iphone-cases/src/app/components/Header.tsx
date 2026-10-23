"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import Avatar from "./Avatar";

export default function Header() {
  const { cartCount, user } = useStore();
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          CASE<span>ATELIER</span>
        </Link>
        <nav className="nav">
          <Link href="/#collection">Collection</Link>
          <Link href="/cart" className="cart-link">
            Cart
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          {user && (
            <Link href="/profile" title="My profile">
              <Avatar name={user.name} size={38} />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}