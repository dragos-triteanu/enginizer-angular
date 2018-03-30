import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Log } from "ng2-logger";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'app-range',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RangeComponent,
            multi: true
        }
    ],
    templateUrl: './range.component.html',
    styleUrls: ['./range.component.scss']
})
export class RangeComponent implements ControlValueAccessor {
    _logger = Log.create(RangeComponent.name);

    @Input() min;
    @Input() max;
    @Input() limit;
    @Input() step;
    @Input() showErrors = false;
    @Input() formControl: FormControl;

    @Output() rangeChange = new EventEmitter<any>();

    private onChangeCallback: (_: any) => {};
    private onTouchedCallback: (_: any) => {};


    _value = 0;

    writeValue(value) {
        this._value = value;
    }

    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }

    get hasError() {
        return this.formControl && this.formControl.errors && this.showErrors;
    }

    @Input()
    set value(value) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

    onChange(event) {
        const eventValue = parseInt(event.target.value, 10);
        if (this.limit > 0 && eventValue < this.limit) {
            this.value = eventValue;
        } else {
            event.target.value = this.limit;
        }
        this.propagateChanges(event.target.value);
    }

    private propagateChanges(value) {
        this.rangeChange.emit(value);
        if (this.onChangeCallback) {
            this.onChangeCallback(value);
        }
    }
}
