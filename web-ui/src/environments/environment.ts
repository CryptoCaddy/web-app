// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebase: {
    apiKey: 'AIzaSyBdQW4jsjYPUhAmsjJmm_QCbM_2i3uw4Lc',
    authDomain: 'caddy-web-app.firebaseapp.com',
    databaseURL: 'https://caddy-web-app.firebaseio.com',
    projectId: 'caddy-web-app',
    storageBucket: 'caddy-web-app.appspot.com',
    messagingSenderId: '769405691541',
  },

};
