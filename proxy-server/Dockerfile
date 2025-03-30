# Use the official Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./proxy-server/package.json ./proxy-server/yarn.lock ./proxy-server/tsconfig.json /app/

# Copy src
COPY ./proxy-server/src/ /app/src

# Install dependencies
RUN yarn install

# Build
RUN yarn build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "build/index.js"]