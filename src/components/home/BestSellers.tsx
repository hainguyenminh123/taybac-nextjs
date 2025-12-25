import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { products, formatPrice } from '@/data/products';
import { ArrowRight, Gift } from 'lucide-react';
import { TrongDongWatermark, TrongDongDivider } from '@/components/TrongDongPattern';

export default function BestSellers() {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Top 3 sellers (by price as placeholder for sales data)
  const bestSellers = [...products].sort((a, b) => b.price - a.price).slice(0, 3);

  return (
    <>
      <motion.section 
        ref={ref}
        style={{ opacity }}
        className="section-spacing bg-primary text-primary-foreground overflow-hidden relative"
      >
        {/* Trống Đồng watermark */}
        <TrongDongWatermark opacity={0.06} className="text-primary-foreground" />
        
        <div className="container-fluid-main relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full text-md font-medium mb-6"
              >
                <Gift className="w-4 h-4" />
                Bán chạy nhất
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-heading font-bold mb-4"
              >
                Top sản phẩm được yêu thích
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-primary-foreground/80 mb-8 max-w-md text-md"
              >
                Những đặc sản Tây Bắc được khách hàng lựa chọn nhiều nhất. 
                Chất lượng đã được kiểm chứng qua hàng nghìn đơn hàng.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/san-pham"
                  className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-3 rounded-xl font-medium
                             transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5 group text-md"
                >
                  Xem tất cả sản phẩm
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Products List */}
            <div className="space-y-4">
              {bestSellers.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Link
                    href={`/san-pham/${product.id}`}
                    className="flex items-center gap-4 p-4 bg-primary-foreground/5 rounded-2xl border border-primary-foreground/10
                               transition-all duration-300 hover:bg-primary-foreground/10 hover:-translate-y-1 group"
                  >
                    {/* Rank */}
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-10 h-10 rounded-full bg-earth text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0"
                    >
                      {index + 1}
                    </motion.div>

                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-primary-foreground/10 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-primary-foreground group-hover:text-earth-light transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-md text-primary-foreground/60 line-clamp-1">
                        {product.shortDesc}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-earth-light">{formatPrice(product.price)}</p>
                      <span className="text-sm text-primary-foreground/50">{product.tag}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Section Divider */}
      <TrongDongDivider />
    </>
  );
}
