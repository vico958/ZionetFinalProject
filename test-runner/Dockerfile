FROM node:20.10.0

# Create app directory
WORKDIR /test-runner

# Copy package.json and package-lock.json
COPY package.json ./

# Install app dependencies
RUN npm install

# Copy tests
COPY tests ./tests

# Command to run tests
CMD ["npm", "test"]
