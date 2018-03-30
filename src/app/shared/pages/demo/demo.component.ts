import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from "ng2-toastr";
import { TranslateService } from "@ngx-translate/core";
import { Log } from "ng2-logger";
import { ModalComponent, SidebarComponent } from "@app/shared/components";
import { DemoWizardModalComponent } from "@app/shared/pages/demo/components/demo-wizard-modal/demo-wizard-modal.component";
import { JWTUser } from "@app/shared/models";
import { AuthenticationService } from "@app/authentication/services/authentication.service";

@Component({
    selector: 'app-demo',
    templateUrl: 'demo.component.html',
    styleUrls: ['demo.component.scss']
})
export class DemoComponent implements OnInit {
    _logger = Log.create(DemoComponent.name);

    @ViewChild(ModalComponent) modal: ModalComponent;
    @ViewChild(SidebarComponent) sidebar: SidebarComponent;
    @ViewChild(DemoWizardModalComponent) demoWizardModal: DemoWizardModalComponent;

    form: FormGroup;
    showValidations = false;
    validationErrors = {};

    dropdownItems = [];
    wizardForm: FormGroup;
    currentUser: JWTUser;

    constructor(private toastr: ToastsManager,
                private authService: AuthenticationService,
                private translateService: TranslateService) {
        this.form = new FormGroup({
            textInput: new FormControl('', Validators.required),
            datepicker: new FormControl('', Validators.required),
            numberInput: new FormControl(0, [Validators.required, Validators.min(1)]),
            simpleDrodown: new FormControl(null),
            switchInput: new FormControl(''),
            textarea: new FormControl(''),
            range: new FormControl(0, Validators.min(50))
        });

        this.wizardForm = new FormGroup({
            textInput: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
        this.dropdownItems = [{id: 1, name: 'Lapte'},
            {id: 2, name: 'Brânză'},
            {id: 3, name: 'Carne'},
            {id: 4, name: 'Ouă'}];

        this.currentUser = this.authService.getUserDetails();
        this.currentUser.permissions = ['SAMPLE_PERMISSION'];
    }

    validateForm() {
        if (!this.isFormValid()) {
            return;
        }
        this._logger.info('validateForm:: For value is', this.form.value);
        this.toastr.success(this.translateService.instant('general.messages.demo.demoSuccess'));
    }

    computeFormState() {
        return this.form.valid ? 'valid' : 'invalid';
    }

    openModal() {
        this.modal.open();
    }

    // Wizard
    onWizardSubmit(modelObject: any) {
        this.demoWizardModal.close();
    }

    onWizardClose(modelObject: any) {
        this.demoWizardModal.close();
    }

    openWizardModal() {
        this.demoWizardModal.open();
    }

    toggleSidebar() {
        this.sidebar.toggle();
    }

    private isFormValid() {
        this.validationErrors = {};
        this.showValidations = true;
        return this.form.valid;
    }
}
