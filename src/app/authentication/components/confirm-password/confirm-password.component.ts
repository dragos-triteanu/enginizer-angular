import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "@app/authentication/services/authentication.service";
import { Log } from "ng2-logger";
import { ToastsManager } from "ng2-toastr";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-confirm-password',
    templateUrl: './confirm-password.component.html',
    styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {
    _logger = Log.create(ConfirmPasswordComponent.name);

    confirmPasswordForm: FormGroup;

    validationErrors;
    showValidations = false;
    loading = false;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private authService: AuthenticationService,
                private translateService: TranslateService,
                private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.confirmPasswordForm = new FormGroup({
            'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
            'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    onSubmit(confirmPasswordForm) {
        console.log(confirmPasswordForm);
        if (!this.isFormValid()) {
            return;
        }
        this.loading = true;

        this.activatedRoute.queryParams.subscribe((params) => {
            this.authService.resetPassword({
                password: confirmPasswordForm.value.password,
                confirmPassword: confirmPasswordForm.value.confirmPassword,
                token: params.token
            })
                .subscribe(
                    (data) => {
                        this._logger.info('confirmPassword:: API returned data: ', data);
                        this.router.navigate(['/auth/login']);
                        this.toastr.success(this.translateService
                            .instant('general.pages.confirmPassword.text.passwordChanged')
                        );
                    },
                    (error) => {
                        this._logger.info('confirmPassword:: API returned error: ', error);
                        this.resetForm();
                        this.loading = false;
                    })
        });
    }

    private resetForm() {
        this.showValidations = false;
        this.confirmPasswordForm.reset();
    }

    private isFormValid() {
        this.validationErrors = {};
        this.showValidations = true;

        return this.confirmPasswordForm.valid;
    }
}
