import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Log } from "ng2-logger";

@Directive({
    selector: '[appHIDScanner]'
})
export class HIDScannerDirective {

    public static BOSCH_ID_REGEX = new RegExp('(^[0-9]{17}$)');
    _logger = Log.create(HIDScannerDirective.name);

    @Output() scannerEvent = new EventEmitter<string>();
    @Output() invalidBadge = new EventEmitter<string>();

    scannerInput = '';


    constructor() {
    }

    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {

        // If event keyCode is an expected character add it to the scannerInput stream
        if (event.keyCode >= 48 && event.keyCode <= 57) {
            this.scannerInput += event.key;
        }

        // If event keyCode is ENTER emit event with the scannerInput variable
        if (event.keyCode === 13) {
            this._logger.info('Scanned input is', this.scannerInput);
            if (HIDScannerDirective.BOSCH_ID_REGEX.test(this.scannerInput)) {
                this._logger.info('Scanned input matches regex. Emitting', this.scannerInput);
                this.scannerEvent.emit(this.scannerInput);
            } else {
                this._logger.info('Scanned input does not match regex', this.scannerInput);
                this.invalidBadge.emit(this.scannerInput);
            }
            this.scannerInput = '';
        }
    }
}
