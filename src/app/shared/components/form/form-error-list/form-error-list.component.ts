import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-form-error-list',
    templateUrl: './form-error-list.component.html',
    styleUrls: ['./form-error-list.component.scss']
})
export class FormErrorListComponent {

    @Input('errorMap')
    get errorMap() {
        return this.errorList;
    }

    set errorMap(errorMap) {
        this.currentErrorMap = errorMap;
        this.generateErrorMessages(this.currentErrorMap);
    }

    errorList = [];
    private currentErrorMap = {};

    constructor(private translateService: TranslateService) {
    }

    private generateErrorMessages(errorMap) {
        this.errorList = [];
        for (const errorKey in errorMap) {
            if (errorMap.hasOwnProperty(errorKey)) {
                this.errorList.push(this.translateService.instant(`general.components.form.errors.${errorKey}`, errorMap[errorKey]));
            }
        }
    }
}
