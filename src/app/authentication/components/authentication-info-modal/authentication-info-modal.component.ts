import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ModalComponent } from "@app/shared/components";
import { Log } from "ng2-logger";

@Component({
    selector: 'app-authentication-info-modal',
    templateUrl: './authentication-info-modal.component.html',
    styleUrls: ['./authentication-info-modal.component.scss']
})
export class AuthenticationInfoModalComponent implements OnInit {
    @ViewChild(ModalComponent) modal: ModalComponent;

    @Input() title: string;
    @Input() missingRoleMessage: string;
    @Input() missingBadgeIdMessage: string;
    @Input() displayScanMode: boolean;
    @Output() scanEvent = new EventEmitter<any>();

    focused = true;
    scanInput = '';
    isScanninInProgress = false;
    _logger = Log.create(AuthenticationInfoModalComponent.name);


    constructor() {
    }

    ngOnInit() {
    }

    open() {
        this.modal.open();
    }

    isOpen() {
        return this.modal.isOpen();
    }

    close() {
        this.modal.close();
        this.isScanninInProgress = false;
    }

    stopScanningProcess() {
        this.isScanninInProgress = false;
    }

    onCancel() {
        this.close();
    }

    onScan(badgeId: string) {
        this._logger.info('onScan:: BadgeId: ' + badgeId);

        this.isScanninInProgress = true;
        this.scanInput = badgeId;
        this.scanEvent.emit(badgeId);

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
