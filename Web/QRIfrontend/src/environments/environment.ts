// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://qr-identification.firebaseio.com/',
  firebase: {
    apiKey: "AIzaSyBGRKn38uZ-gjRp_OsISOk3XulKGr5-yzo",
    authDomain: "qr-identification.firebaseapp.com",
    databaseURL: "https://qr-identification.firebaseio.com",
    projectId: "qr-identification",
    storageBucket: "qr-identification.appspot.com",
    messagingSenderId: "243613300161"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
