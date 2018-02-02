import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { JWTUser } from '@models/jwt-data.model';
import { UserService } from '@services/user.service';
import { AuthenticationInfoModalComponent } from '@app/authentication/components';
import { Log } from 'ng2-logger';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
    _logger = Log.create(AuthenticationComponent.name);
    @ViewChild(AuthenticationInfoModalComponent) authInfoModal: AuthenticationInfoModalComponent;

    loginUsingCredentials = false;
    languageKey = 'user-language';
    focused = true;
    loginError = false;
    isLoginInProgress = false;
    userHasBadgeAuth = false;
    user: JWTUser;

    constructor(private router: Router,
                private authService: AuthenticationService,
                private translationService: TranslateService,
                private userService: UserService,
                private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.loginError = false;
    }

    onScan(badgeId: string) {
        this._logger.info('onScan:: Badge scan input received. Attempting login with badgeId:' + badgeId);
        this.isLoginInProgress = true;
        this.authService.loginWithBadgeId(badgeId).subscribe(
            (data: any) => {
                this.handleLogin(data);
                this.userHasBadgeAuth = true;
                this.isLoginInProgress = false;
            },
            (error: any) => {
                this.handleError(error);
                this.isLoginInProgress = false;
            }
        );
    }

    handleLogin(data) {
        this._logger.info('handleLogin:: API returned data: ', data);

        this.user = this.authService.getUserDetails();
        if (!this.user.badgeId) {
            this.userHasBadgeAuth = false;
            this.authInfoModal.open();
            return;
        }

        this.userHasBadgeAuth = true;
        this.authInfoModal.stopScanningProcess();

        if (!this.user.role) {
            this.authInfoModal.open();
            return;
        }

        this.loginError = false;
        this.authInfoModal.close();
        this.router.navigate(['/']);
    }

    insertBadge(badgeId) {
        this.authService.addUserBadgeId(badgeId).subscribe(
            (data: any) => {
                this.handleLogin(data);
                this.isLoginInProgress = false;
                this.authInfoModal.isScanninInProgress = false;
            },
            (error: any) => {
                this.handleError(error);
                this.isLoginInProgress = false;
                this.authInfoModal.isScanninInProgress = false;
            })
    }

    handleError(error) {
        this._logger.error('handleError:: API returned error: ', error);

        if (error.status === 401) {
            this.loginError = true;
        }
        if (error.status === 409) {
            this.authInfoModal.stopScanningProcess();
        }
    }

    onCredentialsSwitch() {
        this.loginUsingCredentials = !this.loginUsingCredentials;
    }

    translate(language) {
        this.translationService.use(language);
        localStorage.setItem(this.languageKey, language);
    }


    @HostListener('window:focus', ['$event'])
    onFocus() {
        this.focused = true;
    }

    @HostListener('window:blur', ['$event'])
    onBlur() {
        this.focused = false;
    }
}
