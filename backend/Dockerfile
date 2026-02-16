# Build stage
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Install git for fetching dependencies (if needed)
RUN apk add --no-cache git

# Set GOPROXY for reliable download
ENV GOPROXY=https://proxy.golang.org,direct

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build the application
# Disable CGO for static binary
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Run stage
FROM alpine:latest

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/main .

COPY --from=builder /app/.env* ./

# Install tzdata for timezone support
RUN apk add --no-cache tzdata
ENV TZ=Asia/Bangkok

# Expose port (adjust if your app uses a different port)
EXPOSE 8080

CMD ["./main"]
