

<img src='https://github.com/CryptoCaddy/web-app/blob/master/web-ui/src/assets/img/caddy-cropped.png'/>

CryptoCaddy is a platform designed to automate the complicated process of generating gain/loss documents for tax purposes and live portfolio tracking based on exchange API keys, blockchain explorers and csv uploads. The web-app is the central component to the project and will be at the core of any peripheral mobile or desktop applications that become a part of the CryptoCaddy platform. 

This web-app repository is divided into 3 main components: web-services (Java/MySQL), fiat-engine (Python/MySQL) and web-ui (TypeScript/Angular). 


* The web-services directory is the root of the Java back end service for the web-app. It houses the central api that the web-ui and other peripherals will leverage to access private user and market level data. 
* The fiat-engine directory is the root of the Python service that will be used to access the historical fiat value of coins based on timestamps. It will keep the MySQL database up to date with historical market data and access that data as neccessary to convert historical coin values into fiat values when generating gain/loss data in the Java web-service.
* The web-ui is written with TypeScript and Angular. It uses the Java back end api for all data. It does not directly interface with the fiat-engine.


## Getting started
These instructions will get the application up and running via kubernetes minikube.
Please view the readmes within this project's subfolders for more specific development instructions or to run and develop each component individually without docker.
 
### Prerequisites
```
Docker 18.01+
Minikube 0.24.1+ https://github.com/kubernetes/minikube
kubectl
VirtualBox or Hyper-V (other minikube supported virtualization software should work)
```
If running windows ensure that the location minikube and kubectl is added to PATH

### Installing

Clone the repo
```
git clone https://github.com/CryptoCaddy/web-app.git
```

#### Setup
Start minikube by running the following (the cpu and memory are limited for the local environment)

For VirutalBox:
`````
minikube start --cpus=2 --memory=4096 --extra-config=apiserver.ServiceNodePortRange=1–50000
`````
For Hyper-V (note Hyper-V requires admin):
```
minikube start --cpus=2 --memory=4096 --vm-driver hyperv --extra-config=apiserver.ServiceNodePortRange=1–50000
```

Set up secrets to be used as environment variables passed to the containers on startup.  Replace these values with your own if you wish
```
 kubectl create secret generic database-secret --from-literal=MYSQL_DATABASE=database --from-literal=MYSQL_USER=user --from-literal=MYSQL_PASSWORD=password --from-literal=MYSQL_ROOT_PASSWORD=rootpassword
```

Set up minikube to use the built-in docker container registry:
For Linux and Mac: 
```
eval $(minikube docker-env) 
```
For Windows:
```
minikube docker-env | Invoke-Expression
```

On Mac or Linux set up docker so that our local kubernetes cluster can pull the images we build.  **Unsure if step is needed***
```
 docker run -d -p 8080:8080 --restart=always --name registry registry:2
```

Build the docker containers.
```
 docker build web-services/ --tag web-services:development
 docker build web-ui/ --tag web-ui:development
 docker build fiat-engine/ --tag fiat-engine:development
```

Tag the containers so that minikube can find them ***Not needed on windows, not sure on mac, need to test***
```
docker tag web-services localhost:8080/web-servicies
docker tag web-ui localhost:80/web-ui
```

Create and deploy the kubernetes services and deployments
```
kubectl create -f mysql/mysql-kubernetes.yaml 
kubectl create -f fiat-engine/fiat-engine-kubernetes.yaml 
kubectl create -f web-services/web-services-kubernetes.yaml 
kubectl create -f web-ui/web-ui-kubernetes.yaml 
```
Once deployed the applications should be running locally.  

To ensure the pods are up and running locally run:
```  
kubectl get pods
```
This should report that all pods are running.


To get the local ip addresses for the services:
```
minikube service web-ui --url
minikube service fiat-engine --url
minikube service web-services --url
minikube service mysql --url
```

#### Teardown
To tear down the install and stop minikube.
```
  kubectl delete deployment web-ui
  kubectl delete service web-ui

  kubectl delete deployment web-services
  kubectl delete service web-services
  
  kubectl delete deployment fiat-engine
  kubectl delete service fiat-engine

  kubectl delete deployment mysql
  kubectl delete services mysql
  
  
  minikube stop
```



#Todo:
Fiat engine
