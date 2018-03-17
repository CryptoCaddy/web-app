FROM maven:3.5-jdk-8-slim as maven_install
RUN mkdir /code
#here we are specifically copying the poms and downloading their dependencies separate from the build process 
#this is so that the download doesn't get triggered each time we build.
WORKDIR /code
COPY pom.xml .
RUN ["mvn","verify","clean","--fail-never"] 

#now that downloads are out of way copy rest of sources over, and build it
COPY / .
RUN mvn package

FROM openjdk:8-jre-slim
WORKDIR /app
COPY --from=maven_install /code/target/auditing-1.0.jar /app 
#set jar executable bit
RUN /bin/bash -c 'ls -la; chmod +x auditing-1.0.jar; ls -la'

#debug entrypoint
#ENTRYPOINT ["java","-Xdebug ","-Xrunjdwp:transport=dt_socket,address=50505,server=y","-Djava.security.egd=file:/dev/./urandom","-jar","auditing-1.0.jar"]
#release entrypoint
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","auditing-1.0.jar"]

