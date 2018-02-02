import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TextareaComponent,
            multi: true
        }
    ],
})
export class TextareaComponent implements ControlValueAccessor {

    @Input() label;
    @Input() labelAlign = 'top';
    @Input() placeholder;
    @Input() isDisabled = false;
    @Input() formControl: FormControl;
    @Input() dataLength;
    @Input() showErrors = false;

    @Output() inputChange = new EventEmitter<any>();

    get hasError() {
        return this.formControl && this.formControl.errors && this.showErrors;
    }

    @HostBinding('class.label-left')
    get leftAlignLabel() {
        return this.labelAlign === 'left';
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
