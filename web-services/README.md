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
A Firebase authentication credential (https://firebase.google.com/)
```

### Firebase

This project uses Google Firebase for authentication.  You can create an account for free or use an existing one if you have it.  Once an account is created generate an admin sdk service account and download the json credentials.  Rename the file to firebase-credentials.json and place it in the web-services folder.

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

To debug a running spring docker container simply connect to the JVM debugging port available at port `50505` on the docker machine's ip.


