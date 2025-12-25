import Layout from '@/components/Layout';
import HeroSlider from '@/components/home/HeroSlider';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import BestSellers from '@/components/home/BestSellers';
import ReviewsSection from '@/components/home/ReviewsSection';
import FAQSection from '@/components/home/FAQSection';
import {faqs} from '@/data/faqs';

export default function Index() {
  const faqsForSchema = faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <Layout
      title="Tây Bắc Store - Đặc sản Tây Bắc Điện Biên chuẩn vị | Thịt trâu gác bếp, Lạp xưởng, Măng khô"
      description="Mua đặc sản Tây Bắc Điện Biên chính gốc: Thịt trâu gác bếp, thịt lợn gác bếp, lạp xưởng, măng khô, ngô sấy giòn. Chọn lọc từ hộ dân vùng cao. Giao nhanh toàn quốc. Đổi trả 100%."
      keywords="đặc sản Tây Bắc, đặc sản Điện Biên, thịt trâu gác bếp, thịt lợn gác bếp, lạp xưởng, măng khô, ngô sấy, quà tặng Tây Bắc, mua đặc sản online, đặc sản vùng cao"
      canonicalUrl="/"
      faqs={faqsForSchema}
    >
      <HeroSlider />
      <FeaturedProducts />
      <WhyChooseUs />
      <BestSellers />
      <ReviewsSection />
      <FAQSection />
    </Layout>
  );
}
