import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { inr } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <div className="container section detail">
      <div className="case huge" style={{ background: product.gradient }} />
      <div>
        <Link href="/#collection" className="muted small">← Back to collection</Link>
        <p className="eyebrow">{product.model}</p>
        <h1>{product.name}</h1>
        <p className="price">{inr(product.price)}</p>
        <p className="lead">{product.description}</p>
        <ul className="specs">
          <li>Material: {product.material}</li>
          <li>Precise cutouts for camera and buttons</li>
          <li>Drop protection up to 2 metres</li>
          <li>7-day easy returns</li>
        </ul>
        <AddToCartButton slug={product.slug} full />
      </div>
    </div>
  );
}