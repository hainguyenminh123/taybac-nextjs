import {useMemo, useState} from 'react';
import type {GetServerSideProps} from 'next';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {
	BookOpen,
	Calendar,
	ChefHat,
	ChevronLeft,
	ChevronRight,
	MapPin,
	Minus,
	Plus,
	RefreshCw,
	Scale,
	Shield,
	ShoppingBag,
	Snowflake,
	Star,
	Truck
} from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import {formatPrice, getProductById, type Product, products} from '@/data/products';
import {useCart} from '@/store/cart';
import {reviews} from '@/data/reviews';
import {toast} from 'sonner';

const REVIEWS_PER_PAGE = 6;

interface ProductDetailProps {
	id: string;
	product: Product | null;
}

export default function ProductDetail({id, product}: ProductDetailProps) {
	const [reviewName, setReviewName] = useState('');
	const [reviewLocation, setReviewLocation] = useState('');
	const [reviewRating, setReviewRating] = useState(5);
	const [reviewContent, setReviewContent] = useState('');
	
	// id & product are provided by getServerSideProps (SSR)
	const [quantity, setQuantity] = useState(1);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [reviewPage, setReviewPage] = useState(1);
	const [isWritingReview, setIsWritingReview] = useState(false);
	
	// Weight selection state
	const defaultWeightOption = product?.weightOptions?.[0];
	const [selectedWeight, setSelectedWeight] = useState(defaultWeightOption?.weight || product?.weight || '');
	const [selectedPrice, setSelectedPrice] = useState(defaultWeightOption?.price || product?.price || 0);
	
	const {addItem, openCart} = useCart();
	
	const productImages = product ? [product.image, product.image, product.image] : [];
	
	const productReviews = reviews.filter(r =>
			product && r.product.toLowerCase().includes(product.name.toLowerCase().split(' ')[0])
	);
	
	const allReviews = productReviews.length > 0 ? productReviews : reviews;
	
	const totalReviewPages = Math.max(1, Math.ceil(allReviews.length / REVIEWS_PER_PAGE));
	
	const displayReviews = useMemo(() => {
		const start = (reviewPage - 1) * REVIEWS_PER_PAGE;
		return allReviews.slice(start, start + REVIEWS_PER_PAGE);
	}, [allReviews, reviewPage]);
	
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
	};
	
	const visiblePages = useMemo(() => getVisiblePages(reviewPage, totalReviewPages, 5), [reviewPage, totalReviewPages]);
	
	const handleReviewPageChange = (p: number) => {
		if (p >= 1 && p <= totalReviewPages && p !== reviewPage) {
			setReviewPage(p);
		}
	};
	
	if (!product) {
		return (
				<Layout title="Sản phẩm không tồn tại | Tây Bắc Store">
					<div className="min-h-[60vh] flex items-center justify-center">
						<div className="text-center">
							<h1 className="text-2xl font-bold text-foreground mb-4">Sản phẩm không tồn tại</h1>
							<Link href="/san-pham" className="btn-primary">
								Quay lại cửa hàng
							</Link>
						</div>
					</div>
				</Layout>
		);
	}
	
	const relatedProducts = products.filter(
			(p) => p.category === product.category && p.id !== product.id
	).slice(0, 4);
	
	const handleAddToCart = () => {
		addItem(product, quantity, selectedWeight, selectedPrice);
		openCart();
	};
	
	const handleWeightChange = (weight: string, price: number) => {
		setSelectedWeight(weight);
		setSelectedPrice(price);
	};
	
	const resetForm = () => {
		setReviewName('');
		setReviewLocation('');
		setReviewRating(5);
		setReviewContent('');
	};
	
	const submitReview = (e: React.FormEvent) => {
		e.preventDefault();
		toast.success('Đã gửi đánh giá của bạn!');
		resetForm();
		setIsWritingReview(false);
	};
	
	// Breadcrumbs for SEO
	const breadcrumbs = [
		{name: 'Trang chủ', url: '/'},
		{name: 'Sản phẩm', url: '/san-pham'},
		{name: product.name, url: `/san-pham/${product.id}`},
	];
	
	// Product SEO data
	const productSEO = {
		name: product.name,
		description: product.description || product.shortDesc,
		image: `https://taybacstore.vn${product.image}`,
		price: selectedPrice,
		currency: 'VND',
		availability: product.inStock ? 'InStock' as const : 'OutOfStock' as const,
		sku: product.id,
		brand: 'Tây Bắc Store',
		category: product.category,
		reviewCount: allReviews.length,
		ratingValue: 4.8,
	};
	
	return (
			<Layout
					title={`${product.name} - Đặc sản Tây Bắc Điện Biên | Mua online tại Tây Bắc Store`}
					description={`${product.name} - ${product.shortDesc}. Nguồn gốc ${product.origin}. Giá từ ${selectedPrice.toLocaleString('vi-VN')}đ. Giao hàng toàn quốc, đổi trả 7 ngày. Mua ngay!`}
					keywords={`${product.name}, ${product.tag}, đặc sản ${product.origin}, mua ${product.name} online, ${product.category} Tây Bắc`}
					canonicalUrl={`/san-pham/${product.id}`}
					ogType="product"
					breadcrumbs={breadcrumbs}
					product={productSEO}
			>
				{/* Breadcrumb */}
				<section className="pt-24 pb-4 bg-secondary/30">
					<div className="container-main">
						<nav className="flex items-center gap-2 text-md">
							<Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
								Trang chủ
							</Link>
							<ChevronRight className="w-4 h-4 text-muted-foreground"/>
							<Link href="/san-pham" className="text-muted-foreground hover:text-foreground transition-colors">
								Sản phẩm
							</Link>
							<ChevronRight className="w-4 h-4 text-muted-foreground"/>
							<span className="text-foreground font-medium">{product.name}</span>
						</nav>
					</div>
				</section>
				
				{/* Product Detail */}
				<section className="py-8 md:py-12">
					<div className="container-main">
						<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
							{/* Image Gallery Slider */}
							<motion.div
									initial={{opacity: 0, x: -20}}
									animate={{opacity: 1, x: 0}}
									transition={{duration: 0.5}}
									className="space-y-4"
							>
								{/* Main Image */}
								<div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
									<img
											src={productImages[currentImageIndex]}
											alt={`${product.name} - Ảnh ${currentImageIndex + 1}`}
											className="w-full h-full object-cover"
									/>
									
									{/* Navigation Arrows */}
									{productImages.length > 1 && (
											<>
												<button
														onClick={() => setCurrentImageIndex(prev =>
																prev === 0 ? productImages.length - 1 : prev - 1
														)}
														className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-md"
														aria-label="Ảnh trước"
												>
													<ChevronLeft className="w-5 h-5"/>
												</button>
												<button
														onClick={() => setCurrentImageIndex(prev =>
																prev === productImages.length - 1 ? 0 : prev + 1
														)}
														className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-md"
														aria-label="Ảnh tiếp"
												>
													<ChevronRight className="w-5 h-5"/>
												</button>
											</>
									)}
									
									{/* Dots Indicator */}
									<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
										{productImages.map((_, idx) => (
												<button
														key={idx}
														onClick={() => setCurrentImageIndex(idx)}
														className={`w-2 h-2 rounded-full transition-all ${
																idx === currentImageIndex
																		? 'bg-primary w-6'
																		: 'bg-background/60 hover:bg-background/80'
														}`}
														aria-label={`Xem ảnh ${idx + 1}`}
												/>
										))}
									</div>
								</div>
								
								{/* Thumbnails */}
								<div className="flex gap-3">
									{productImages.map((img, idx) => (
											<button
													key={idx}
													onClick={() => setCurrentImageIndex(idx)}
													className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
															idx === currentImageIndex
																	? 'border-primary'
																	: 'border-transparent hover:border-border'
													}`}
											>
												<img
														src={img}
														alt={`${product.name} thumbnail ${idx + 1}`}
														className="w-full h-full object-cover"
												/>
											</button>
									))}
								</div>
							</motion.div>
							
							{/* Product Info */}
							<motion.div
									initial={{opacity: 0, x: 20}}
									animate={{opacity: 1, x: 0}}
									transition={{duration: 0.5, delay: 0.1}}
									className="flex flex-col"
							>
								{/* Tag & Category */}
								<div className="flex items-center gap-3 mb-4">
									<span className="text-md tag-product">{product.tag}</span>
									<span className="text-md text-muted-foreground">{product.category}</span>
								</div>
								
								{/* Name & Price */}
								<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
									{product.name}
								</h1>
								<p className="text-2xl font-semibold text-primary mb-6">
									{formatPrice(selectedPrice)}
								</p>
								
								{/* Short Description */}
								<p className="text-muted-foreground mb-6">
									{product.description}
								</p>
								
								{/* Weight Options Selector */}
								{product.weightOptions && product.weightOptions.length > 0 ? (
										<div className="mb-6">
											<div className="flex items-center gap-2 mb-3">
												<Scale className="w-4 h-4 text-primary"/>
												<span className="text-muted-foreground text-md">Chọn khối lượng:</span>
											</div>
											<div className="flex flex-wrap gap-2">
												{product.weightOptions.map((option) => (
														<button
																key={option.weight}
																onClick={() => handleWeightChange(option.weight, option.price)}
																className={`px-4 py-2.5 rounded-xl border-2 transition-all font-medium ${
																		selectedWeight === option.weight
																				? 'border-primary bg-primary/10 text-primary'
																				: 'border-border hover:border-primary/50 text-foreground'
																}`}
														>
															<span className="block text-md">{option.weight}</span>
															<span className="block text-md text-muted-foreground">{formatPrice(option.price)}</span>
														</button>
												))}
											</div>
										</div>
								) : product.weight && (
										<p className="text-md text-muted-foreground mb-6">
											Khối lượng: <span className="font-medium text-foreground">{product.weight}</span>
										</p>
								)}
								
								{/* Quantity Selector */}
								<div className="flex items-center gap-4 mb-6">
									<span className="text-muted-foreground text-md">Số lượng:</span>
									<div className="flex items-center gap-3 border border-border rounded-xl p-1">
										<button
												onClick={() => setQuantity(Math.max(1, quantity - 1))}
												className="p-2 hover:bg-muted rounded-lg transition-colors"
												aria-label="Giảm"
										>
											<Minus className="w-4 h-4"/>
										</button>
										<span className="w-12 text-center font-medium">{quantity}</span>
										<button
												onClick={() => setQuantity(quantity + 1)}
												className="p-2 hover:bg-muted rounded-lg transition-colors"
												aria-label="Tăng"
										>
											<Plus className="w-4 h-4"/>
										</button>
									</div>
								</div>
								
								{/* Add to Cart */}
								<button
										onClick={handleAddToCart}
										className="btn-primary flex items-center justify-center gap-3 w-full md:w-auto"
								>
									<ShoppingBag className="w-5 h-5"/>
									Thêm vào giỏ
								</button>
								
								{/* Trust Badges */}
								<div className="mt-8 pt-8 border-t border-border">
									<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
										<div className="flex items-center gap-3">
											<Truck className="w-5 h-5 text-primary"/>
											<span className="text-md text-muted-foreground">Giao toàn quốc</span>
										</div>
										<div className="flex items-center gap-3">
											<RefreshCw className="w-5 h-5 text-primary"/>
											<span className="text-md text-muted-foreground">Đổi trả 7 ngày</span>
										</div>
										<div className="flex items-center gap-3">
											<Shield className="w-5 h-5 text-primary"/>
											<span className="text-md text-muted-foreground">Cam kết chất lượng</span>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
						
						{/* Product Details with Icons */}
						<div className="mt-12 md:mt-16">
							<div className="grid md:grid-cols-3 gap-6">
								{/* Origin */}
								{product.origin && (
										<motion.div
												initial={{opacity: 0, y: 20}}
												whileInView={{opacity: 1, y: 0}}
												viewport={{once: true}}
												transition={{delay: 0.1}}
												className="card-premium p-6"
										>
											<div className="flex items-center gap-3 mb-3">
												<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
													<MapPin className="w-5 h-5 text-primary"/>
												</div>
												<h3 className="font-heading font-semibold text-foreground">Nguồn gốc</h3>
											</div>
											<p className="text-md text-muted-foreground leading-relaxed">{product.origin}</p>
										</motion.div>
								)}
								
								{/* Storage */}
								{product.storage && (
										<motion.div
												initial={{opacity: 0, y: 20}}
												whileInView={{opacity: 1, y: 0}}
												viewport={{once: true}}
												transition={{delay: 0.2}}
												className="card-premium p-6"
										>
											<div className="flex items-center gap-3 mb-3">
												<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
													<Snowflake className="w-5 h-5 text-primary"/>
												</div>
												<h3 className="font-heading font-semibold text-foreground">Bảo quản</h3>
											</div>
											<p className="text-md text-muted-foreground leading-relaxed">{product.storage}</p>
										</motion.div>
								)}
								
								{/* Cooking Tips */}
								{product.cookingTips && (
										<motion.div
												initial={{opacity: 0, y: 20}}
												whileInView={{opacity: 1, y: 0}}
												viewport={{once: true}}
												transition={{delay: 0.3}}
												className="card-premium p-6"
										>
											<div className="flex items-center gap-3 mb-3">
												<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
													<ChefHat className="w-5 h-5 text-primary"/>
												</div>
												<h3 className="font-heading font-semibold text-foreground">Gợi ý chế biến</h3>
											</div>
											<p className="text-md text-muted-foreground leading-relaxed">{product.cookingTips}</p>
										</motion.div>
								)}
							</div>
						</div>
						
						{/* Blog-style Product Description */}
						{product.blogContent && (
								<motion.div
										initial={{opacity: 0, y: 30}}
										whileInView={{opacity: 1, y: 0}}
										viewport={{once: true}}
										className="mt-12 md:mt-20"
								>
									{/* Section Header */}
									<div className="flex items-center gap-4 mb-8">
										<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
											<BookOpen className="w-6 h-6 text-primary"/>
										</div>
										<div>
											<h2 className="text-2xl font-heading font-semibold text-foreground">
												Câu chuyện sản phẩm
											</h2>
											<p className="text-muted-foreground text-md">Tìm hiểu về quy trình tạo ra {product.name}</p>
										</div>
									</div>
									
									{/* Intro Paragraph */}
									<div className="card-premium p-6 md:p-8 mb-8">
										<p className="text-lg text-muted-foreground leading-relaxed">
											{product.blogContent.intro}
										</p>
									</div>
									
									{/* Blog Sections with Images */}
									<div className="space-y-8 md:space-y-12">
										{product.blogContent.sections.map((section, index) => (
												<motion.div
														key={index}
														initial={{opacity: 0, y: 20}}
														whileInView={{opacity: 1, y: 0}}
														viewport={{once: true}}
														transition={{delay: index * 0.15}}
														className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${
																index % 2 === 1 ? 'md:flex-row-reverse' : ''
														}`}
												>
													{/* Image */}
													<div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
														<div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
															<img
																	src={section.image || product.image}
																	alt={section.title}
																	className="w-full h-full object-cover"
															/>
															{/* Step Number Badge */}
															<div
																	className="absolute top-4 left-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-heading font-bold text-lg shadow-lg">
																{index + 1}
															</div>
														</div>
													</div>
													
													{/* Content */}
													<div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
														<h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
															{section.title}
														</h3>
														<p className="text-muted-foreground leading-relaxed text-lg">
															{section.content}
														</p>
													</div>
												</motion.div>
										))}
									</div>
								</motion.div>
						)}
						
						{/* Customer Reviews Section with Pagination */}
						<div className="mt-12 md:mt-16">
							<div className="flex items-center justify-between mb-8">
								<h2 className="text-2xl font-heading font-semibold text-foreground">
									{isWritingReview ? 'Viết đánh giá' : `Đánh giá từ khách hàng (${allReviews.length})`}
								</h2>
								<button className="btn-secondary"
								        onClick={() => setIsWritingReview((v) => !v)}>
									{isWritingReview ? 'Quay lại' : 'Viết đánh giá'}
								</button>
							</div>
							
							{
								isWritingReview ? (
										<motion.form
												onSubmit={submitReview}
												initial={{opacity: 0, y: 12}}
												animate={{opacity: 1, y: 0}}
												className="card-premium p-6 md:p-8 space-y-6"
										>
											<div className="grid md:grid-cols-2 gap-5">
												<div className="flex flex-col gap-2">
													<label className="text-xl font-medium text-muted-foreground">Họ và tên</label>
													<input type="text" value={reviewName}
													       onChange={(e) => setReviewName(e.target.value)}
													       className="input-premium"
													       placeholder="Nhập họ tên" required/>
												</div>
												<div className="flex flex-col gap-2">
													<label className="text-xl font-medium text-muted-foreground">Khu vực</label>
													<input
															type="text" value={reviewLocation}
															onChange={(e) => setReviewLocation(e.target.value)}
															className="input-premium"
															placeholder="VD: Hà Nội, TP.HCM"
													/>
												</div>
												<div className="flex flex-col gap-2">
													<label className="text-xl text-muted-foreground">Đánh giá</label>
													<div className="flex items-center gap-2">
														{[1, 2, 3, 4, 5].map((r) => (
																<button
																		type="button"
																		key={r}
																		onClick={() => setReviewRating(r)}
																		className={`p-2 rounded-lg border transition-colors ${
																				r <= reviewRating ? 'bg-yellow-100 border-yellow-300' : 'bg-muted border-border hover:bg-muted/70'
																		}`}
																		aria-label={`Chọn ${r} sao`}
																>
																	<Star
																			className={`w-5 h-5 ${r <= reviewRating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}/>
																</button>
														))}
													</div>
												</div>
												<div className="flex flex-col gap-2">
													<label className="text-xl font-medium text-muted-foreground">Nội dung đánh giá</label>
													<textarea
															value={reviewContent}
															onChange={(e) => setReviewContent(e.target.value)}
															className="input-premium text-md min-h-[140px] placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition resize-y"
															placeholder="Chia sẻ trải nghiệm của bạn..."
															required
													/>
												</div>
												<div className="flex items-center gap-3">
													<button type="submit" className="btn-primary">Gửi đánh giá</button>
													<button type="button" className="btn-ghost" onClick={() => setIsWritingReview(false)}>
														Quay lại
													</button>
												</div>
											</div>
										</motion.form>
								) : (
										<>
											<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
												{displayReviews.map((review, index) => (
														<motion.div
																key={review.id}
																initial={{opacity: 0, y: 20}}
																whileInView={{opacity: 1, y: 0}}
																viewport={{once: true}}
																transition={{delay: index * 0.1}}
																className="card-premium p-6"
														>
															<div className="flex gap-1 mb-3">
																{[...Array(5)].map((_, i) => (
																		<Star
																				key={i}
																				className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
																		/>
																))}
															</div>
															<p className="text-muted-foreground text-md leading-relaxed mb-4 line-clamp-3">
																"{review.content}"
															</p>
															<div className="flex items-center justify-between pt-4 border-t border-border">
																<div>
																	<p className="font-medium text-foreground">{review.name}</p>
																	<p className="text-sm text-muted-foreground">{review.location}</p>
																</div>
																<div className="flex items-center gap-2">
																	{review.date && (
																			<span
																					className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full inline-flex items-center">
                                        <Calendar
		                                        className="w-3 h-3 mr-1"/> {new Date(review.date).toLocaleDateString("vi-VN")}
																			</span>
																	)}
																</div>
															</div>
														</motion.div>
												))}
											</div>
											
											{totalReviewPages > 1 && (
													<div className="mt-8">
														<div className="flex flex-col md:flex-row items-center justify-between gap-4">
															<div className="flex items-center gap-2">
																<button
																		onClick={() => handleReviewPageChange(reviewPage - 1)}
																		disabled={reviewPage === 1}
																		aria-label="Previous page"
																		className={`inline-flex items-center gap-2 px-3 py-1 rounded-md transition-colors duration-150 ${
																				reviewPage === 1
																						? 'bg-muted text-muted-foreground cursor-not-allowed'
																						: 'bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground'
																		}`}
																>
																	<ChevronLeft className="w-4 h-4"/>
																	Prev
																</button>
																
																<button
																		onClick={() => handleReviewPageChange(reviewPage + 1)}
																		disabled={reviewPage === totalReviewPages}
																		aria-label="Next page"
																		className={`inline-flex items-center gap-2 px-3 py-1 rounded-md transition-colors duration-150 ${
																				reviewPage === totalReviewPages
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
																						onClick={() => handleReviewPageChange(Number(p))}
																						aria-current={p === reviewPage ? 'page' : undefined}
																						className={`w-8 h-8 inline-flex items-center justify-center rounded-md transition-colors duration-150 ${
																								p === reviewPage
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
											)}
										</>
								)
							}
						</div>
					</div>
				</section>
				
				{/* Related Products */}
				{relatedProducts.length > 0 && (
						<section className="section-spacing bg-secondary/30">
							<div className="container-main">
								<h2 className="text-2xl font-semibold text-foreground mb-8">Sản phẩm liên quan</h2>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
									{relatedProducts.map((product, index) => (
											<ProductCard key={product.id} product={product} index={index}/>
									))}
								</div>
							</div>
						</section>
				)}
			</Layout>
	);
}

export const getServerSideProps: GetServerSideProps<ProductDetailProps> = async (ctx) => {
	const idParam = ctx.params?.id;
	const id = typeof idParam === 'string' ? idParam : '';
	const product = id ? getProductById(id) : null;
	
	return {
		props: {
			id,
			product: product ?? null,
		},
	};
};
