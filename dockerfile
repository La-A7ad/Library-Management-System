# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Create and set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the source code
COPY . .

# Expose port (optional, just for clarity)
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "start"]

