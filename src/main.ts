import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import Amplify from 'aws-amplify';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));


const oauth = {
    // Domain name
    domain: 'bluecrane-test-asdf.auth.eu-west-2.amazoncognito.com',

    // Authorized scopes
    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],

    // Callback URL
    redirectSignIn: 'http://localhost:4200/', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'

    // Sign out URL
    redirectSignOut: 'http://localhost:4200/logout', // or 'exp://127.0.0.1:19000/--/', 'myapp://main/'

    // 'code' for Authorization code grant,
    // 'token' for Implicit grant
    responseType: 'token',

    // optional, for Cognito hosted ui specified options
    options: {
        // Indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
        AdvancedSecurityDataCollectionFlag: true
    }
};

Amplify.configure({
    Auth: {
        // needed for federated sign in??
        oauth,

        // 'code' for Authorization code grant,
        // 'token' for Implicit grant
        responseType: 'token',

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'eu-west-2:2f90a6f8-caa2-4628-8149-c3d563b2c5b9',

        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'XX-XXXX-X',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-2_B1PYWqQiz',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '4pqn7la7eps3t8dhe3vrqp5ts8',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // // OPTIONAL - Configuration for cookie storage
        // // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //   domain: 'localhost',
        //   // OPTIONAL - Cookie path
        //   path: '/',
        //   // OPTIONAL - Cookie expiration in days
        //   expires: 365,
        //   // OPTIONAL - Cookie secure flag
        //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //   secure: false
        // },

        // OPTIONAL - customized storage object
        // storage: new MyStorage(),

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        // authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});

