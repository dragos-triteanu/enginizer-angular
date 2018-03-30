import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Log } from "ng2-logger";
import { AuthenticationComponent } from "@app/authentication/pages/authentication/authentication.component";
import { AuthenticationService } from "@app/authentication/services/authentication.service";

@Component({
    selector: 'app-account-confirm',
    templateUrl: './account-confirm.component.html',
    styleUrls: ['./account-confirm.component.scss']
})
export class AccountConfirmComponent {
    _logger = Log.create(AuthenticationComponent.name);
    confirmed: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private authService: AuthenticationService) {

        this.activatedRoute.queryParams.subscribe((params) => {
            this.authService.confirmAccount(params)
                .subscribe(
                    (data) => {
                        this._logger.info('confirmAccount:: API returned data: ', data);
                        this.confirmed = true;
                    },
                    (error) => {
                        this._logger.info('confirmAccount:: API returned error: ', error);
                        this.confirmed = false;
                    })
        });
    }

}
