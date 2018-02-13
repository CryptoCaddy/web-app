#using slim due to https://github.com/docker-library/openjdk/issues/145?imz_s=v5a9g9pn2ri0t59s8olrlsaag3
FROM openjdk:9-jdk-slim

#install maven
RUN apt-get update && apt-get install -y maven

#create our source code folder in the docker container
RUN mkdir /code
WORKDIR /code
COPY . .