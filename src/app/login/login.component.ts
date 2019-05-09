import {AfterViewInit, ApplicationRef, ChangeDetectorRef, Component, OnChanges, OnInit, Output} from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {APIClass, AuthClass} from 'aws-amplify';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    loggedIn = false;
    private accessToken: any;
    private idToken: any;
    private refreshToken: any;
    private accessTokenExp: Date;
    private accessTokenIat: Date;
    private idTokenExp: Date;
    private idTokenIat: Date;

    constructor(
        private amplifyService: AmplifyService,
        private ref: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
        this.amplifyService.authStateChange$.subscribe((state) => {
            this.update(state);
            const auth: AuthClass = this.amplifyService.auth();
            auth.currentSession()
                .then((session) => {
                    this.accessToken = this.pretty(session.getAccessToken());
                    this.idToken = this.pretty(session.getIdToken());
                    this.refreshToken = this.pretty(session.getRefreshToken());
                    this.accessTokenExp = new Date(session.getAccessToken().payload.exp*1000);
                    this.accessTokenIat = new Date(session.getAccessToken().payload.iat*1000);
                    this.idTokenExp = new Date(session.getAccessToken().payload.exp*1000);
                    this.idTokenIat = new Date(session.getAccessToken().payload.iat*1000);
                })
                .catch((ex) => {
                    console.log(ex);
                })
            ;
        });
    }

    pretty(obj) {
        return JSON.stringify(obj, null, '  ');
    }

    callRest() {
        const api: APIClass = this.amplifyService.api();
        const response = api.get('test', '/latest/bc/notification', null);
    }

    update(state) {
        console.log('State', state);
        this.loggedIn = !!state.user;
        // Force change detection
        this.ref.detectChanges();
    }

    login() {
        console.log('Login');
        const auth: AuthClass = this.amplifyService.auth();
        auth.federatedSignIn();
    }

    logout() {
        const auth: AuthClass = this.amplifyService.auth();
        auth.signOut();
    }
}
