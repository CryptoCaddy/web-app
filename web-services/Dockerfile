FROM maven:3.5-jdk-8-slim as maven_install
RUN mkdir /code
WORKDIR /code
COPY . /code
RUN mvn package 

FROM openjdk:8-jre-slim
WORKDIR /app
COPY --from=maven_install /code/services/auditing/target/auditing-1.0.jar /app 
EXPOSE 8080
RUN /bin/bash -c 'ls -la; chmod +x auditing-1.0.jar; ls -la'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","auditing-1.0.jar"]
#CMD ["java", "-jar", "auditing-1.0.jar"]
    