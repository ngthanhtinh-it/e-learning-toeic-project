# React + Vite
# Cấu trúc thư mục chuẩn cho dự án Vite

Chào mừng bạn đến với dự án! Khi ứng dụng Vite của chúng ta phát triển lớn hơn với hàng tá hoặc hàng trăm file, việc có một cấu trúc thư mục rõ ràng và dễ quản lý là vô cùng cần thiết. Tài liệu này sẽ mô tả chi tiết kiến trúc thư mục được sử dụng trong dự án để giúp mã nguồn luôn gọn gàng và dễ bảo trì.

## Cấu trúc thư mục tổng quan

\`\`\`text
.
├── public/               # Các file tĩnh (static assets) không qua build
│   ├── favicon.ico
│   ├── robots.txt
│   └── ...
├── src/
│   ├── assets/           # File tĩnh (hình ảnh, SVG, fonts) cần import vào components
│   ├── components/       # Các UI components cơ bản, dùng chung (Button, Modal...)
│   ├── features/         # Đóng gói code theo từng tính năng cụ thể (Auth, Dashboard...)
│   ├── pages/            # Các component đại diện cho các tuyến đường (Routes)
│   ├── hooks/            # Custom hooks (useAuth, useDebounce...)
│   ├── utils/            # Các hàm tiện ích thuần túy (formatDate, generateId...)
│   ├── lib/              # Cấu hình tích hợp bên thứ 3 (Axios, Firebase...)
│   ├── styles/           # CSS toàn cục, biến theme, reset css...
│   ├── router/           # Khai báo định tuyến (Routes) và lazy-load
│   ├── App.tsx           # Component gốc chứa router, các providers
│   └── main.tsx          # Điểm khởi chạy (entry point) của ứng dụng
├── index.html            # File HTML gốc (entry point của Vite)
└── vite.config.ts        # File cấu hình Vite
\`\`\`

## 📝 Chi tiết chức năng từng phần

### `public/`
Chứa các file tĩnh mà Vite sẽ phục vụ nguyên bản, không qua bước đóng gói (bundling) hay biến đổi. Phù hợp cho các file được tham chiếu bằng đường dẫn tuyệt đối (ví dụ: `/logo.png`, `robots.txt`).

### `src/assets/`
Chứa các tài nguyên tĩnh như hình ảnh, SVG, fonts... không được truy cập công khai trực tiếp. Những tài nguyên này cần được `import` trực tiếp vào bên trong các components.

### `src/components/`
Nơi chứa các thành phần UI (UI components) cơ bản, độc lập và có thể tái sử dụng ở nhiều nơi (như `Button`, `Modal`, `Card`). 
- **Lưu ý:** Không nên chứa logic gọi API ở đây. Giữ chúng thật thuần túy. Nếu chúng bắt đầu dính líu đến dữ liệu phức tạp, hãy chuyển chúng sang thư mục `features/`.

### `src/features/`
Chứa các tính năng theo miền cụ thể (domain-specific). Mỗi thư mục con (ví dụ: `auth/`, `profile/`) sẽ chứa toàn bộ những gì liên quan đến tính năng đó bao gồm components riêng, API calls, state slices, v.v.
- **Quy tắc:** Đóng gói hoàn toàn. Nếu bạn xóa một thư mục tính năng ở đây, toàn bộ tính năng đó sẽ biến mất khỏi ứng dụng mà không gây lỗi dây chuyền.

### `src/pages/`
Chứa các components cấp độ Route. Đây là nơi kết hợp các tính năng (`features/`) và `components/` lại với nhau để tạo thành một trang hoàn chỉnh hiển thị cho người dùng.

### `src/hooks/`
Nơi chứa các Custom hooks. Giữ chúng thuần túy, dễ test và được đặt tên chuẩn xác (bắt đầu bằng chữ `use`).

### `src/utils/`
Các hàm tiện ích nhỏ và làm tốt một việc duy nhất. Ví dụ: định dạng ngày tháng, tạo chuỗi ngẫu nhiên. Nếu hàm có chứa tác dụng phụ (side-effects) với hệ thống ngoài, cân nhắc chuyển sang `lib/`.

### `src/lib/`
Khu vực dành cho các tích hợp bên ngoài: khởi tạo Axios client, cấu hình Firebase, thiết lập Analytics... Bất cứ thứ gì kết nối ứng dụng với thế giới bên ngoài đều được cấu hình ở đây.

### `src/styles/`
Nơi chứa Global CSS, các file mở rộng cấu hình Tailwind, biến theming (design tokens). 

### `src/router/`
Nơi định nghĩa các tuyến đường (routes) và thực hiện lazy-load các trang, giúp ứng dụng điều hướng trơn tru.

### `App.tsx` & `main.tsx`
- **`main.tsx`**: File thiết lập gốc, dùng để bootstrap ứng dụng.
- **`App.tsx`**: Component cấp cao nhất chứa router, state providers (Redux, Context...), đóng vai trò như "cửa chính" của ứng dụng.

## 💡 Các quy tắc lập trình (Best Practices)

1. **Sử dụng Alias:** Dự án hỗ trợ alias `@/` trỏ tới thư mục `src/` (đã được cấu hình trong `vite.config.ts`). Hãy sử dụng nó để các câu lệnh import gọn gàng hơn (VD: `import Button from '@/components/Button'`).
2. **Quản lý file `index.ts`:** Có thể sử dụng file `index` trong các thư mục để rút gọn đường dẫn import, nhưng đừng lạm dụng vì nó có thể làm cho quá trình gỡ lỗi (đọc stack traces) trở nên khó khăn.
3. **TypeScript:** Nếu một component hoặc feature cần các interface/types, hãy định nghĩa chúng ngay cạnh component đó hoặc trong một file `types.ts` nội bộ. Chỉ đưa ra ngoài thư mục tái sử dụng khi type đó được dùng cho nhiều tính năng khác nhau.

---
