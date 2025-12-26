import Head from "next/head";

interface BreadcrumbItem {
	name: string;
	url: string;
}

interface ProductSEO {
	name: string;
	description: string;
	image: string;
	price: number;
	currency?: string;
	availability?: "InStock" | "OutOfStock" | "PreOrder";
	sku?: string;
	brand?: string;
	category?: string;
	reviewCount?: number;
	ratingValue?: number;
}

interface FAQItem {
	question: string;
	answer: string;
}

interface SEOHeadProps {
	title: string;
	description: string;
	keywords?: string;
	canonicalUrl?: string;
	ogImage?: string;
	ogType?: "website" | "article" | "product";
	breadcrumbs?: BreadcrumbItem[];
	product?: ProductSEO;
	faqs?: FAQItem[];
	noindex?: boolean;
}

export default function SEOHead({
	                                title,
	                                description,
	                                keywords,
	                                canonicalUrl,
	                                ogImage = "https://taybacstore.vn/og-image.jpg",
	                                ogType = "website",
	                                breadcrumbs,
	                                product,
	                                faqs,
	                                noindex = false,
                                }: SEOHeadProps) {
	const baseUrl = "https://taybacstore.vn";
	const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
	
	const breadcrumbSchema = breadcrumbs
			? {
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				itemListElement: breadcrumbs.map((item, index) => ({
					"@type": "ListItem",
					position: index + 1,
					name: item.name,
					item: `${baseUrl}${item.url}`,
				})),
			}
			: null;
	
	const productSchema = product
			? {
				"@context": "https://schema.org",
				"@type": "Product",
				name: product.name,
				description: product.description,
				image: product.image,
				brand: {
					"@type": "Brand",
					name: product.brand || "Tây Bắc Store",
				},
				category: product.category,
				sku: product.sku,
				offers: {
					"@type": "Offer",
					url: fullCanonicalUrl,
					priceCurrency: product.currency || "VND",
					price: product.price,
					availability: `https://schema.org/${product.availability || "InStock"}`,
					seller: {
						"@type": "Organization",
						name: "Tây Bắc Store",
					},
				},
				...(product.reviewCount && product.ratingValue
						? {
							aggregateRating: {
								"@type": "AggregateRating",
								ratingValue: product.ratingValue,
								reviewCount: product.reviewCount,
							},
						}
						: {}),
			}
			: null;
	
	const faqSchema = faqs && faqs.length > 0
			? {
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqs.map((faq) => ({
					"@type": "Question",
					name: faq.question,
					acceptedAnswer: {
						"@type": "Answer",
						text: faq.answer,
					},
				})),
			}
			: null;
	
	return (
			<Head>
				<title>{title}</title>
				<meta name="description" content={description}/>
				{keywords && <meta name="keywords" content={keywords}/>}
				<meta
						name="robots"
						content={
							noindex
									? "noindex, nofollow"
									: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
						}
				/>
				<link rel="canonical" href={fullCanonicalUrl}/>
				
				{/* Open Graph */}
				<meta property="og:type" content={ogType}/>
				<meta property="og:url" content={fullCanonicalUrl}/>
				<meta property="og:title" content={title}/>
				<meta property="og:description" content={description}/>
				<meta property="og:image" content={ogImage}/>
				<meta property="og:locale" content="vi_VN"/>
				<meta property="og:site_name" content="Tây Bắc Store"/>
				
				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image"/>
				<meta name="twitter:url" content={fullCanonicalUrl}/>
				<meta name="twitter:title" content={title}/>
				<meta name="twitter:description" content={description}/>
				<meta name="twitter:image" content={ogImage}/>
				
				{/* Structured Data */}
				{breadcrumbSchema && (
						<script
								type="application/ld+json"
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbSchema)}}
						/>
				)}
				{productSchema && (
						<script
								type="application/ld+json"
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={{__html: JSON.stringify(productSchema)}}
						/>
				)}
				{faqSchema && (
						<script
								type="application/ld+json"
								// eslint-disable-next-line react/no-danger
								dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}
						/>
				)}
			</Head>
	);
}
