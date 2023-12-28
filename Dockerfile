# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN bun install

# Sao chép mã nguồn của ứng dụng vào thư mục làm việc
COPY . .

# Mở cổng 3000, có thể điều chỉnh tùy ý
EXPOSE 5173

# Khởi chạy ứng dụng
CMD ["bun", "start"]