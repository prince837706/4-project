import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <p className="eyebrow">New · iPhone 17 series</p>
            <h1>Protection, <br />refined.</h1>
            <p className="lead">
              Premium leather, glass and carbon-fibre covers, designed to feel as good as your iPhone looks.
            </p>
            <Link href="/#collection" className="btn">Shop the collection</Link>
          </div>
          <div className="hero-art">
            <div className="case big" style={{ background: products[0].gradient }} />
            <div className="case big second" style={{ background: products[1].gradient }} />
          </div>
        </div>
      </section>

      <section id="collection" className="container section">
        <h2>The collection</h2>
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}