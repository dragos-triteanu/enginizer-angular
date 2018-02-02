import { TranslateService } from '@ngx-translate/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, EventEmitter, HostBinding, Input, Output } from "@angular/core";
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const numberMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: false,
    allowDecimal: true
});

const timeUnits = [
    {
        id: 0,
        code: 'minutes',
        label: 'Minutes',
        multiplier: 1
    },
    {
        id: 1,
        code: 'hours',
        label: 'Hours',
        multiplier: 60
    },
    {
        id: 2,
        code: 'days',
        label: 'Days',
        multiplier: 1440
    }
]

@Component({
    selector: "app-input-duration",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputDurationComponent,
            multi: true
        }
    ],
    templateUrl: './input-duration.component.html',
    styleUrls: ['input-duration.component.scss']
})
export class InputDurationComponent implements ControlValueAccessor {
    @Input() label;
    @Input() labelAlign = 'top';
    @Input() placeholder;
    @Input() formControl: FormControl;
    @Input() showErrors = false;

    @Output() inputChange = new EventEmitter<any>();

    timeUnits = timeUnits;
    selectedUnit = 0;

    private onChangeCallback: (_: any) => {};
    private onTouchedCallback: (_: any) => {};

    private _value = 0;
    private multiplier = 1;
    constructor(private translateService: TranslateService) {
        this.translateTimeUnits();
    }

    @HostBinding('class.label-left') get leftAlignLabel() {
        return this.labelAlign === 'left';
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

    onTimeUnitChange(unit) {
        this.multiplier = unit.multiplier;
    }

    private translateTimeUnits() {
        this.translateService.get("generic.components.input-duration.timeUnits").subscribe(units => {
            this.timeUnits = this.timeUnits.map(timeUnit => {
                timeUnit.label = units[timeUnit.code];
                return timeUnit;
            });
        });
    }

    get value() {
        return this._value / this.multiplier;
    }

    set value(value: number) {
        this._value = value * this.multiplier;

        this.onChangeCallback(value);
        this.inputChange.emit(value);
    }

    get hasError() {
        return this.formControl && this.formControl.errors && this.showErrors;
    }

    get mask() {
        return numberMask;
    }
}

