# Stage 1: Install dependencies
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of the backend code
COPY . .

# Stage 2: Create smaller production image
FROM node:20-slim

WORKDIR /app

# Copy installed dependencies and source code from builder
COPY --from=builder /app .

# Expose backend port
EXPOSE 5001

# Use PM2 for production process management (optional but recommended)
RUN npm install pm2 -g

# Start the backend
CMD ["pm2-runtime", "src/index.js"]
