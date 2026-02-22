FROM node:18-alpine

WORKDIR /app

# Copy server files
COPY server/package*.json ./server/

# Install dependencies
WORKDIR /app/server
RUN npm ci --only=production

# Copy server code
COPY server/ .

# Start server
EXPOSE 5000
CMD ["node", "server.js"]
