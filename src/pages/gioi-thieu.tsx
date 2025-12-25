import { motion } from 'framer-motion';
import { Heart, Leaf, Users, Award } from 'lucide-react';
import Layout from '@/components/Layout';
import { TrongDongWatermark } from '@/components/TrongDongPattern';

const heroBg = '/hero-bg.jpg';

const values = [
  {
    icon: Leaf,
    title: 'Tự nhiên, Nguyên bản',
    description: 'Tất cả sản phẩm đều 100% tự nhiên, không chất bảo quản, không phụ gia công nghiệp.',
  },
  {
    icon: Users,
    title: 'Đồng hành cùng bà con',
    description: 'Mua trực tiếp từ hộ dân, HTX vùng cao với giá công bằng, hỗ trợ sinh kế bền vững.',
  },
  {
    icon: Heart,
    title: 'Tận tâm từng đơn hàng',
    description: 'Mỗi đơn hàng được đóng gói cẩn thận, tư vấn nhiệt tình, giao tận tay.',
  },
  {
    icon: Award,
    title: 'Cam kết chất lượng sản phẩm',
    description: 'Đổi trả 100% nếu sản phẩm không đúng mô tả hoặc bị lỗi do vận chuyển.',
  },
];

export default function About() {
  const breadcrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Về chúng mình', url: '/gioi-thieu' },
  ];

  return (
    <Layout
      title="Về Tây Bắc Store - Câu chuyện đặc sản Tây Bắc Điện Biên chuẩn vị"
      description="Tây Bắc Store - Cửa hàng đặc sản Tây Bắc uy tín. Chọn lọc thịt trâu gác bếp, lạp xưởng, măng khô từ hộ dân vùng cao Điện Biên, Sơn La, Lào Cai. Cam kết chất lượng, giao toàn quốc."
      keywords="Tây Bắc Store, cửa hàng đặc sản Tây Bắc, đặc sản Điện Biên uy tín, thịt trâu gác bếp chất lượng, nguồn gốc đặc sản vùng cao"
      canonicalUrl="/gioi-thieu"
      breadcrumbs={breadcrumbs}
    >
      {/* Hero */}
      <section className="relative pt-24 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Tây Bắc landscape"
            className="w-full h-full object-cover opacity-30"
          />
          {/*<div className="absolute inset-0 bg-gradient-to-b from-background via-background/10 to-background" />*/}
          {/* Trống Đồng watermark */}
          {/*<TrongDongWatermark opacity={0.05} className="text-primary" />*/}
        </div>

        <div className="container-main relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-md font-medium text-accent uppercase tracking-wider mb-4"
            >
              Câu chuyện của chúng mình
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6"
            >
              Đặc sản Tây Bắc
              <span className="block text-primary">chuẩn vị, tận tay</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Chúng mình tin rằng những sản phẩm tốt nhất đến từ những người nông dân tận tụy, 
              từ vùng đất giàu bản sắc, và được chế biến theo phương pháp truyền thống.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-spacing">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-md font-medium text-accent uppercase tracking-wider">
                Khởi nguồn
              </span>
              <h2 className="text-3xl font-bold text-foreground mt-2 mb-6">
                Từ tình yêu với vùng cao Tây Bắc
              </h2>
              <div className="text-lg space-y-4 text-muted-foreground">
                <p>
                  Tây Bắc Store ra đời từ những chuyến đi thực tế lên vùng cao Điện Biên, 
                  Sơn La, Lào Cai. Chúng mình được gặp gỡ những người nông dân, thưởng thức 
                  những món ăn đậm đà hương vị núi rừng mà khó tìm được ở nơi khác.
                </p>
                <p>
                  Từ đó, ý tưởng đơn giản được hình thành: mang những đặc sản chất lượng nhất, 
                  chuẩn vị nhất từ Tây Bắc về tận tay người tiêu dùng, đồng thời giúp bà con 
                  vùng cao có thêm nguồn thu nhập ổn định.
                </p>
                <p>
                  Mỗi sản phẩm tại Tây Bắc Store đều được chọn lọc kỹ lưỡng về nguồn gốc, 
                  chất lượng và cách chế biến. Chúng mình đến tận nơi, làm việc trực tiếp 
                  với bà con để đảm bảo sản phẩm đúng chuẩn trước khi đến tay bạn.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="card-premium p-6 text-center">
                <p className="text-4xl font-bold text-primary">500+</p>
                <p className="text-lg text-muted-foreground mt-1">Đơn hàng/tháng</p>
              </div>
              <div className="card-premium p-6 text-center">
                <p className="text-4xl font-bold text-primary">5</p>
                <p className="text-lg text-muted-foreground mt-1">Tỉnh vùng cao</p>
              </div>
              <div className="card-premium p-6 text-center">
                <p className="text-4xl font-bold text-primary">20+</p>
                <p className="text-lg text-muted-foreground mt-1">Hộ dân/HTX</p>
              </div>
              <div className="card-premium p-6 text-center">
                <p className="text-4xl font-bold text-primary">99%</p>
                <p className="text-lg text-muted-foreground mt-1">Hài lòng</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-md font-medium text-accent uppercase tracking-wider">
              Giá trị cốt lõi
            </span>
            <h2 className="text-3xl font-bold text-foreground mt-2">
              Những điều chúng mình tin tưởng
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-md text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-primary text-primary-foreground relative min-h-[410px] flex items-center">
        <TrongDongWatermark opacity={0.06} className="text-primary-foreground" />
        <div className="container-main text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Sẵn sàng khám phá hương vị Tây Bắc?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 mb-8 max-w-lg mx-auto text-lg"
          >
            Mua ngay những đặc sản chuẩn vị, được chọn lọc kỹ từ vùng cao Tây Bắc.
          </motion.p>
          <motion.a
            href="/san-pham"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-xl font-semibold
                       transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5 text-lg"
          >
            Xem sản phẩm
          </motion.a>
        </div>
      </section>
    </Layout>
  );
}
