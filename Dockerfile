# Use latest Node.js
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy all project files to /app
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript code
RUN npm run build

# Run the server
CMD ["npm", "start"]
