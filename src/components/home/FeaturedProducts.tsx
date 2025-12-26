import {useRef} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {products} from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {TrongDongDivider, TrongDongWatermark} from '@/components/TrongDongPattern';

export default function FeaturedProducts() {
	const featuredProducts = products.slice(0, 4);
	const ref = useRef<HTMLElement>(null);
	
	const {scrollYProgress} = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	
	const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
	const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
	
	return (
			<>
				<motion.section
						ref={ref}
						style={{opacity}}
						className="section-spacing bg-background relative overflow-hidden"
				>
					{/* Trống Đồng watermark */}
					<TrongDongWatermark opacity={0.04} className="text-primary"/>
					
					<div className="container-fluid-main relative z-10">
						{/* Header */}
						<motion.div
								style={{y}}
								className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
						>
							<div>
								<motion.span
										initial={{opacity: 0, y: 10}}
										whileInView={{opacity: 1, y: 0}}
										viewport={{once: true}}
										className="text-lg font-medium text-accent uppercase tracking-wider"
								>
									Sản phẩm nổi bật
								</motion.span>
								<motion.h2
										initial={{opacity: 0, y: 10}}
										whileInView={{opacity: 1, y: 0}}
										viewport={{once: true}}
										transition={{delay: 0.1}}
										className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2"
								>
									Chuẩn vị Tây Bắc
								</motion.h2>
							</div>
							<motion.div
									initial={{opacity: 0}}
									whileInView={{opacity: 1}}
									viewport={{once: true}}
									transition={{delay: 0.2}}
							>
								<Link
										href="/san-pham"
										className="text-lg inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all group"
								>
									Xem tất cả
									<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
								</Link>
							</motion.div>
						</motion.div>
						
						{/* Products Grid */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
							{featuredProducts.map((product, index) => (
									<ProductCard key={product.id} product={product} index={index}/>
							))}
						</div>
					</div>
				</motion.section>
				
				{/* Section Divider */}
				<TrongDongDivider/>
			</>
	);
}
