import {AfterViewInit, ApplicationRef, ChangeDetectorRef, Component, OnChanges, OnInit, Output} from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {AuthClass} from 'aws-amplify';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    isLoggedIn = false;
    user: any = null;
    asdf = 'texto';
    counter = 0;
    rand = 0;

    constructor(
        private amplifyService: AmplifyService,
        private ref: ChangeDetectorRef,
    ) {
        this.rand = Math.random();
    }

    ngOnInit() {
        this.amplifyService.authState().subscribe((state) => this.update(state));
    }

    update(state) {
        console.log(this);
        this.user = state.user;
        this.isLoggedIn = state.user !== null;
        console.log('State', state);
        console.log('isLoggedIn', this.isLoggedIn, new Date().toISOString());
        this.asdf = 'logged iN';
        this.counter += 1;
        // this.ref.detectChanges();
    }

    login() {
        console.log('Login');
        const auth: AuthClass = this.amplifyService.auth();
        auth.federatedSignIn()
            .then(creds => {
                console.log(creds);
            });
    }

    logout() {
        const auth: AuthClass = this.amplifyService.auth();
        auth.signOut();
    }

    changeValue() {
        this.isLoggedIn = !this.isLoggedIn;
    }
}
