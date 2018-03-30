import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/map';
import { JWTUser } from "@models/jwt-data.model";
import { AuthenticationService } from "@app/authentication/services/authentication.service";
import { Log } from "ng2-logger";
import { Router } from "@angular/router";
import { AuthenticationComponent } from "@app/authentication/pages/authentication/authentication.component";

@Component({
    selector: 'app-credentials-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})

export class LoginFormComponent implements OnInit {
    _logger = Log.create(AuthenticationComponent.name);
    user: JWTUser;
    loginForm: FormGroup;
    validationErrors;
    showValidations = false;

    constructor(private router: Router,
                private authService: AuthenticationService) {
    }

    ngOnInit() {
        // Creating the Login Form
        this.loginForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', Validators.required)
        });
    }

    // Sends form to Parent Component
    onSubmit(loginForm) {
        if (!this.isFormValid()) {
            return;
        }

        this.authService.login(loginForm.value)
            .subscribe(
                (data: any) => {
                    this._logger.info('handleLogin:: API returned data: ', data);

                    this.router.navigate(['/companies']);
                },
                (error: any) => {
                    this._logger.error('handleError:: API returned error: ', error);
                }
            );
    }

    private isFormValid() {
        this.validationErrors = {};
        this.showValidations = true;

        return this.loginForm.valid;
    }
}
