import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "@app/shared/components";

@Component({
    selector: 'app-info-modal',
    templateUrl: './info-modal.component.html',
    styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent {

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Input() title: string;
    @Input() infoMessage: string;
    @Input() actionMessage: string;

    @Output() cancelInfoModal = new EventEmitter<any>();

    constructor() {
    }

    open() {
        this.modal.open();
    }

    close() {
        this.modal.close();
    }

    onCancel() {
        this.cancelInfoModal.emit();
    }
}
