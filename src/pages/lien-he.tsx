import {useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Phone, Mail, MapPin, MessageCircle, Send, ExternalLink, X} from 'lucide-react';
import Layout from '@/components/Layout';
import {toast} from 'sonner';
import {TrongDongDivider} from "@/components/TrongDongPattern.tsx";

type MapCard = {
	key: 'hanoi' | 'dienbien';
	title: string;
	subtitle: string;
	address: string;
	href: string;
	embedSrc: string;
	imageSrc: string;
	badge: string;
};

export default function Contact() {
	const [formData, setFormData] = useState({name: '', email: '', phone: '', message: ''});
	const [isSubmitting, setIsSubmitting] = useState(false);
	
	// Click -> open popup (independent of hover)
	const [openMapKey, setOpenMapKey] = useState<MapCard['key'] | null>(null);
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const {name, value} = e.target;
		setFormData((prev) => ({...prev, [name]: value}));
	};
	
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name || !formData.message) {
			toast.error('Vui lòng điền họ tên và nội dung tin nhắn');
			return;
		}
		setIsSubmitting(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		toast.success('Cảm ơn bạn! Chúng mình sẽ phản hồi sớm nhất có thể.');
		setFormData({name: '', email: '', phone: '', message: ''});
		setIsSubmitting(false);
	};
	
	const breadcrumbs = [
		{name: 'Trang chủ', url: '/'},
		{name: 'Liên hệ', url: '/lien-he'},
	];
	
	const MAP_CARDS: readonly MapCard[] = [
		{
			key: 'hanoi',
			title: 'Hà Nội',
			subtitle: 'Văn phòng đại lý',
			address: '29 Đ. Đức Diễn, Phúc Diễn, Bắc Từ Liêm, Hà Nội',
			href: 'https://www.google.com/maps?q=29%20%C4%90.%20%C4%90%E1%BB%A9c%20Di%E1%BB%85n,%20Ph%C3%BAc%20Di%E1%BB%85n,%20B%E1%BA%AFc%20T%E1%BB%AB%20Li%C3%AAm,%20H%C3%A0%20N%E1%BB%99i&hl=vi',
			embedSrc:
					'https://www.google.com/maps?q=29%20%C4%90.%20%C4%90%E1%BB%A9c%20Di%E1%BB%85n,%20Ph%C3%BAc%20Di%E1%BB%85n,%20B%E1%BA%AFc%20T%E1%BB%AB%20Li%C3%AAm,%20H%C3%A0%20N%E1%BB%99i&output=embed',
			imageSrc: '/maps/hanoi.jpg',
			badge: 'Đại lý',
		},
		{
			key: 'dienbien',
			title: 'Điện Biên',
			subtitle: 'Văn phòng tại Điện Biên',
			address: 'Điện Biên, Việt Nam',
			href: 'https://www.google.com/maps?q=%C4%90i%E1%BB%87n%20Bi%C3%AAn,%20Vi%E1%BB%87t%20Nam&hl=vi',
			embedSrc: 'https://www.google.com/maps?q=%C4%90i%E1%BB%87n%20Bi%C3%AAn,%20Vi%E1%BB%87t%20Nam&output=embed',
			imageSrc: '/maps/dienbien.jpg',
			badge: 'Sản xuất',
		},
	] as const;
	
	const activeMap = useMemo(
			() => (openMapKey ? MAP_CARDS.find((m) => m.key === openMapKey) : null),
			[openMapKey],
	);
	
	return (
			<Layout
					title="Liên hệ Tây Bắc Store - Hotline, Zalo đặt hàng đặc sản Tây Bắc"
					description="Liên hệ Tây Bắc Store để đặt mua đặc sản Tây Bắc Điện Biên. Hotline: 0901 234 567. Zalo chat nhanh. Tư vấn và hỗ trợ 24/7. Giao hàng toàn quốc."
					keywords="liên hệ Tây Bắc Store, hotline đặt đặc sản, mua thịt trâu gác bếp, đặt hàng lạp xưởng, zalo Tây Bắc Store"
					canonicalUrl="/lien-he"
					breadcrumbs={breadcrumbs}
			>
				{/* Hero */}
				<section className="bg-secondary/50 grid place-items-center min-h-[25vh]">
					<div className="container-main text-center">
						<motion.h1
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								className="text-3xl md:text-4xl font-bold text-foreground"
						>
							Liên hệ với chúng mình
						</motion.h1>
						<motion.p
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								transition={{delay: 0.1}}
								className="text-muted-foreground mt-2"
						>
							Cần hỗ trợ? Đừng ngại liên hệ ngay!
						</motion.p>
					</div>
				</section>
				
				{/* Main Content */}
				<section className="section-spacing">
					<div className="container-main">
						<div className="grid lg:grid-cols-3 gap-12">
							{/* Contact Info */}
							<motion.div
									initial={{opacity: 0, x: -20}}
									whileInView={{opacity: 1, x: 0}}
									viewport={{once: true}}
									className="lg:col-span-1 space-y-6"
							>
								<div>
									<h2 className="text-2xl font-semibold text-foreground mb-4">Thông tin liên hệ</h2>
									<p className="text-muted-foreground text-md">
										Đội ngũ Tây Bắc Store luôn sẵn sàng hỗ trợ bạn. Liên hệ qua Zalo để được tư vấn nhanh nhất\!
									</p>
								</div>
								
								<div className="space-y-4">
									<a
											href="tel:0901234567"
											className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-all group"
									>
										<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
											<Phone className="w-5 h-5 text-primary"/>
										</div>
										<div>
											<p className="font-medium text-foreground group-hover:text-primary transition-colors text-md">
												Hotline
											</p>
											<p className="text-muted-foreground">0901 234 567</p>
										</div>
									</a>
									
									<a
											href="https://zalo.me/0901234567"
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-all group"
									>
										<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
											<MessageCircle className="w-5 h-5 text-primary"/>
										</div>
										<div>
											<p className="font-medium text-foreground group-hover:text-primary transition-colors">Zalo</p>
											<p className="text-muted-foreground">Chat ngay với shop</p>
										</div>
									</a>
									
									<a
											href="mailto:hello@taybacstore.vn"
											className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/50 transition-all group"
									>
										<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
											<Mail className="w-5 h-5 text-primary"/>
										</div>
										<div>
											<p className="font-medium text-foreground group-hover:text-primary transition-colors">Email</p>
											<p className="text-muted-foreground">hello@taybacstore.vn</p>
										</div>
									</a>
									
									<div className="flex items-start gap-4 p-4 rounded-xl border border-border">
										<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
											<MapPin className="w-5 h-5 text-primary"/>
										</div>
										<div>
											<p className="font-medium text-foreground">Địa chỉ</p>
											<p className="text-muted-foreground">Hà Nội, Việt Nam</p>
										</div>
									</div>
								</div>
							</motion.div>
							
							{/* Contact Form */}
							<motion.div
									initial={{opacity: 0, x: 20}}
									whileInView={{opacity: 1, x: 0}}
									viewport={{once: true}}
									className="lg:col-span-2"
							>
								<div className="card-premium p-6 md:p-8">
									<h2 className="text-2xl font-semibold text-foreground mb-6">Gửi tin nhắn</h2>
									
									<form onSubmit={handleSubmit} className="space-y-6">
										<div className="grid md:grid-cols-2 gap-4">
											<div>
												<label className="block text-md font-medium text-foreground mb-2">
													Họ tên <span className="text-destructive">*</span>
												</label>
												<input
														type="text"
														name="name"
														value={formData.name}
														onChange={handleInputChange}
														className="input-premium"
														placeholder="Nguyễn Văn A"
														required
												/>
											</div>
											<div>
												<label className="block text-md font-medium text-foreground mb-2">Số điện thoại</label>
												<input
														type="tel"
														name="phone"
														value={formData.phone}
														onChange={handleInputChange}
														className="input-premium"
														placeholder="0901234567"
												/>
											</div>
										</div>
										
										<div>
											<label className="block text-md font-medium text-foreground mb-2">Email</label>
											<input
													type="email"
													name="email"
													value={formData.email}
													onChange={handleInputChange}
													className="input-premium"
													placeholder="email@example.com"
											/>
										</div>
										
										<div>
											<label className="block text-md font-medium text-foreground mb-2">
												Nội dung <span className="text-destructive">*</span>
											</label>
											<textarea
													name="message"
													value={formData.message}
													onChange={handleInputChange}
													rows={5}
													className="input-premium resize-none"
													placeholder="Bạn cần hỗ trợ gì?"
													required
											/>
										</div>
										
										<button
												type="submit"
												disabled={isSubmitting}
												className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-50"
										>
											{isSubmitting ? (
													'Đang gửi...'
											) : (
													<>
														<Send className="w-4 h-4 text-md"/>
														Gửi tin nhắn
													</>
											)}
										</button>
									</form>
								</div>
							</motion.div>
						</div>
					</div>
				</section>
				
				{/* Section Divider */}
				<TrongDongDivider className="bg-secondary/50" />
				
				{/* Maps Section: hover -> inline mini map, click -> popup */}
				<section className="pb-16 md:pb-24 bg-secondary/50">
					<div className="container-main">
						<div className="flex items-center justify-between gap-6 mb-6">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
									<MapPin className="w-6 h-6 text-primary"/>
								</div>
								<div>
									<h2 className="text-2xl font-heading font-semibold text-foreground">Bản đồ địa điểm</h2>
									<p className="text-muted-foreground text-md">
										Click để mở popup - Click link để mở Google Maps
									</p>
								</div>
							</div>
						</div>
						
						<div className="grid md:grid-cols-2 gap-6">
							{MAP_CARDS.map((card, idx) => (
									<motion.button
											key={card.key}
											type="button"
											onClick={() => setOpenMapKey(card.key)}
											initial={{opacity: 0, y: 16}}
											whileInView={{opacity: 1, y: 0}}
											viewport={{once: true}}
											transition={{delay: idx * 0.06}}
											className="card-premium overflow-hidden group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
											aria-label={`Open map popup - ${card.title}`}
									>
										<div className="relative aspect-[16/10] md:aspect-[16/9]">
											<img
													src={card.imageSrc}
													alt={`Map preview - ${card.title}`}
													className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-0"
													loading="lazy"
											/>
											<iframe
													title={`Mini map hover - ${card.title}`}
													src={card.embedSrc}
													loading="lazy"
													referrerPolicy="no-referrer-when-downgrade"
													className="pointer-events-none absolute inset-0 w-full h-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
													allowFullScreen
											/>
											
											<div
													className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/35 to-transparent pointer-events-none"/>
												<div className="absolute top-4 left-4">
			                    <span
					                    className="inline-flex items-center rounded-full border border-border/60 bg-background/80 backdrop-blur px-3 py-1 text-md font-medium text-foreground">
			                      {card.badge}
			                    </span>
												</div>
												<a
													href={card.href}
													target="_blank"
													rel="noopener noreferrer"
													onClick={(e) => e.stopPropagation()}
													className="pointer-events-auto absolute top-4 right-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 backdrop-blur px-3 py-1 text-md font-medium text-foreground transition-colors hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
													aria-label={`Open Google Maps - ${card.title}`}
												>
													<ExternalLink className="w-4 h-4 text-primary"/>
													Open Maps
												</a>
											
											<div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
												<div className="flex items-start justify-between gap-4">
													<div>
														<h2 className="text-3xl md:text-3xl font-bold text-foreground leading-snug">
															{card.title}
														</h2>
														<p className="text-md text-foreground mt-0.5">{card.subtitle}</p>
														<p className="text-md text-foreground mt-2 line-clamp-2">{card.address}</p>
													</div>
												</div>
												
												<div className="mt-4 h-px w-full bg-border/70"/>
												<div className="mt-3 flex items-center justify-between text-md">
													<span className="text-foreground">Click để mở popup</span>
													<span
															className="text-primary font-medium group-hover:underline underline-offset-4">Xem lớn</span>
												</div>
											</div>
										</div>
									</motion.button>
							))}
						</div>
						
						<AnimatePresence>
							{activeMap && (
									<motion.div
											key="map-popup"
											className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
											initial={{opacity: 0}}
											animate={{opacity: 1}}
											exit={{opacity: 0}}
											onClick={() => setOpenMapKey(null)}
											role="dialog"
											aria-modal="true"
											aria-label={`Map popup - ${activeMap.title}`}
									>
										<motion.div
												className="mx-auto mt-16 w-[92vw] max-w-5xl overflow-hidden rounded-2xl border border-border bg-background shadow-xl"
												initial={{opacity: 0, y: 14, scale: 0.98}}
												animate={{opacity: 1, y: 0, scale: 1}}
												exit={{opacity: 0, y: 12, scale: 0.98}}
												onClick={(e) => e.stopPropagation()}
										>
											<div className="flex items-center justify-between gap-4 p-4 border-b border-border">
												<div className="min-w-0">
													<p className="text-md text-muted-foreground">{activeMap.subtitle}</p>
													<h3 className="text-2xl font-bold text-foreground truncate">{activeMap.title}</h3>
													<p className="text-md text-muted-foreground truncate">{activeMap.address}</p>
												</div>
												
												<div className="flex items-center gap-4">
													<a
															href={activeMap.href}
															target="_blank"
															rel="noopener noreferrer"
															className="btn-secondary inline-flex items-center gap-2"
													>
														<ExternalLink className="w-4 h-4"/>
														Open
													</a>
													<button
															type="button"
															onClick={() => setOpenMapKey(null)}
															className="btn-ghost inline-flex items-center gap-2"
															aria-label="Close popup"
													>
														<X className="w-4 h-4"/>
													</button>
												</div>
											</div>
											
											<div className="aspect-[16/9]">
												<iframe
														title={`Map popup - ${activeMap.title}`}
														src={activeMap.embedSrc}
														loading="lazy"
														referrerPolicy="no-referrer-when-downgrade"
														className="w-full h-full"
														allowFullScreen
												/>
											</div>
										</motion.div>
									</motion.div>
							)}
						</AnimatePresence>
					</div>
				</section>
			</Layout>
	);
}