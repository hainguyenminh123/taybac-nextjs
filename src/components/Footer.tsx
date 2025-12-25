import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { TrongDongBand } from '@/components/TrongDongPattern';

const footerLinks = {
  shop: [
    { label: 'Tất cả sản phẩm', href: '/san-pham' },
    { label: 'Thịt sấy', href: '/san-pham?danh-muc=Sấy' },
    { label: 'Đồ khô', href: '/san-pham?danh-muc=Khô' },
    { label: 'Hạt & Ngũ cốc', href: '/san-pham?danh-muc=Hạt' },
  ],
  info: [
    { label: 'Về chúng mình', href: '/gioi-thieu' },
    { label: 'Liên hệ', href: '/lien-he' },
    { label: 'Chính sách giao hàng', href: '/chinh-sach#shipping' },
    { label: 'Đổi trả & Hoàn tiền', href: '/chinh-sach#returns' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/*<TrongDongBand />*/}
      
      <div className="container-fluid-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-heading font-bold">
                Tây Bắc <span className="text-earth-light">Store</span>
              </span>
            </Link>
            <p className="text-primary-foreground/80 text-md leading-relaxed mb-6">
              Đặc sản Tây Bắc chuẩn vị, chọn lọc từ hộ dân và HTX vùng cao. 
              Cam kết chất lượng, nguồn gốc rõ ràng.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-md text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Thông tin</h4>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-md text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-earth-light" />
                <div>
                  <p className="text-md text-primary-foreground/70">Hotline</p>
                  <a href="tel:0901234567" className="text-md font-medium hover:text-earth-light transition-colors">
                    0901 234 567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-earth-light" />
                <div>
                  <p className="text-md text-primary-foreground/70">Email</p>
                  <a href="mailto:hello@taybacstore.vn" className="text-md font-medium hover:text-earth-light transition-colors">
                    hello@taybacstore.vn
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-earth-light" />
                <div>
                  <p className="text-md text-primary-foreground/70">Địa chỉ</p>
                  <p className="text-md">Hà Nội, Việt Nam</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © 2025 Tây Bắc Store. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/chinh-sach#privacy"
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/chinh-sach"
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Điều khoản
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
