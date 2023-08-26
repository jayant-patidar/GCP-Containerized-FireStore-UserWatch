# Use a base image with Node.js
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY . .


# Run unit tests
RUN npm test server.test.js


# Expose the port on which the microservice will run
EXPOSE 7002


# Start the microservice
CMD [ "node", "server.js" ]
