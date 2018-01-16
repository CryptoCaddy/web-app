# Web-UI

CryptoCaddy Web UI project provides the front end for the site.

## Getting Started

These instructions will get the frontend up and running on your local machine for development and testing purposes.

### Prerequisites

What you'll need the begin development:

```
Node.js 8.7+
NPM 5.4+
```

### Installing

Install dependencies

```
npm install
```

## Testing

Running the Webpack dev server
```
npm start
```
The webpack dev server is now serving content at `http://localhost:9000`.

The webpack dev server proxies requests that are sent to `api/`.
To set the server that it points to set the environment variable `API_SERVER` before running the above command, you can use the following command to set it appropriately:
```
export API_SERVER="http://"$(docker-machine ip)":8080"
```
