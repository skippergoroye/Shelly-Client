import Footer from "@/components/landing-page/Footer";
import Navbar from "@/components/landing-page/Navbar";
import { Breadcrumb } from "./_components/Breadcrumb";
import { ProductImages } from "./_components/ProductImages";
import { ProductTabs } from "./_components/ProductTabs";
import { Reviews } from "./_components/Reviews";
import { RelatedProducts } from "./_components/RelatedProducts";
import { ProductDetails } from "./_components/ProductDetails";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = await params;

  return (
    <>
      <Navbar />
      <section className="container-max px-6 md:px-12 mx-auto bg-[color:var(--background)] text-[color:var(--on-surface)]">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: "Apparel", href: "/apparel" },
            { label: "Signature Cashmere Overcoat", href: "#" },
          ]}
        />

        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductImages productId={id} />
            <ProductDetails productId={id} />
          </div>

          <ProductTabs productId={id} />
          <Reviews productId={id} />
          <RelatedProducts productId={id} />
        </section>
      </section>
      <Footer />
    </>
  );
}
