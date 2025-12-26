import {AnimatePresence, motion} from 'framer-motion';
import {Minus, Plus, ShoppingBag, Trash2, X} from 'lucide-react';
import Link from 'next/link';
import {useCart} from '@/store/cart';
import {formatPrice} from '@/data/products';

export default function CartDrawer() {
	const {items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice} = useCart();
	const totalPrice = getTotalPrice();
	
	return (
			<AnimatePresence>
				{isOpen && (
						<>
							{/* Backdrop */}
							<motion.div
									initial={{opacity: 0}}
									animate={{opacity: 1}}
									exit={{opacity: 0}}
									onClick={closeCart}
									className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50"
							/>
							
							{/* Drawer */}
							<motion.div
									initial={{x: '100%'}}
									animate={{x: 0}}
									exit={{x: '100%'}}
									transition={{type: 'spring', damping: 30, stiffness: 300}}
									className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card shadow-lift z-50 flex flex-col"
							>
								{/* Header */}
								<div className="flex items-center justify-between p-6 border-b border-border">
									<div className="flex items-center gap-3">
										<ShoppingBag className="w-5 h-5 text-primary"/>
										<h2 className="text-lg font-semibold">Giỏ hàng</h2>
										<span className="text-sm text-muted-foreground">
                  ({items.length} sản phẩm)
                </span>
									</div>
									<button
											onClick={closeCart}
											className="p-2 text-muted-foreground hover:text-foreground transition-colors"
											aria-label="Đóng"
									>
										<X className="w-5 h-5"/>
									</button>
								</div>
								
								{/* Content */}
								<div className="flex-1 overflow-y-auto p-6">
									{items.length === 0 ? (
											<div className="flex flex-col items-center justify-center h-full text-center">
												<ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4"/>
												<p className="text-muted-foreground mb-4">Giỏ hàng trống</p>
												<button
														onClick={closeCart}
														className="btn-primary"
												>
													Tiếp tục mua sắm
												</button>
											</div>
									) : (
											<div className="space-y-6">
												{items.map((item) => (
														<div key={`${item.product.id}-${item.selectedWeight || 'default'}`} className="flex gap-4">
															{/* Image */}
															<Link
																	href={`/san-pham/${item.product.id}`}
																	onClick={closeCart}
																	className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0"
															>
																<img
																		src={item.product.image}
																		alt={item.product.name}
																		className="w-full h-full object-cover"
																/>
															</Link>
															
															{/* Details */}
															<div className="flex-1 min-w-0">
																<Link
																		href={`/san-pham/${item.product.id}`}
																		onClick={closeCart}
																		className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
																>
																	{item.product.name}
																</Link>
																{item.selectedWeight && (
																		<p className="text-xs text-muted-foreground mt-0.5">
																			{item.selectedWeight}
																		</p>
																)}
																<p className="text-sm text-primary font-medium mt-0.5">
																	{formatPrice(item.selectedPrice ?? item.product.price)}
																</p>
																
																{/* Quantity */}
																<div className="flex items-center justify-between mt-3">
																	<div className="flex items-center gap-2">
																		<button
																				onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedWeight)}
																				className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
																				aria-label="Giảm"
																		>
																			<Minus className="w-3.5 h-3.5"/>
																		</button>
																		<span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
																		<button
																				onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedWeight)}
																				className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors"
																				aria-label="Tăng"
																		>
																			<Plus className="w-3.5 h-3.5"/>
																		</button>
																	</div>
																	
																	<button
																			onClick={() => removeItem(item.product.id, item.selectedWeight)}
																			className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
																			aria-label="Xóa"
																	>
																		<Trash2 className="w-4 h-4"/>
																	</button>
																</div>
															</div>
														</div>
												))}
											</div>
									)}
								</div>
								
								{/* Footer */}
								{items.length > 0 && (
										<div className="p-6 border-t border-border bg-card">
											<div className="flex items-center justify-between mb-4">
												<span className="text-muted-foreground">Tạm tính</span>
												<span className="text-lg font-semibold">{formatPrice(totalPrice)}</span>
											</div>
											<p className="text-xs text-muted-foreground mb-4">
												Phí ship sẽ được tính ở bước thanh toán
											</p>
											<Link
													href="/thanh-toan"
													onClick={closeCart}
													className="btn-primary w-full text-center block"
											>
												Thanh toán
											</Link>
										</div>
								)}
							</motion.div>
						</>
				)}
			</AnimatePresence>
	);
}
