#use Node.js official image
FROM node:18

# create app directory
WORKDIR /app

# copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# copy source code
COPY . .

# Expose Port 
EXPOSE 3242

# strat app
CMD [ "npm", "strat" ]