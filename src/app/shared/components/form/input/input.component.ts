import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";

@Component({
    selector: "app-input",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputComponent,
            multi: true
        }
    ],
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],

})
export class InputComponent implements ControlValueAccessor {
    @Input() id;
    @Input() placeholder;
    @Input() isDisabled = false;
    @Input() type;
    @Input() label;
    @Input() formControl: FormControl;
    @Input() showErrors = false;

    @Output() inputChange = new EventEmitter<any>();

    get hasError() {
        return this.formControl && this.formControl.errors && this.showErrors;
    }

    private onChangeCallback: (_: any) => {};
    private onTouchedCallback: (_: any) => {};

    private _value = '';

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;

        this.onChangeCallback(value);
        this.inputChange.emit(value);
    }

    writeValue(value) {
        this._value = value;
    }

    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
