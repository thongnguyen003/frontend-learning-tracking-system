# Frontend – Learning Tracking System

### 1 Giới thiệu

Đây là Frontend của dự án Learning Tracking System, phục vụ cho mục đích học tập tại trường.

Frontend được xây dựng bằng ReactJS, dùng để hiển thị giao diện và tương tác với backend Laravel.

Dự án có sử dụng Cloudinary để lưu trữ hình ảnh (ảnh minh chứng, thành tích học tập,…).

---

### 2 Công nghệ sử dụng

- ReactJS  
- NodeJS  
- ExpressJS  
- Cloudinary  
- Multer  
- Axios  

---

### 3 Mục đích sử dụng Cloudinary

Cloudinary được sử dụng để:

- Lưu trữ hình ảnh online  
- Tránh lưu ảnh trực tiếp trong project  
- Giảm dung lượng server  
- Dễ quản lý và truy xuất hình ảnh  

Sau khi upload, Cloudinary sẽ trả về URL ảnh, URL này được lưu vào database thông qua backend Laravel.

---

### 4 Cấu hình môi trường

Dự án sử dụng file .env để lưu cấu hình Cloudinary.

Các thành viên trong nhóm cần:
- Tạo file .env
- Nhập thông tin Cloudinary của mình

Không commit file .env lên GitHub.

---

### 5 Cách chạy dự án

Cài đặt thư viện:
npm install

Chạy server upload ảnh:
node server/upload.js

Server upload chạy tại:
http://localhost:5000

Chạy frontend:
npm start

Truy cập:
http://localhost:3000

---

### 6 Ghi chú

- Frontend và backend hoạt động độc lập  
- Ảnh không lưu trong project  
- Dữ liệu hình ảnh được lưu trên Cloudinary  
- Dự án phục vụ mục đích học tập  
