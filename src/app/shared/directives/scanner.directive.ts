import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {Log} from "ng2-logger";

@Directive({
    selector: '[appBadgeScanner]'
})
export class ScannerDirective {
    public static UID_REGEX = new RegExp('(^[0-9a-zA-Z].*)_([0-9a-zA-Z].*)_' +
        '([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})');

    _logger = Log.create(ScannerDirective.name);

    @Output() scannerEvent = new EventEmitter<string>();

    scannerInput = '';

    constructor() {
    }

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {

        // If event keyCode is an expected character add it to the scannerInput stream
        if ((event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 65 && event.keyCode <= 90) ||
            event.keyCode === 189 || event.keyCode === 173) {
            this.scannerInput += event.key;
        }

        // If event keyCode is ENTER emit event with the scannerInput variable
        if (event.keyCode === 13) {
            this._logger.info('Scanned input is', this.scannerInput);
            if (ScannerDirective.UID_REGEX.test(this.scannerInput)) {
                this._logger.info('Scanned input respects regex', this.scannerInput);
                this.scannerEvent.emit(this.parseUID(this.scannerInput));
            }
            this.scannerInput = '';
        }
    }

    private parseUID(fullScannedUid) {
        // const uid = ScannerDirective.UID_REGEX.exec(fullScannedUid);
        return fullScannedUid;
    }
}




