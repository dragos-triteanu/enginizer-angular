import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-input-switch",
    templateUrl: './switch.component.html',
    styleUrls: ['./switch.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SwitchComponent,
            multi: true
        }
    ]
})
export class SwitchComponent {
    @Input() offLabel;
    @Input() onLabel;
    @Input() topLabel;
    @Input() isDisabled = false;
    @Output() inputChange = new EventEmitter<any>();

    private onChangeCallback: (_: any) => {};
    private onTouchedCallback: (_: any) => {};

    private _value = false;

    get value() {
        return this._value || false;
    }

    set value(value) {
        this._value = !!value;

        this.onChangeCallback(this._value);
        this.inputChange.emit(this._value);
    }

    writeValue(value) {
        this._value = !!value;
    }

    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
