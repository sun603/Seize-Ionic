// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl:"http://ec2-3-17-151-69.us-east-2.compute.amazonaws.com:3000",
  apiUrl:"https://seize-test.herokuapp.com",
  firebase : {
    apiKey: "AIzaSyBLOOFB7s4NYHZJrgdY3QIMCjpeTl71igU",
    authDomain: "clean-healer-232121.firebaseapp.com",
    databaseURL: "https://clean-healer-232121.firebaseio.com",
    projectId: "clean-healer-232121",
    storageBucket: "clean-healer-232121.appspot.com",
    messagingSenderId: "12999297231"
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
 