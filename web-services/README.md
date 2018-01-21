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

IMPORTANT!! Tell git to skip the local config file during future commits. This is the file where hard coded API Keys/Secrets can be stored locally for testing purposes.
```
cd web-services
git update-index --skip-worktree config/config-local.yml
```

Compile the source code - in terminal go to this directory and run a clean install

```
mvn clean install
```

Create a run configuration in an IDE for a spring boot app and add an environment variable

```
Start class: com.cryptocaddy.services.auditing.Application
Environment variable: spring.config.name = config
```


## Deployment

If running from an IDE just use the run configuration described above.  
Otherwise you can use the Spring command line to run start the application (look up Spring CLI).
Another option is to use jetty to run the application through terminal.

## Example Test

A quick way to see the current flow of the CryptoCaddy web-service is to navigate to the config-local.yml file in the config directory, and add your personal API keys.
Please ensure that the keys are set to read only permissions and whitelist your IP address with the exchanges if they offer it.
Also, ensure you followed the step above to ignore the config-local.yml file from future commits.

Once API keys/secrets are entered, you can test getting exchange wallets and trade history by running the service locally and navigate to the proper port and endpoints:

localhost:8080/api/testExchangeWallets

localhost:8080/api/testExchangeTrades 

Note: at this time a json conversion error occurs in the return type for the exchange trades due to a cycle. The trades themselves are being properly fetched and created though.

## Debugging with Docker

To debug a running spring docker container use the following commands in place of the previously provided commands.

```
docker-compose -f docker-compose.yml -f docker-compose.debug.yml build
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up -d
```

A JVM debugging port will now be available at port `50505` at the docker machine's ip.

## API Documentation

Currently only available on local host when service is running at localhost:8080/api
