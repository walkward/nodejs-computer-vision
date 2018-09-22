# A node.js v8 box
FROM justadudewhohacks/opencv-nodejs:node9-opencv3.4.1-contrib

# Create a working directory
RUN mkdir -p /usr/app

# Switch to working directory
WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

# Copy contents of local folder to `WORKDIR`
COPY . .

# Install dependencies (if any) in package.json
RUN npm install --quiet
