import {useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import {Search, SlidersHorizontal, X} from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import {categories, getProductsByCategory} from '@/data/products';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'best-seller';

const sortOptions = [
	{value: 'default', label: 'Mặc định'},
	{value: 'price-asc', label: 'Giá thấp → cao'},
	{value: 'price-desc', label: 'Giá cao → thấp'},
	{value: 'best-seller', label: 'Bán chạy'},
];

export default function Shop() {
	const [selectedCategory, setSelectedCategory] = useState('Tất cả');
	const [sortBy, setSortBy] = useState<SortOption>('default');
	const [searchQuery, setSearchQuery] = useState('');
	const [showFilters, setShowFilters] = useState(false);
	
	const filteredProducts = useMemo(() => {
		let result = getProductsByCategory(selectedCategory);
		
		// Search filter
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
					(p) =>
							p.name.toLowerCase().includes(query) ||
							p.shortDesc.toLowerCase().includes(query) ||
							p.tag.toLowerCase().includes(query)
			);
		}
		
		// Sort
		switch (sortBy) {
			case 'price-asc':
				result = [...result].sort((a, b) => a.price - b.price);
				break;
			case 'price-desc':
				result = [...result].sort((a, b) => b.price - a.price);
				break;
			case 'best-seller':
				result = [...result].sort((a, b) => b.price - a.price); // Placeholder
				break;
			default:
				break;
		}
		
		return result;
	}, [selectedCategory, sortBy, searchQuery]);
	
	const breadcrumbs = [
		{name: 'Trang chủ', url: '/'},
		{name: 'Sản phẩm', url: '/san-pham'},
	];
	
	return (
			<Layout
					title="Sản phẩm Đặc sản Tây Bắc | Thịt trâu gác bếp, Lạp xưởng, Măng khô - Tây Bắc Store"
					description="Khám phá đặc sản Tây Bắc Điện Biên chính gốc: Thịt trâu gác bếp, thịt lợn sấy, lạp xưởng, măng khô, ngô sấy giòn. Giá tốt, giao hàng toàn quốc, đổi trả 7 ngày."
					keywords="mua thịt trâu gác bếp, thịt lợn sấy Tây Bắc, lạp xưởng Điện Biên, măng khô vùng cao, ngô sấy giòn, đặc sản Sơn La, đặc sản Lào Cai"
					canonicalUrl="/san-pham"
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
							Sản phẩm
						</motion.h1>
						<motion.p
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								transition={{delay: 0.1}}
								className="text-muted-foreground mt-2 text-lg"
						>
							Đặc sản Tây Bắc chuẩn vị, chọn lọc kỹ
						</motion.p>
					</div>
				</section>
				
				{/* Main Content */}
				<section className="section-spacing">
					<div className="container-main">
						{/* Search & Filters Bar */}
						<div className="flex flex-col md:flex-row gap-4 mb-8">
							{/* Search */}
							<div className="relative flex-1">
								<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
								<input
										type="text"
										placeholder="Tìm sản phẩm..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="input-premium pl-12"
								/>
								{searchQuery && (
										<button
												onClick={() => setSearchQuery('')}
												className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
										>
											<X className="w-4 h-4"/>
										</button>
								)}
							</div>
							
							{/* Sort */}
							<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value as SortOption)}
									className="select-premium md:w-48"
							>
								{sortOptions.map((option) => (
										<option key={option.value} value={option.value}>
											{option.label}
										</option>
								))}
							</select>
							
							{/* Mobile Filter Toggle */}
							<button
									onClick={() => setShowFilters(!showFilters)}
									className="md:hidden btn-secondary flex items-center justify-center gap-2"
							>
								<SlidersHorizontal className="w-4 h-4 text-md"/>
								Lọc
							</button>
						</div>
						
						<div className="flex flex-col md:flex-row gap-8">
							{/* Sidebar Filters */}
							<aside
									className={`md:w-56 flex-shrink-0 ${
											showFilters ? 'block' : 'hidden md:block'
									}`}
							>
								<div className="sticky top-24">
									<h3 className="font-bold text-foreground mb-4">Danh mục</h3>
									<div className="space-y-2">
										{categories.map((category) => (
												<button
														key={category}
														onClick={() => setSelectedCategory(category)}
														className={`w-full text-left px-4 py-2.5 rounded-xl text-lg font-semibold transition-all ${
																selectedCategory === category
																		? 'bg-primary text-primary-foreground font-medium'
																		: 'text-muted-foreground hover:bg-muted'
														}`}
												>
													{category}
												</button>
										))}
									</div>
								</div>
							</aside>
							
							{/* Products Grid */}
							<div className="flex-1">
								{filteredProducts.length === 0 ? (
										<div className="text-center py-16">
											<p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
										</div>
								) : (
										<>
											<p className="text-md text-muted-foreground mb-6">
												Hiển thị {filteredProducts.length} sản phẩm
											</p>
											<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
												{filteredProducts.map((product, index) => (
														<ProductCard key={product.id} product={product} index={index}/>
												))}
											</div>
										</>
								)}
							</div>
						</div>
					</div>
				</section>
			</Layout>
	);
}
