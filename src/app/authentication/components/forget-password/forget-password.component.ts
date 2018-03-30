import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Log } from "ng2-logger";
import { ToastsManager } from "ng2-toastr";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/authentication/services/authentication.service";

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
    _logger = Log.create(ForgetPasswordComponent.name);
    forgetPasswordForm: FormGroup;
    validationErrors;
    showValidations = false;
    loading = false;

    constructor(private authService: AuthenticationService,
                private translateService: TranslateService,
                private router: Router,
                private toastr: ToastsManager) {
    }

    ngOnInit() {
        this.forgetPasswordForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email])
        })
    }

    onSubmit(forgetPasswordForm) {
        if (!this.isFormValid()) {
            return;
        }

        this.loading = true;

        this.authService.forgetPassword(forgetPasswordForm.value)
        .subscribe(
            (data: any) => {
                this._logger.info('handleForgetPassword:: API returned data: ', data);
                this.router.navigate(['/auth/login']);
                this.toastr.success(this.translateService
                    .instant('general.pages.forgetPassword.text.emailFound')
                );
            },
            (error) => {
                this._logger.error('handleForgetPassword:: API returned error: ', error);
                this.resetForm();
                if (error && 404 === error.status) {
                    this.toastr.error(this.translateService.instant('general.pages.forgetPassword.text.emailNotFound'));
                }
                this.loading = false;
            }
        )
    }

    private resetForm() {
        this.showValidations = false;
        this.forgetPasswordForm.reset();
    }


    private isFormValid() {
        this.validationErrors = {};
        this.showValidations = true;

        return this.forgetPasswordForm.valid;
    }

}
