# Image used for building
FROM node:alpine as build

RUN mkdir -p /tmp/app
WORKDIR /tmp/app

COPY package.json yarn.lock /tmp/app/
RUN yarn install --production=false --non-interactive

COPY . /tmp/app
RUN yarn build

# Image used for running
FROM nginx:alpine as final

COPY --from=build /tmp/app/dist /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]
