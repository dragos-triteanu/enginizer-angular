import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalComponent } from '@components/modal/modal.component';
import { FileInputComponent } from '@components/form';

import { Log } from 'ng2-logger';

@Component({
    selector: 'app-intervention-modal',
    templateUrl: './intervention-modal.component.html',
    styleUrls: ['./intervention-modal.component.scss']
})
export class InterventionModalComponent implements OnInit {

    @ViewChild(ModalComponent) modal: ModalComponent;
    @ViewChild(FileInputComponent) fileInput: FileInputComponent;

    @Input() title: string;

    @Output() confirmEvent = new EventEmitter<any>();

    _logger = Log.create(InterventionModalComponent.name);

    interventionForm: FormGroup;

    showValidations = false;

    focused = true;
    isConfirmationInProgress = false;

    constructor() {
    }

    ngOnInit() {
        this.interventionForm = new FormGroup({
            description: new FormControl('', Validators.required),
            selectedFiles: new FormControl([]),
        });
    }

    open() {
        this.reset();
        this.modal.open();
    }

    close() {
        this.reset();
        this.modal.close();
        this.isConfirmationInProgress = false;
    }

    onCancel() {
        this.close();
    }

    onConfirm(event) {
        if (this.interventionForm.invalid) {
            this.showValidations = true;
            return;
        }

        this.isConfirmationInProgress = true;
        this.confirmEvent.emit({
            description: this.interventionForm.value.description,
            selectedFiles: this.interventionForm.value.selectedFiles
        });
    }

    private reset() {
        this.showValidations = false;
        this.interventionForm.reset();
        this.fileInput.fileInput.files = [];
    }

    selectFiles($event) {
        this.interventionForm.controls['selectedFiles'].setValue($event);
    }
}
