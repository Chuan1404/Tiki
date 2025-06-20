# DevChu Ecommerce

## 1. Introduction

**DevChu Ecommerce** là một hệ thống thương mại điện tử lấy cảm hứng từ giao diện và tính năng của Tiki.vn. Dự án được phát triển với định hướng kiến trúc **microservice**, nhằm đảm bảo khả năng mở rộng, dễ bảo trì và dễ triển khai trên môi trường production.

---

## 2. System Overview

- **Kiến trúc**: Microservice-based
- **Phân tách dịch vụ** rõ ràng theo từng nghiệp vụ
- **Giao tiếp giữa các service**: Sử dụng RabbitMQ (asynchronous messaging) và HTTP RPC (Remote Procedure Call qua HTTP)
- **Triển khai**: thông qua Docker và cân bằng tải với NGINX

---

## 3. Features

### 3.1 Front-end

- Công nghệ sử dụng: ReactJS, SCSS, Ant Design
- Quản lý state: Redux Toolkit kết hợp Redux Saga

### 3.2 Back-end

- Công nghệ: Node.js, Express.js, TypeScript
- Cơ sở dữ liệu: MongoDB
- Đóng gói và triển khai: Docker, Docker Compose, NGINX

---

## 4. Microservices Breakdown

| Service Name      | Technology Stack        | Description                                 |
|-------------------|-------------------------|---------------------------------------------|
| **Auth Service**  | Node.js, MongoDB        | Đăng ký, đăng nhập, xác thực JWT, xác minh email |
| **User Service**  | Node.js, MongoDB        | Quản lý thông tin người dùng                |
| **Category Service** | Node.js, MongoDB     | Quản lý danh mục sản phẩm                   |
| **Brand Service** | Node.js, MongoDB        | Quản lý thương hiệu sản phẩm                |
| **Product Service** | Node.js, MongoDB      | Quản lý sản phẩm, tìm kiếm sản phẩm         |
| **Cart Service**  | Node.js, MongoDB        | Quản lý giỏ hàng của người dùng             |
| **Mail Service**  | Node.js, Nodemailer, Handlebars | Gửi email xác thực, email hệ thống với template HTML |

---

## 5. How to Run Locally

```bash
# Clone project
git clone https://github.com/Chuan1404/devchu-ecommerce.git

# Đi vào thư mục gốc
cd devchu-ecommerce

# Build và start các service
docker-compose up --build
