FROM node:12.9.1-alpine AS build
ENV NODE_ENV=production
WORKDIR /whiskr_client
COPY /client/package.json /whiskr_client/package.json
RUN npm install --silent
COPY /client /whiskr_client
RUN npm run build

FROM node:12.9.1-alpine
ENV NODE_ENV=production
WORKDIR /whiskr
COPY /backend/package.json /whiskr/package.json
RUN npm install --silent
COPY /backend /whiskr
WORKDIR /whiskr/server/build
COPY --from=build /whiskr_client/build/ /whiskr/build/
CMD ["npm", "start"]