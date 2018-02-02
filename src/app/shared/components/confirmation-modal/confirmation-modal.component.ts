import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Log } from "ng2-logger";

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
    @ViewChild(ModalComponent) modal: ModalComponent;

    @Input() title: string;
    @Input() question: string;
    @Input() message: string;
    @Input() displayReasonMode: boolean;
    @Input() displayReasonLabel: string;
    @Input() displayReasonPlaceholder: string;
    @Input() confirmOnlyMode: boolean;
    @Input() reasonMandatory = false;
    @Input() isConfirmationInProgress = false;
    @Input() removeOverlay = false;

    @Output() confirmButtonPressed = new EventEmitter<string>();
    @Output() scanEvent = new EventEmitter<any>();
    @Output() invalidBadge = new EventEmitter<any>();
    @Output() confirmEvent = new EventEmitter<any>();

    formGroup: FormGroup;
    focused = true;
    scanInput = '';
    showErrors = false;
    param = null;
    _logger = Log.create(ConfirmationModalComponent.name);


    constructor() {
    }

    ngOnInit() {
        this.formGroup = new FormGroup({
            'reason': new FormControl('', Validators.required),
        });
    }

    open(param = null) {
        if (this.reasonMandatory) {
            this.formGroup.reset({reason: ''});
        }
        this.param = param;
        this.modal.open();

        if (this.removeOverlay) {
            setTimeout(() => {
                const overlay = document.getElementsByClassName('modal-overlay');
                if (overlay.length > 1) {
                    overlay[1].classList.add('z-minus');
                }
            });
        }
    }

    close() {
        this.modal.close();
        this.isConfirmationInProgress = false;
    }

    onCancel() {
        this.close();
    }

    onScan(badgeId: string) {
        this._logger.info('onScan:: toolUID: ' + badgeId);

        this.isConfirmationInProgress = true;
        this.scanInput = badgeId;
        this.scanEvent.emit({reason: this.formGroup.value.reason, badgeId: badgeId, param: this.param});
    }

    onInvalidBadge(badgeId: string) {
        this._logger.info('onInvalidBadge:: BAdge input is not valid');
        this.invalidBadge.emit(badgeId);
    }


    onConfirmEvent() {
        this.confirmEvent.emit(this.param);
    }

    onConfirmReason() {
        if (this.formGroup.invalid) {
            this.showErrors = true;
            return;
        }
        this.displayReasonMode = false;
    }

    @HostListener('window:focus', ['$event'])
    onFocus() {
        this.focused = true;
    }

    @HostListener('window:blur', ['$event'])
    onBlur() {
        this.focused = false;
    }
}
