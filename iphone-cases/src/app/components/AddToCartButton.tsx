"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function AddToCartButton({ slug, full = false }: { slug: string; full?: boolean }) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  return (
    <button
      className={`btn ${full ? "btn-full" : ""}`}
      onClick={() => {
        addToCart(slug);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}