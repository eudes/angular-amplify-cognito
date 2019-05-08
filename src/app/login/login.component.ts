import {AfterViewInit, ApplicationRef, ChangeDetectorRef, Component, OnChanges, OnInit, Output} from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {AuthClass} from 'aws-amplify';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    loggedIn = false;

    constructor(
        private amplifyService: AmplifyService,
        private ref: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
        this.amplifyService.authState().subscribe((state) => this.update(state));
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
