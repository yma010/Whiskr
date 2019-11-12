FROM node:12.9.1-alpine
ENV NODE_ENV=production
WORKDIR /whiskr_backend
COPY package.json /whiskr_backend/package.json
RUN npm install --silent
COPY . /whiskr_backend
CMD ["npm", "start"]