# ---------------- Build Stage ----------------
FROM node:18 AS build

WORKDIR /app

# copy package.json and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# copy source code
COPY . .

# ---------------- Runtime Stage ----------------
FROM node:18

WORKDIR /app

# copy everything from build stage
COPY --from=build /app ./

# expose correct port
EXPOSE 5050

# healthcheck (fix port + typo in /health)
HEALTHCHECK --interval=30s --timeout=5s --start-interval=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5050/health || exit 1

# start app
CMD ["npm", "start"]
