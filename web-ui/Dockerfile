FROM nginx:latest

#install dependencies
RUN apt-get update
RUN apt-get install -y gnupg bzip2

#install node
ADD https://deb.nodesource.com/setup_7.x /opt/node_ppa.sh
RUN chmod u+x /opt/node_ppa.sh
RUN /opt/node_ppa.sh
RUN apt-get install -y nodejs

#copy our source code to the docker container
RUN mkdir /opt/client
COPY . /opt/client
WORKDIR /opt/client

#compile
#RUN npm install
#RUN npm run build

#copy our static assets to nginx's root
RUN cp -r /opt/client/dist/* /usr/share/nginx/html

#set the entrypoint
CMD ["nginx", "-g", "daemon off;"]
