import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {AnimatePresence, motion} from "framer-motion";
import {Menu, Search, ShoppingBag, X} from "lucide-react";

import {useCart} from "@/store/cart";

const navLinks = [
	{href: "/", label: "Trang chủ"},
	{href: "/san-pham", label: "Sản phẩm"},
	{href: "/gioi-thieu", label: "Về chúng mình"},
	{href: "/lien-he", label: "Liên hệ"},
];

export default function Navbar() {
	const router = useRouter();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const {toggleCart, getTotalItems} = useCart();
	const totalItems = getTotalItems();
	
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		handleScroll();
		window.addEventListener("scroll", handleScroll, {passive: true});
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [router.asPath]);
	
	const isActive = useMemo(() => {
		const path = router.asPath.split("?")[0];
		return (href: string) => {
			if (href === "/") return path === "/";
			return path === href || path.startsWith(`${href}/`);
		};
	}, [router.asPath]);
	
	return (
			<>
				<header
						className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-card border-b border-border ${
								isScrolled ? "shadow-soft" : "rounded-2xl mt-5 mb-6 mx-5 md:mx-6 lg:mx-8"
						}`}
				>
					<nav className="container-fluid-main">
						<div className="flex items-center justify-between h-16 md:h-20">
							{/* Logo */}
							<Link href="/" className="flex items-center gap-2 font-semibold text-xl text-foreground">
								<span className="text-primary">Tây Bắc</span>
								<span className="text-earth">Store</span>
							</Link>
							
							{/* Desktop Navigation */}
							<div className="hidden md:flex items-center gap-8">
								{navLinks.map((link) => (
										<Link
												key={link.href}
												href={link.href}
												className={`text-md font-medium transition-colors duration-200 hover:text-primary relative group ${
														isActive(link.href) ? "text-primary" : "text-muted-foreground"
												}`}
										>
											{link.label}
											<span
													className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
										</Link>
								))}
							</div>
							
							{/* Actions */}
							<div className="flex items-center gap-3">
								<Link
										href="/san-pham"
										className="p-2 text-muted-foreground hover:text-primary transition-colors hover:scale-105 duration-200"
										aria-label="Tìm kiếm"
								>
									<Search className="w-5 h-5"/>
								</Link>
								
								<button
										onClick={toggleCart}
										className="relative p-2 text-muted-foreground hover:text-primary transition-all hover:scale-105 duration-200"
										aria-label="Giỏ hàng"
								>
									<ShoppingBag className="w-5 h-5"/>
									{totalItems > 0 && (
											<motion.span
													initial={{scale: 0}}
													animate={{scale: 1}}
													className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center"
											>
												{totalItems}
											</motion.span>
									)}
								</button>
								
								{/* Mobile Menu Toggle */}
								<button
										onClick={() => setIsMobileMenuOpen((v) => !v)}
										className="p-2 md:hidden text-foreground hover:scale-105 transition-transform duration-200"
										aria-label="Menu"
								>
									{isMobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
								</button>
							</div>
						</div>
					</nav>
				</header>
				
				{/* Mobile Menu */}
				<AnimatePresence>
					{isMobileMenuOpen && (
							<motion.div
									initial={{opacity: 0, height: 0}}
									animate={{opacity: 1, height: "auto"}}
									exit={{opacity: 0, height: 0}}
									transition={{duration: 0.3}}
									className="fixed inset-x-0 top-16 z-40 bg-card border-b border-border shadow-medium md:hidden overflow-hidden"
							>
								<nav className="container-main py-6">
									<div className="flex flex-col gap-4">
										{navLinks.map((link, index) => (
												<motion.div
														key={link.href}
														initial={{opacity: 0, x: -20}}
														animate={{opacity: 1, x: 0}}
														transition={{delay: index * 0.1}}
												>
													<Link
															href={link.href}
															className={`font-medium py-2 block transition-colors ${
																	isActive(link.href) ? "text-primary" : "text-muted-foreground"
															}`}
													>
														{link.label}
													</Link>
												</motion.div>
										))}
									</div>
								</nav>
							</motion.div>
					)}
				</AnimatePresence>
			</>
	);
}
