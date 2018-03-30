import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "@app/authentication/services/authentication.service";
import { Log } from 'ng2-logger';
import { ToastsManager } from "ng2-toastr";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
    _logger = Log.create(RegisterFormComponent.name);

    registerForm: FormGroup;
    validationErrors;
    showValidations = false;
    loading = false;

    constructor(private authService: AuthenticationService,
                private translateService: TranslateService,
                private router: Router,
                private toastr: ToastsManager) {
    }

    ngOnInit() {
        // Creating the Register Form
        this.registerForm = new FormGroup({
            'firstName': new FormControl('', Validators.required),
            'lastName': new FormControl('', Validators.required),
            'dateOfBirth': new FormControl('', Validators.required),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
            'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    onSubmit(registerForm) {
        if (!this.isFormValid()) {
            return;
        }
        this.loading = true;
        this.authService.createUser(registerForm.value)
            .subscribe(
                (data: any) => {
                    this._logger.info('createUser:: API returned data: ', data);
                    this.router.navigate(['/auth/login']);
                    this.toastr.success(this.translateService
                        .instant('general.pages.register.text.registerSuccess')
                    );
                },
                (error) => {
                    this._logger.error('createUser:: API returned error: ', error);
                    this.loading = false;
                }
            )
    }

    private isFormValid() {
        this.validationErrors = {};
        this.showValidations = true;

        return this.registerForm.valid;
    }
}
