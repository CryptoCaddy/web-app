#using slim due to https://github.com/docker-library/openjdk/issues/145?imz_s=v5a9g9pn2ri0t59s8olrlsaag3
FROM openjdk:9-jdk-slim

#install maven
RUN apt-get update
RUN apt-get install -y maven

#create our source code folder in the docker container
RUN mkdir /code
WORKDIR /code

#set the entrypoint, we compile here instead of at build because when running we get a volume that we can use for maven's cache
CMD ["sh","-c","mvn package && java -jar services/auditing/target/auditing-1.0.jar"]