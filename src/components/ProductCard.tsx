import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/store/cart";
import { TrongDongBadge } from "@/components/TrongDongPattern";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/san-pham/${product.id}`} className="group block h-full">
        <div className="card-premium overflow-hidden h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Tag */}
            <div className="absolute top-3 left-3">
              <span className="tag-product text-sm">{product.tag}</span>
            </div>
            {/* Trống Đồng badge */}
            <div className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity">
              <TrongDongBadge />
            </div>
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 p-3 bg-primary text-primary-foreground rounded-xl
                         opacity-0 translate-y-2 transition-all duration-300
                         group-hover:opacity-100 group-hover:translate-y-0
                         hover:bg-forest-light focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Thêm vào giỏ"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 overflow-hidden">
              {product.name}
            </h3>
            <p className="text-md text-muted-foreground mt-1 line-clamp-2">{product.shortDesc}</p>
            <p className="mt-auto font-bold text-primary text-lg">{formatPrice(product.price)}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
