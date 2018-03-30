import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

import createNumberMask from 'text-mask-addons/dist/createNumberMask'

@Component({
    selector: "app-input-number",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputNumberComponent,
            multi: true
        }
    ],
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements ControlValueAccessor, OnInit {
    @Input() label;
    @Input() labelAlign = 'top';
    @Input() placeholder;
    @Input() formControl: FormControl;
    @Input() showErrors = false;

    @Input() allowNegative;
    @Input() maxLength;
    @Input() decimalPrecision;

    @Output() inputChange = new EventEmitter<any>();
    numberMask = {};

    private onChangeCallback: (_: any) => {};
    private onTouchedCallback: (_: any) => {};

    private _value = '';

    ngOnInit(): void {
        this.numberMask = createNumberMask({
            prefix: '',
            suffix: '',
            includeThousandsSeparator: false,
            allowDecimal: Boolean(this.decimalPrecision),
            allowNegative: Boolean(this.allowNegative),
            decimalLimit: this.decimalPrecision,
            integerLimit: this.maxLength
        });
    }

    @HostBinding('class.label-left') get leftAlignLabel() {
        return this.labelAlign === 'left';
    }

    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }

    writeValue(value) {
        this._value = value;
    }

    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;

        this.onChangeCallback(value);
        this.inputChange.emit(value);
    }

    get hasError() {
        return this.formControl && this.formControl.errors && this.showErrors;
    }
}
