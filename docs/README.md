# Web-Services

CryptoCaddy Web Services project provides back end APIs for the apps to consume.  There are a core set of APIs that allow users to create an account, add one to many exchange APIs to their account, and then view their coin listings.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Java 8
Apache Maven (latest)
IntelliJ IDEA (or other IDE that can run a Spring Boot App)
Spring Boot CLI 
```

### Installing

Clone the web-services repo

```
git clone https://github.com/CryptoCaddy/web-services.git
```

IMPORTANT!! Tell git to skip the local config file during future commits. 
This is the file where hard coded API Keys/Secrets can be stored locally for testing purposes.

```
cd web-services
git update-index --skip-worktree config/config-local.yml
```


Compile the source code - in terminal go to root directory and run a clean install

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

## API Documentation

Currently only available on local host when service is running at localhost:{port-number}/api

## Built With

* [Spring Boot Framework](https://spring.io/docs/) - powerful framework to create stand-alone Spring application with production grade features and embedded Tomcat server
* [Maven](https://maven.apache.org/) - Dependency Management

## Contributing

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

//

## Authors

* **Jon Waggoner** 
* **Nicholas Fields** 

See also the list of [contributors](https://github.com/CryptoCaddy/web-services/contributors) who participated in this project.

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](https://github.com/CryptoCaddy/web-services/blob/master/LICENSE) file for details

## Acknowledgments

* CryptoCaddy uses the [XChange](https://github.com/timmolter/XChange) repo.
