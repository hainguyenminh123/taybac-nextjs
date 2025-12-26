import {useRef, useState} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {Calendar, ChevronLeft, ChevronRight, Quote, Star} from 'lucide-react';
import {reviews} from '@/data/reviews';

export default function ReviewsSection() {
	const ref = useRef<HTMLElement>(null);
	const [page, setPage] = useState(1);
	const PAGE_SIZE = 6;
	
	const {scrollYProgress} = useScroll({
		target: ref,
		offset: ["start end", "end start"]
	});
	
	const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
	const y = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
	
	const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
	const start = (page - 1) * PAGE_SIZE;
	const paginatedReviews = reviews.slice(start, start + PAGE_SIZE);
	
	const goto = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));
	
	// Helper: produce a compact list of pages with ellipses
	const getVisiblePages = (current: number, total: number, maxButtons = 5): (number | string)[] => {
		if (total <= maxButtons) return Array.from({length: total}, (_, i) => i + 1);
		const pages: (number | string)[] = [];
		const left = Math.max(2, current - 1);
		const right = Math.min(total - 1, current + 1);
		
		pages.push(1);
		if (left > 2) pages.push('...');
		for (let i = left; i <= right; i++) pages.push(i);
		if (right < total - 1) pages.push('...');
		pages.push(total);
		return pages;
	}
	
	const visiblePages = getVisiblePages(page, totalPages, 5);
	
	return (
			<motion.section
					ref={ref}
					style={{opacity}}
					className="section-spacing bg-background overflow-hidden"
			>
				<div className="container-fluid-main">
					{/* Header */}
					<motion.div
							style={{y}}
							className="text-center max-w-2xl mx-auto mb-12"
					>
						<motion.span
								initial={{opacity: 0, y: 10}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								className="text-lg font-medium text-accent uppercase tracking-wider"
						>
							Khách hàng nói gì
						</motion.span>
						<motion.h2
								initial={{opacity: 0, y: 10}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								transition={{delay: 0.1}}
								className="text-3xl md:text-4xl font-bold text-foreground mt-2"
						>
							Đánh giá từ cộng đồng
						</motion.h2>
					</motion.div>
					
					{/* Reviews Grid */}
					<motion.div
							key={page}
							initial={{opacity: 0, y: 12}}
							animate={{opacity: 1, y: 0}}
							transition={{duration: 0.4}}
							className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					>
						{paginatedReviews.map((review, index) => (
								<motion.div
										key={review.id}
										initial={{opacity: 0, y: 40}}
										whileInView={{opacity: 1, y: 0}}
										viewport={{once: true}}
										transition={{duration: 0.5, delay: index * 0.06}}
										whileHover={{y: -5}}
										className="card-premium p-6 transition-all duration-300"
								>
									{/* Quote Icon */}
									<motion.div
											initial={{scale: 0}}
											whileInView={{scale: 1}}
											viewport={{once: true}}
											transition={{delay: index * 0.1 + 0.2, type: 'spring'}}
									>
										<Quote className="w-8 h-8 text-primary/20 mb-4"/>
									</motion.div>
									
									{/* Stars */}
									<div className="flex gap-1 mb-4">
										{[...Array(review.rating)].map((_, i) => (
												<motion.div
														key={i}
														initial={{opacity: 0, scale: 0}}
														whileInView={{opacity: 1, scale: 1}}
														viewport={{once: true}}
														transition={{delay: index * 0.1 + i * 0.03}}
												>
													<Star className="w-4 h-4 fill-earth text-earth"/>
												</motion.div>
										))}
									</div>
									
									{/* Content */}
									<p className="text-foreground leading-relaxed mb-4">
										"{review.content}"
									</p>
									
									{/* Author */}
									<div className="flex items-center justify-between pt-4 border-t border-border">
										<div>
											<p className="font-medium text-foreground">{review.name}</p>
											<p className="text-sm text-muted-foreground">{review.location}</p>
										</div>
										<div className="flex items-center gap-2">
											{review.date && (
													<span
															className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full inline-flex items-center">
                                        <Calendar className="w-3 h-3 mr-1"/>
														{new Date(review.date).toLocaleDateString('vi-VN')}
                                      </span>
											)}
											<span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                      {review.product}
                                    </span>
										</div>
									</div>
								</motion.div>
						))}
					</motion.div>
					
					{/* Pagination Controls (compact) */}
					<div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
						<div className="flex items-center gap-2">
							<button
									onClick={() => goto(page - 1)}
									disabled={page === 1}
									aria-label="Previous page"
									className={`inline-flex items-center gap-2 px-3 py-1 rounded-md transition-colors duration-150 ${
											page === 1
													? 'bg-muted text-muted-foreground cursor-not-allowed'
													: 'bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground'
									}`}
							>
								<ChevronLeft className="w-4 h-4"/>
								Prev
							</button>
							
							<button
									onClick={() => goto(page + 1)}
									disabled={page === totalPages}
									aria-label="Next page"
									className={`inline-flex items-center gap-2 px-3 py-1 rounded-md transition-colors duration-150 ${
											page === totalPages
													? 'bg-muted text-muted-foreground cursor-not-allowed'
													: 'bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground'
									}`}
							>
								Next
								<ChevronRight className="w-4 h-4"/>
							</button>
						</div>
						
						<div className="flex items-center gap-2">
							{visiblePages.map((p, idx) =>
									p === '...' ? (
											<span key={`dots-${idx}`} className="px-2 text-muted-foreground">...</span>
									) : (
											<button
													key={p}
													onClick={() => goto(Number(p))}
													aria-current={p === page ? 'page' : undefined}
													className={`w-8 h-8 inline-flex items-center justify-center rounded-md transition-colors duration-150 ${
															p === page
																	? 'bg-primary text-primary-foreground font-medium'
																	: 'bg-muted text-muted-foreground hover:bg-primary/10'
													}`}
											>
												{p}
											</button>
									)
							)}
						</div>
					</div>
				</div>
			</motion.section>
	);
}