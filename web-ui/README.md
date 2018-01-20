# CryptoCaddy - WebUi

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) v8
* [yarn](https://yarnpkg.com/) as Node.js package manager
* [Angular CLI](https://github.com/angular/angular-cli)

#### Example installation on Windows

Simply download and run the .msi installers on the following sites:
* [Node.js Download](https://nodejs.org/en/download/)
* [Yarn Download](https://yarnpkg.com/en/docs/install)

Then run the following
```bash
# install the Angular CLI as global package using yarn
yarn global add @angular/cli

# make sure everything works
ng --version
```

#### Example installation on macOS (using brew)

```bash
# install `n` for managing Node.js versions
brew install n

# install the latest stable node version using n
n latest

# install yarn using brew
brew install yarn --without-node

# install the Angular CLI as global package using yarn
yarn global add @angular/cli

# make sure everything works
ng --version
```

### Installing dependencies

To install the dependencies using yarn, simply run the following:

```bash
# make sure to call this in the `web-ui` folder
yarn
```

## Development

```bash
# start the development server
yarn start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The dev server proxies requests that are sent to `api/`.
To set the server that it points to set the environment variable `API_SERVER` before running the above command, you can use the following command to set it appropriately when using docker:

```
export API_SERVER="http://"$(docker-machine ip)":8080"
```

### Code scaffolding

Use `ng generate` (or `ng g`) to generate from blueprints.
For details, see the [documentation](https://github.com/angular/angular-cli/wiki/generate).

```bash
# generate a new component
ng generate component component-name

# generate a new ...
ng generate directive|pipe|service|class|guard|interface|enum|module <name>
```

### Further guides

* [Front End Architecture](./docs/architecture.md)
* [Styling Components](./docs/styling-components.md)

## Build

```bash
yarn build
```

The build artifacts will be stored in the `dist/` directory.
The script is configured to build a production build with the [AOT compiler](https://angular.io/guide/aot-compiler).

## Unit tests

```bash
yarn test
```

This will execute the unit tests via [jest](https://facebook.github.io/jest/).

``` bash
yarn tdd
```

This will enter watch mode for testing only files that are affected by changes in git's working
directory (= files that are changed but not staged).

## End-to-end tests

```bash
yarn e2e
```

This will execute e2e tests via [Protractor](http://www.protractortest.org/).

## Linting

```bash
yarn lint
```

This will lint the codebase using [TSLint](https://palantir.github.io/tslint/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
