# Stage 1: Build
FROM oven/bun:1 as builder
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .

# Stage 2: Runtime
FROM oven/bun:1 as runtime
WORKDIR /app
COPY --from=builder /app .
EXPOSE 5173
CMD ["bun", "start"]
