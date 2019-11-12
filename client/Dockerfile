FROM node:12.9.1-alpine
ENV NODE_ENV=production
WORKDIR /whiskr_client
COPY package.json /whiskr_client/package.json
RUN npm install --silent
COPY . /whiskr_client
CMD ["npm", "run", "build"]