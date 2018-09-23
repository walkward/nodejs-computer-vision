# A node.js v8 box
FROM justadudewhohacks/opencv-nodejs:node9-opencv3.4.1-contrib

# Switch to working directory
WORKDIR /usr/app

# Install dependencies
COPY package.json .
RUN npm install --quiet

# Copy contents of local folder to `WORKDIR`
COPY . .
