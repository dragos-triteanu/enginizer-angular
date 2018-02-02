import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';


import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-credentials-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class CredentialsFormComponent implements OnInit {
    @ViewChild('passwordInput') passwordInput: ElementRef;
    @ViewChild('emailInput') emailInput: ElementRef;

    @Output('successfulLogin')
    successfulLogin: EventEmitter<any> = new EventEmitter();

    @Output('loginFailure')
    loginFailure: EventEmitter<any> = new EventEmitter();

    loginError: boolean;
    isLoading: boolean;

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {

    }

    onLogin(loginForm: NgForm) {
        this.blurFormInputs();
        this.isLoading = true;
        this.authService.login(loginForm.value).subscribe(
            (data: any) => {
                this.isLoading = false;
                this.successfulLogin.emit(data);
            },
            (error: any) => {
                this.isLoading = false;
                this.loginFailure.emit(error);
                this.loginError = true;
            }
        );
    }

    private blurFormInputs() {
        if (this.emailInput) {
            this.emailInput.nativeElement.blur();
        }
        if (this.passwordInput) {
            this.passwordInput.nativeElement.blur();
        }
    }
}
