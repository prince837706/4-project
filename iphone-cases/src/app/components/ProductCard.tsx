import Link from "next/link";
import { Product } from "@/types";
import { inr } from "@/lib/format";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      <Link href={`/products/${product.slug}`}>
        <div className="case" style={{ background: product.gradient }} />
      </Link>
      <div className="card-body">
        <p className="muted small">{product.model}</p>
        <h3>{product.name}</h3>
        <p className="muted small">{product.material}</p>
        <div className="card-foot">
          <strong>{inr(product.price)}</strong>
          <AddToCartButton slug={product.slug} />
        </div>
      </div>
    </div>
  );
}