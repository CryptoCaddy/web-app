#using a node image to build our frontend
FROM node:latest

#create the folder for our source code
RUN mkdir /opt/client

#copy and install only our dependencies, this is to prevent docker from clearing them if there's no change
COPY package.json yarn.lock /opt/client/
WORKDIR /opt/client
RUN yarn install

#copy the rest of our source code to the docker container and compile
COPY . /opt/client
RUN yarn build

#nginx is the actual image we'll be running
FROM nginx:latest

#copy our built static assets to nginx's root
COPY --from=0 /opt/client/dist /usr/share/nginx/html

#set the entrypoint
CMD ["nginx", "-g", "daemon off;"]
