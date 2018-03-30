import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WizardModalComponent } from "@app/shared/components";

@Component({
    selector: 'app-create-projects-modal',
    templateUrl: './create-projects-modal.component.html',
    styleUrls: ['./create-projects-modal.component.scss']
})
export class CreateProjectsModalComponent implements OnInit {
    @ViewChild(WizardModalComponent) wizardModal: WizardModalComponent;

    @Input() verticalSteps = false;
    @Input() dismissible = false;

    @Output() modalClose = new EventEmitter<any>();
    @Output() submit = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    onStepChange($event: Event) {

    }

    onWizardCancel() {
        this.modalClose.emit();
    }

    onWizardSubmit() {
        this.submit.emit();
    }

    open() {
        this.wizardModal.open();
    }

    close() {
        this.wizardModal.close();
    }


}
