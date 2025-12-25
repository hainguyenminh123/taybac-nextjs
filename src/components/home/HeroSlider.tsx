import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { TrongDongWatermark } from '@/components/TrongDongPattern';

const slides = [
  {
    id: 1,
    image: '/hero-bg.jpg',
    badge: 'Đặc sản Tây Bắc chuẩn vị',
    title: 'Hương vị núi rừng',
    subtitle: 'tận tay bạn',
    description: 'Chọn lọc kỹ từ hộ dân, HTX vùng cao Điện Biên, Sơn La, Lào Cai. Đóng gói sạch, giao nhanh toàn quốc.',
  },
  {
    id: 2,
    image: '/products/trau-say.jpg',
    badge: 'Best Seller',
    title: 'Thịt trâu gác bếp',
    subtitle: 'đậm hương khói',
    description: 'Đặc sản nổi tiếng Tây Bắc, hun khói truyền thống. Món quà ý nghĩa cho người thân.',
  },
  {
    id: 3,
    image: '/products/lap-xuong.jpg',
    badge: 'Mới về',
    title: 'Lạp xưởng Tây Bắc',
    subtitle: 'thơm béo đặc trưng',
    description: 'Ướp mắc khén, gia vị núi rừng. Vị ngọt tự nhiên, hợp nướng, chiên, hấp.',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const slide = slides[currentSlide];

  return (
    <section>
      <div className="container-fluid-main">
        <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-lift">
          {/* Slides */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'tween', stiffness: 300, damping: 30 },
                opacity: { duration: 0.6 },
              }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                {/*<div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />*/}
                {/* Trống Đồng watermark */}
                {/*<TrongDongWatermark opacity={0.08} className="text-beige" />*/}
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center px-8 md:px-16">
                <div className="max-w-xl">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-4 py-2 bg-beige/20 backdrop-blur-sm text-md text-beige rounded-full font-medium mb-6"
                  >
                    {slide.badge}
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-beige leading-tight mb-4"
                  >
                    {slide.title}
                    <span className="block text-earth-light">{slide.subtitle}</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-md md:text-xl lg:text-2xl text-beige/80 mb-8 max-w-md"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link
                      href="/san-pham"
                      className="inline-flex items-center justify-center gap-2 bg-beige text-charcoal px-8 py-4 rounded-xl font-semibold 
                                 transition-all duration-300 hover:bg-cream hover:shadow-lift hover:-translate-y-0.5 text-lg"
                    >
                      Mua ngay
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/gioi-thieu"
                      className="inline-flex items-center justify-center gap-2 bg-transparent text-beige border border-beige/30 px-8 py-4 rounded-xl font-medium
                                 transition-all duration-300 hover:bg-beige/10 text-lg"
                    >
                      Tìm hiểu thêm
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-beige/20 backdrop-blur-sm text-beige 
                       flex items-center justify-center transition-all duration-300 hover:bg-beige/30 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-beige/20 backdrop-blur-sm text-beige 
                       flex items-center justify-center transition-all duration-300 hover:bg-beige/30 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-beige'
                    : 'w-2 bg-beige/40 hover:bg-beige/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Trust badges */}
          <div className="absolute bottom-6 right-8 hidden md:flex items-center gap-4">
            {['Nguồn gốc rõ ràng', 'Đóng gói sạch', 'Ship toàn quốc'].map((badge) => (
              <span
                key={badge}
                className="text-sm text-beige/60 flex items-center gap-2 bg-charcoal/30 backdrop-blur-sm px-3 py-1.5 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-earth-light" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
