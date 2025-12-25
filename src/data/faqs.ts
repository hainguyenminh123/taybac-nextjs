export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "Sản phẩm có nguồn gốc từ đâu?",
    answer: "Tất cả sản phẩm đều được chọn lọc trực tiếp từ các hộ dân, hợp tác xã tại vùng Tây Bắc như Điện Biên, Sơn La, Lào Cai, Hà Giang. Chúng mình cam kết nguồn gốc rõ ràng, chất lượng đảm bảo.",
  },
  {
    id: "2",
    question: "Thời gian giao hàng mất bao lâu?",
    answer: "Đơn hàng nội thành Hà Nội: 1-2 ngày. Các tỉnh miền Bắc: 2-3 ngày. Miền Trung và Nam: 3-5 ngày. Chúng mình sẽ thông báo mã vận đơn ngay khi gửi hàng.",
  },
  {
    id: "3",
    question: "Có được đổi trả không?",
    answer: "Có! Nếu sản phẩm bị lỗi, hỏng do vận chuyển hoặc không đúng mô tả, bạn được đổi trả trong 7 ngày kể từ khi nhận hàng. Liên hệ hotline để được hỗ trợ nhanh nhất.",
  },
  {
    id: "4",
    question: "Thanh toán bằng cách nào?",
    answer: "Chúng mình hỗ trợ: Thanh toán khi nhận hàng (COD), chuyển khoản ngân hàng, và ví điện tử (MoMo, ZaloPay). Đơn từ 500k được miễn phí ship toàn quốc!",
  },
  {
    id: "5",
    question: "Sản phẩm bảo quản được bao lâu?",
    answer: "Tùy loại sản phẩm: Thịt sấy bảo quản ngăn mát 2-4 tháng, ngăn đông 6-8 tháng. Măng khô, ngô hạt giữ được 6-12 tháng ở nơi khô ráo. Chi tiết ghi trên bao bì từng sản phẩm.",
  },
];
