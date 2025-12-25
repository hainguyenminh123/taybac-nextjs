import { ReactNode } from 'react';
import SEOHead from './SEOHead';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

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
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
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

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  breadcrumbs?: BreadcrumbItem[];
  product?: ProductSEO;
  faqs?: FAQItem[];
  noindex?: boolean;
}

export default function Layout({ 
  children, 
  title = 'Tây Bắc Store - Đặc sản Tây Bắc Điện Biên chuẩn vị | Thịt trâu gác bếp, Lạp xưởng, Măng khô',
  description = 'Mua đặc sản Tây Bắc Điện Biên chính gốc: Thịt trâu gác bếp, thịt lợn gác bếp, lạp xưởng, măng khô, ngô sấy giòn. Chọn lọc từ hộ dân vùng cao. Giao nhanh toàn quốc.',
  keywords,
  canonicalUrl,
  ogImage,
  ogType,
  breadcrumbs,
  product,
  faqs,
  noindex,
}: LayoutProps) {
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogImage={ogImage}
        ogType={ogType}
        breadcrumbs={breadcrumbs}
        product={product}
        faqs={faqs}
        noindex={noindex}
      />
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </>
  );
}

