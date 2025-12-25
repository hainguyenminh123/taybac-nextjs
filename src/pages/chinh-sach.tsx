import { motion } from 'framer-motion';
import { Truck, RefreshCw, Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useEffect } from 'react';

const policies = [
  {
    id: 'shipping',
    icon: Truck,
    title: 'Chính sách giao hàng',
    content: [
      {
        heading: 'Phạm vi giao hàng',
        text: 'Tây Bắc Store giao hàng toàn quốc qua các đối tác vận chuyển uy tín: Giao Hàng Nhanh, Viettel Post, J&T Express.',
      },
      {
        heading: 'Thời gian giao hàng',
        text: 'Nội thành Hà Nội: 1-2 ngày làm việc. Các tỉnh miền Bắc: 2-3 ngày. Miền Trung và Nam: 3-5 ngày. Thời gian có thể thay đổi vào dịp lễ, Tết.',
      },
      {
        heading: 'Phí giao hàng',
        text: 'Miễn phí ship cho đơn hàng từ 500.000đ. Đơn dưới 500.000đ: phí ship 30.000đ (toàn quốc). Phí ship thực tế được hiển thị khi thanh toán.',
      },
      {
        heading: 'Theo dõi đơn hàng',
        text: 'Sau khi gửi hàng, bạn sẽ nhận được mã vận đơn qua SMS/Zalo để theo dõi tình trạng đơn hàng.',
      },
    ],
  },
  {
    id: 'returns',
    icon: RefreshCw,
    title: 'Đổi trả & Hoàn tiền',
    content: [
      {
        heading: 'Điều kiện đổi trả',
        text: 'Sản phẩm được đổi trả trong vòng 7 ngày kể từ khi nhận hàng nếu: sản phẩm bị lỗi do nhà sản xuất, sản phẩm không đúng mô tả, hàng bị hư hỏng do vận chuyển.',
      },
      {
        heading: 'Quy trình đổi trả',
        text: 'Liên hệ hotline hoặc Zalo thông báo lỗi sản phẩm. Gửi hình ảnh/video sản phẩm lỗi. Đóng gói và gửi lại sản phẩm theo hướng dẫn. Nhận sản phẩm thay thế hoặc hoàn tiền trong 3-5 ngày.',
      },
      {
        heading: 'Trường hợp không được đổi trả',
        text: 'Sản phẩm đã qua sử dụng một phần đáng kể. Sản phẩm hết hạn sử dụng do bảo quản không đúng cách. Sản phẩm không còn tem, nhãn, bao bì gốc.',
      },
      {
        heading: 'Hoàn tiền',
        text: 'Hoàn tiền qua chuyển khoản ngân hàng trong vòng 3-5 ngày làm việc sau khi xác nhận yêu cầu đổi trả hợp lệ.',
      },
    ],
  },
  {
    id: 'privacy',
    icon: Shield,
    title: 'Chính sách bảo mật',
    content: [
      {
        heading: 'Thu thập thông tin',
        text: 'Chúng tôi thu thập thông tin cá nhân khi bạn đặt hàng: họ tên, số điện thoại, email, địa chỉ giao hàng. Thông tin này chỉ được sử dụng để xử lý đơn hàng và liên lạc với bạn.',
      },
      {
        heading: 'Bảo vệ thông tin',
        text: 'Thông tin cá nhân của bạn được bảo mật theo tiêu chuẩn an toàn cao nhất. Chúng tôi không chia sẻ, bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba.',
      },
      {
        heading: 'Chia sẻ thông tin',
        text: 'Thông tin của bạn có thể được chia sẻ với đối tác vận chuyển để giao hàng. Chúng tôi yêu cầu các đối tác này bảo mật thông tin của bạn.',
      },
      {
        heading: 'Quyền của bạn',
        text: 'Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân của mình. Liên hệ hotline hoặc email để thực hiện yêu cầu.',
      },
    ],
  },
];

export default function Policies() {
  const router = useRouter();

  useEffect(() => {
    const hash = router.asPath.split('#')[1];
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [router.asPath]);

  return (
    <Layout
      title="Chính sách | Tây Bắc Store"
      description="Chính sách giao hàng, đổi trả, hoàn tiền và bảo mật của Tây Bắc Store."
    >
      {/* Hero */}
      <section className="bg-secondary/50 grid place-items-center min-h-[25vh]">
        <div className="container-main text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            Chính sách
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-2 text-lg"
          >
            Giao hàng, đổi trả và bảo mật
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container-main">
          <div className="max-w-4xl mx-auto space-y-12">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.id}
                id={policy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <policy.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground">{policy.title}</h2>
                </div>

                <div className="card-premium p-6 md:p-8 space-y-6">
                  {policy.content.map((section, sIndex) => (
                    <div key={sIndex}>
                      <h4 className="font-semibold text-foreground mb-2">{section.heading}</h4>
                      <p className="text-md text-muted-foreground">{section.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center pt-8"
            >
              <p className="text-muted-foreground mb-4 text-lg">
                Có thắc mắc về chính sách? Liên hệ ngay với chúng mình!
              </p>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-lg"
              >
                Liên hệ hỗ trợ
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
