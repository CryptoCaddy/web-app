# Web-Services

CryptoCaddy Web Services project provides back end APIs for the apps to consume.  There are a core set of APIs that allow users to create an account, add one to many exchange APIs to their account, and then view their coin listings.

## Getting Started

These instructions will get the api server running on your local machine for development and testing purposes.

### Prerequisites

What you'll need the begin development:

```
Java 9
Apache Maven 3.5+
IntelliJ IDEA (or other IDE that can run a Spring Boot App)
```

### Installing

Compile the source code - in terminal go to the web-services directory and run a clean install

```
cd web-services
mvn clean install
```

Create a run configuration in an IDE for a spring boot app and add the following start class.

```
Start class: com.cryptocaddy.services.auditing.Application
```


## Deployment

If running from an IDE just use the run configuration described above.  
Otherwise you can use the Spring command line to run start the application (look up Spring CLI).
Another option is to use jetty to run the application through terminal.

## API Documentation

Currently only available when service is running locally and can be found at localhost:{port-number}/api

## Debugging with Docker

To debug a running spring docker container use the following commands in place of the previously provided commands.

```
docker-compose -f docker-compose.yml -f docker-compose.debug.yml build
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up -d
```

A JVM debugging port will now be available at port `50505` at the docker machine's ip.


