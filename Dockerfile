FROM node:18-alpine

WORKDIR /app

# Copy only server directory
COPY server/ ./server/

# Install dependencies in server
WORKDIR /app/server
RUN npm ci --only=production

# Set port
ENV PORT=5000
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
