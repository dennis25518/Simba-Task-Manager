FROM node:18-alpine

WORKDIR /app/server

# Copy package files
COPY server/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application code
COPY server/ .

# Set port
ENV PORT=5000
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
