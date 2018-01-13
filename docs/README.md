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

Compile the source code - in terminal go to root directory and run a clean install

```
mvn clean install
```

Create a run configuration in an IDE for a spring boot app and add an environment variable

```
Start class: com.cryptocaddy.services.auditing.Application
Environment variable: spring.config.name = config
```

End with an example of getting some data out of the system or using it for a little demo

## Deployment

If running from an IDE just use the run configuration described above.  
Otherwise you can use the Spring command line to run start the application (look up Spring CLI).
Last options is using jetty to run the application through a terminal.

## Built With

* [Spring Boot Framework](https://spring.io/docs/) - powerful framework to create stand-alone Spring application with production grade features and embedded Tomcat server
* [Maven](https://maven.apache.org/) - Dependency Management

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

//

## Authors

* **Nicholas Fields** 

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* //
