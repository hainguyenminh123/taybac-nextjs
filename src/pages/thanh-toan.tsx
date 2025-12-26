import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {motion} from 'framer-motion';
import {ChevronRight, CreditCard, Minus, Plus, StickyNote, Trash2, Truck} from 'lucide-react';
import Layout from '@/components/Layout';
import {useCart} from '@/store/cart';
import {formatPrice} from '@/data/products';
import {toast} from 'sonner';

type PaymentMethod = 'cod' | 'bank';

export default function Checkout() {
	const router = useRouter();
	const {items, getTotalPrice, updateQuantity, removeItem, clearCart} = useCart();
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		address: '',
		city: '',
		note: '',
	});
	
	const totalPrice = getTotalPrice();
	const shippingFee = totalPrice >= 500000 ? 0 : 30000;
	const grandTotal = totalPrice + shippingFee;
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const {name, value} = e.target;
		setFormData((prev) => ({...prev, [name]: value}));
	};
	
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		// Validate
		if (!formData.name || !formData.phone || !formData.address || !formData.city) {
			toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
			return;
		}
		
		// Simulate order submission
		toast.success('Đặt hàng thành công! Chúng mình sẽ liên hệ xác nhận sớm.');
		clearCart();
		router.push('/');
	};
	
	if (items.length === 0) {
		return (
				<Layout title="Thanh toán | Tây Bắc Store">
					<div className="min-h-[60vh] flex items-center justify-center">
						<div className="text-center">
							<h1 className="text-2xl font-bold text-foreground mb-4">Giỏ hàng trống</h1>
							<p className="text-muted-foreground mb-6">Hãy thêm sản phẩm vào giỏ để tiếp tục</p>
							<Link href="/san-pham" className="btn-primary">
								Mua sắm ngay
							</Link>
						</div>
					</div>
				</Layout>
		);
	}
	
	return (
			<Layout title="Thanh toán | Tây Bắc Store">
				{/* Breadcrumb */}
				<section className="pt-24 pb-4 bg-secondary/30">
					<div className="container-main">
						<nav className="flex items-center gap-2 text-sm">
							<Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
								Trang chủ
							</Link>
							<ChevronRight className="w-4 h-4 text-muted-foreground"/>
							<span className="text-foreground font-medium">Thanh toán</span>
						</nav>
					</div>
				</section>
				
				{/* Main Content */}
				<section className="py-8 md:py-12">
					<div className="container-main">
						<h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Thanh toán</h1>
						
						<form onSubmit={handleSubmit}>
							<div className="grid lg:grid-cols-3 gap-8">
								{/* Left - Form */}
								<div className="lg:col-span-2 space-y-8">
									{/* Customer Info */}
									<motion.div
											initial={{opacity: 0, y: 20}}
											animate={{opacity: 1, y: 0}}
											className="card-premium p-6"
									>
										<h2 className="font-semibold text-foreground mb-6 flex items-center gap-2">
											<span
													className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
											Thông tin nhận hàng
										</h2>
										
										<div className="grid md:grid-cols-2 gap-4">
											<div>
												<label className="block text-sm font-medium text-foreground mb-2">
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
												<label className="block text-sm font-medium text-foreground mb-2">
													Số điện thoại <span className="text-destructive">*</span>
												</label>
												<input
														type="tel"
														name="phone"
														value={formData.phone}
														onChange={handleInputChange}
														className="input-premium"
														placeholder="0901234567"
														required
												/>
											</div>
											<div className="md:col-span-2">
												<label className="block text-sm font-medium text-foreground mb-2">
													Email
												</label>
												<input
														type="email"
														name="email"
														value={formData.email}
														onChange={handleInputChange}
														className="input-premium"
														placeholder="email@example.com"
												/>
											</div>
											<div className="md:col-span-2">
												<label className="block text-sm font-medium text-foreground mb-2">
													Địa chỉ <span className="text-destructive">*</span>
												</label>
												<input
														type="text"
														name="address"
														value={formData.address}
														onChange={handleInputChange}
														className="input-premium"
														placeholder="Số nhà, đường, phường/xã"
														required
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-foreground mb-2">
													Tỉnh/Thành phố <span className="text-destructive">*</span>
												</label>
												<input
														type="text"
														name="city"
														value={formData.city}
														onChange={handleInputChange}
														className="input-premium"
														placeholder="Hà Nội"
														required
												/>
											</div>
										</div>
									</motion.div>
									
									{/* Payment Method */}
									<motion.div
											initial={{opacity: 0, y: 20}}
											animate={{opacity: 1, y: 0}}
											transition={{delay: 0.1}}
											className="card-premium p-6"
									>
										<h2 className="font-semibold text-foreground mb-6 flex items-center gap-2">
											<span
													className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
											Phương thức thanh toán
										</h2>
										
										<div className="space-y-3">
											<label
													className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
															paymentMethod === 'cod'
																	? 'border-primary bg-primary/5'
																	: 'border-border hover:border-primary/50'
													}`}
											>
												<input
														type="radio"
														name="payment"
														value="cod"
														checked={paymentMethod === 'cod'}
														onChange={() => setPaymentMethod('cod')}
														className="sr-only"
												/>
												<Truck
														className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-primary' : 'text-muted-foreground'}`}/>
												<div>
													<p className="font-medium text-foreground">Thanh toán khi nhận hàng (COD)</p>
													<p className="text-sm text-muted-foreground">Trả tiền mặt khi nhận hàng</p>
												</div>
											</label>
											
											<label
													className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
															paymentMethod === 'bank'
																	? 'border-primary bg-primary/5'
																	: 'border-border hover:border-primary/50'
													}`}
											>
												<input
														type="radio"
														name="payment"
														value="bank"
														checked={paymentMethod === 'bank'}
														onChange={() => setPaymentMethod('bank')}
														className="sr-only"
												/>
												<CreditCard
														className={`w-5 h-5 ${paymentMethod === 'bank' ? 'text-primary' : 'text-muted-foreground'}`}/>
												<div>
													<p className="font-medium text-foreground">Chuyển khoản ngân hàng</p>
													<p className="text-sm text-muted-foreground">Chuyển khoản trước khi giao</p>
												</div>
											</label>
										</div>
									</motion.div>
									
									{/* Note */}
									<motion.div
											initial={{opacity: 0, y: 20}}
											animate={{opacity: 1, y: 0}}
											transition={{delay: 0.2}}
											className="card-premium p-6"
									>
										<h2 className="font-semibold text-foreground mb-6 flex items-center gap-2">
											<StickyNote className="w-5 h-5 text-primary"/>
											Ghi chú đơn hàng
										</h2>
										<textarea
												name="note"
												value={formData.note}
												onChange={handleInputChange}
												rows={3}
												className="input-premium resize-none"
												placeholder="Ghi chú thêm về đơn hàng (thời gian nhận, yêu cầu đặc biệt...)"
										/>
									</motion.div>
								</div>
								
								{/* Right - Order Summary */}
								<div className="lg:col-span-1">
									<motion.div
											initial={{opacity: 0, y: 20}}
											animate={{opacity: 1, y: 0}}
											transition={{delay: 0.3}}
											className="card-premium p-6 sticky top-24"
									>
										<h2 className="font-semibold text-foreground mb-6">Đơn hàng của bạn</h2>
										
										{/* Items */}
										<div className="space-y-4 mb-6">
											{items.map((item) => (
													<div key={item.product.id} className="flex gap-3">
														<div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
															<img
																	src={item.product.image}
																	alt={item.product.name}
																	className="w-full h-full object-cover"
															/>
														</div>
														<div className="flex-1 min-w-0">
															<p className="font-medium text-foreground text-sm line-clamp-1">
																{item.product.name}
															</p>
															<p className="text-sm text-muted-foreground">
																{formatPrice(item.product.price)}
															</p>
															<div className="flex items-center gap-2 mt-1">
																<button
																		type="button"
																		onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
																		className="p-1 rounded border border-border hover:bg-muted"
																>
																	<Minus className="w-3 h-3"/>
																</button>
																<span className="text-sm w-6 text-center">{item.quantity}</span>
																<button
																		type="button"
																		onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
																		className="p-1 rounded border border-border hover:bg-muted"
																>
																	<Plus className="w-3 h-3"/>
																</button>
																<button
																		type="button"
																		onClick={() => removeItem(item.product.id)}
																		className="p-1 text-muted-foreground hover:text-destructive ml-auto"
																>
																	<Trash2 className="w-3 h-3"/>
																</button>
															</div>
														</div>
													</div>
											))}
										</div>
										
										{/* Totals */}
										<div className="border-t border-border pt-4 space-y-3">
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground">Tạm tính</span>
												<span className="text-foreground">{formatPrice(totalPrice)}</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground">Phí ship</span>
												<span className="text-foreground">
                        {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                      </span>
											</div>
											{totalPrice < 500000 && (
													<p className="text-xs text-accent">
														Thêm {formatPrice(500000 - totalPrice)} để miễn phí ship
													</p>
											)}
											<div className="flex justify-between pt-3 border-t border-border">
												<span className="font-semibold text-foreground">Tổng cộng</span>
												<span className="font-bold text-lg text-primary">{formatPrice(grandTotal)}</span>
											</div>
										</div>
										
										{/* Submit */}
										<button type="submit" className="btn-primary w-full mt-6">
											Đặt hàng
										</button>
										
										<p className="text-xs text-muted-foreground text-center mt-4">
											Bằng việc đặt hàng, bạn đồng ý với{' '}
											<Link href="/chinh-sach" className="text-primary hover:underline">
												điều khoản dịch vụ
											</Link>{' '}
											của chúng mình.
										</p>
									</motion.div>
								</div>
							</div>
						</form>
					</div>
				</section>
			</Layout>
	);
}
