FROM node:18-alpine

WORKDIR /app

# Copy server
COPY server /app/server

# Install
WORKDIR /app/server
RUN npm install --production

EXPOSE 5000
CMD ["node", "server.js"]
