import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WizardModalComponent } from "@app/shared/components";
import { FormControl, FormGroup, Validators } from "@angular/forms";


enum Steps {
    STEP_1 = 1,
    STEP_2 = 2,
    STEP_3 = 3
}


@Component({
    selector: 'app-demo-wizard-modal',
    templateUrl: './demo-wizard-modal.component.html',
    styleUrls: ['./demo-wizard-modal.component.scss']
})
export class DemoWizardModalComponent implements OnInit {
    @ViewChild(WizardModalComponent) wizardModal: WizardModalComponent;

    @Input() verticalSteps = false;
    @Input() dismissible = false;

    @Output() modalClosed = new EventEmitter<any>();
    @Output() submit = new EventEmitter<any>();

    wizardForm: FormGroup;

    showValidations = false;
    validationErrors = {};


    constructor() {
        this.wizardForm = new FormGroup({
            textInput: new FormControl('', Validators.required)
        });
    }

    ngOnInit() {
    }

    onStepChange(stepIndex) {
        switch (stepIndex) {
            case Steps.STEP_1:
            case Steps.STEP_2:
            case Steps.STEP_3:
            default:
                break;
        }
    }

    onWizardCancel() {
        this.modalClosed.emit();
    }

    onWizardSubmit() {
        this.submit.emit();
    }

    open() {
        this.wizardForm.reset();
        this.wizardModal.reset();
        this.wizardModal.open();
    }

    close() {
        this.wizardModal.close();
    }

    computeFormState() {
        return this.wizardForm.valid ? 'valid' : 'invalid';
    }

    isStep2FormValid() {
        return this.isFormValid();
    }

    private isFormValid() {
        this.validationErrors = {};
        this.showValidations = true;
        return this.wizardForm.valid;
    }

}
