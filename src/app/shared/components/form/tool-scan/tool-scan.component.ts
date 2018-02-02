import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Log } from 'ng2-logger';

@Component({
    selector: 'app-tool-scan',
    templateUrl: './tool-scan.component.html',
    styleUrls: ['./tool-scan.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ToolScanComponent,
            multi: true
        }
    ]
})
export class ToolScanComponent implements ControlValueAccessor {

    _logger = Log.create(ToolScanComponent.name);

    @Input() label;
    @Input() labelAlign = 'top';
    @Input() placeholder;
    @Input() formControl: FormControl;
    @Input() showErrors = false;

    @Output() scanEvent = new EventEmitter<any>();

    get hasError() {
        return this.formControl && this.formControl.errors && this.showErrors;
    }

    @HostBinding('class.label-left') get leftAlignLabel() {
        return this.labelAlign === 'left';
    }

    private onChangeCallback: (_: any) => {};
    private onTouchedCallback: (_: any) => {};

    private scanInput = '';

    get value() {
        return this.scanInput;
    }

    set value(value) {
        this.scanInput = value;

        this.onChangeCallback(value);
        this.scanEvent.emit(value);
    }

    writeValue(value) {
        this.scanInput = value;
    }

    onScan(toolUID: string) {
        this._logger.info('onScan:: toolUID: ' + toolUID);

        this.scanInput = toolUID;

        this.onChangeCallback(toolUID);
        this.scanEvent.emit(toolUID);
    }

    onClear() {
        this.scanInput = '';

        this.onChangeCallback('');
        this.scanEvent.emit('');
    }

    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }

}
