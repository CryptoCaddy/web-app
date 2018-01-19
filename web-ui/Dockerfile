FROM nginx:latest

#install dependencies
RUN apt-get update
RUN apt-get install -y gnupg bzip2

#add node source list
ADD https://deb.nodesource.com/setup_8.x /opt/node_ppa.sh
RUN chmod u+x /opt/node_ppa.sh
RUN /opt/node_ppa.sh

#add yarn source list
RUN apt-key adv --keyserver pgp.mit.edu --recv 9D41F3C3
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update

#install node and yarn
RUN apt-get install -y nodejs yarn

#copy our source code to the docker container
RUN mkdir /opt/client
COPY . /opt/client
WORKDIR /opt/client

#compile
RUN yarn install
RUN yarn build

#run unit tests
# RUN yarn test

#copy our static assets to nginx's root
RUN cp -r /opt/client/dist/* /usr/share/nginx/html

#purge source files
RUN rm -rf /opt/client

#set the entrypoint
CMD ["nginx", "-g", "daemon off;"]
