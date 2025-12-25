import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Package, Truck, RefreshCw } from 'lucide-react';
import { TrongDongWatermark, TrongDongDivider } from '@/components/TrongDongPattern';

const features = [
  {
    icon: Leaf,
    title: 'Nguồn gốc rõ ràng',
    description: 'Chọn lọc trực tiếp từ hộ dân, HTX vùng cao Tây Bắc. 100% tự nhiên, không chất bảo quản.',
  },
  {
    icon: Package,
    title: 'Đóng gói sạch',
    description: 'Bao bì an toàn, hút chân không, giữ trọn hương vị. Thông tin sản phẩm minh bạch.',
  },
  {
    icon: Truck,
    title: 'Giao nhanh toàn quốc',
    description: 'Ship COD mọi miền. Đơn từ 500k miễn phí ship. Đóng gói cẩn thận, giao tận tay.',
  },
  {
    icon: RefreshCw,
    title: 'Đổi trả dễ dàng',
    description: 'Đổi trả trong 7 ngày nếu sản phẩm lỗi. Hoàn tiền 100% nếu không hài lòng.',
  },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <>
      <motion.section 
        ref={ref}
        style={{ opacity, scale }}
        className="section-spacing bg-secondary/50 relative overflow-hidden"
      >
        {/* Trống Đồng watermark */}
        <TrongDongWatermark opacity={0.03} className="text-primary" />
        
        <div className="container-fluid-main relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg font-medium text-accent uppercase tracking-wider"
            >
              Cam kết chất lượng
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2"
            >
              Vì sao chọn tụi mình?
            </motion.h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lift transition-all duration-300"
              >
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="font-heading font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-md text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Section Divider */}
      <TrongDongDivider className="bg-secondary/50" />
    </>
  );
}
