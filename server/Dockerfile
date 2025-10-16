# /server/Dockerfile

# Use the official Puppeteer image which includes Chromium and all dependencies
FROM ghcr.io/puppeteer/puppeteer:22.9.0

# Switch to the root user to install dependencies, then back to the non-root 'pptruser'
USER root

# Set the working directory
WORKDIR /usr/src/app

# Copy package files first for better caching
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Puppeteer's user doesn't have permission for port 5000 by default, so we switch back to root
# For a production app, you'd handle permissions more granularly, but this is simplest for development.
USER root

# Expose the port
EXPOSE 5000

# Command to start the server
CMD [ "node", "server.js" ]