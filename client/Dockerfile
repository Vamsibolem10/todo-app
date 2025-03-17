# Use a Debian-based Node.js image (not Alpine, since it may cause issues)
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire app
COPY . .

# Install Vite globally to avoid issues
RUN npm install -g vite

# Expose Vite's default port
EXPOSE 5173

# Run Vite dev server with correct environment
CMD ["npm", "run", "dev", "--", "--host"]
