import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AmplifyAngularModule, AmplifyService} from 'aws-amplify-angular';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AmplifyAngularModule,

    ],
    providers: [
        AmplifyService,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule {
}
