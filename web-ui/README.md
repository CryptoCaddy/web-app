# Crypto Caddy - WebUi

The Crypto Caddy Web UI is build with [Vue.js][] using [TypeScript][].

The following Vue plugins are involved to enhance the Vue experience:

* [**vue-router**](https://router.vuejs.org/en/) - Single Page Application Routing
* [**Vuex**](https://vuex.vuejs.org/en/) - State management inspired by [Flux](https://facebook.github.io/flux/docs/overview.html).
* [**Vuetify**](https://vuetifyjs.com/en/) - Material Component Framework


In addition, following libraries / technologies are used:

* [**Axios**](https://github.com/axios/axios) - Promise based HTTP Client
* [**Ramda**](http://ramdajs.com/) - Functional Programming Library
* [**SCSS**](https://sass-lang.com/) - CSS Preprocessor

## Getting Started

### Prerequisites

* [**Node.js**](https://nodejs.org/)
* [**yarn**](https://yarnpkg.com/) - preferred npm alternative

#### Example installation on Windows

Download and run the .msi installers on the following sites:
* [Node.js Download](https://nodejs.org/en/download/)
* [Yarn Download](https://yarnpkg.com/en/docs/install)

#### Example installation on macOS (using brew)

```bash
# install `n` for managing Node.js versions
brew install n

# install the latest stable node version using n
n latest

# install yarn using brew
brew install yarn --without-node
```

### Installing dependencies

To install the dependencies, run the following command:

```bash
# make sure to run this in the `web-ui` folder
yarn
```

### Frameworks

The UI is build with [Vue.js][]. If you're not familiar with Vue.js, have a look at their documentation to learn the basics.

To ensure type safety, the project uses [TypeScript][]. Make sure to get known with it, since the compiler is configured strict to ensure highest possible type safety during compilation.

## Development

```bash
# start the development server
yarn serve
```

Navigate to `http://localhost:4200/`. The webpack-dev-server will automatically inject changes to the page or reload the page if a hot reload is not possible.

The dev server proxies requests that are sent to `api/`. By default requests are proxied to the docker container running on port 8080. To change that behaviour set the environment variable `API_SERVER` to point to the desired server before starting the dev serve.

```bash
# Use the production api
export API_SERVER=http://cryptocaddy.io/api && yarn server
```

## Build

```bash
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Unit tests

```bash
yarn test
```

This will execute the unit tests via [jest](https://facebook.github.io/jest/).

``` bash
yarn test --watch
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

[Vue.js]: https://vuejs.org/
[TypeScript]: https://www.typescriptlang.org/
