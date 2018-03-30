import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, } from '@angular/core';

import * as moment from 'moment';

import { TranslateService } from "@ngx-translate/core";
import { Log } from "ng2-logger";

declare const $: any;

const dateFormat = 'dd-mm-yyyy';

@Component({
    selector: "app-input-datepicker",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DatepickerComponent,
            multi: true
        }
    ],
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements ControlValueAccessor, AfterViewInit {
    _logger = Log.create(DatepickerComponent.name);

    @Input() label;
    @Input() id;
    @Input() placeholder;
    @Input() formControl: FormControl;
    @Input() showErrors;
    @Input() isDisabled = false;
    @Input() stringFormat = false;

    @Output() dateChange = new EventEmitter<any>();
    @ViewChild('input') input;

    private onChangeCallback: (_: any) => {};
    private onTouchedCallback: (_: any) => {};

    private selectedDate = null;
    private $input;
    private $datepicker;

    constructor(private translateService: TranslateService) {
    }

    writeValue(value) {
        // TODO Hackerman fix for 1970 date
        if (value === 0) {
            return;
        }
        this._logger.info("writeValue::", value);
        this.updateDateValue(value);
    }

    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }

    ngAfterViewInit() {
        this.$input = $(this.input.nativeElement);
        const translations = this.translateService.instant("datepicker");
        const config = Object.assign({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            closeOnSelect: false, // Close upon selecting a date,
            format: dateFormat,
            onSet: (event) => {
                if (event.hasOwnProperty('select')) {
                    this.propagateChange(new Date(event.select));
                }
                if (event.hasOwnProperty('clear')) {
                    this.clear();
                }
            }
        }, translations);

        this.$input.pickadate(config);
        this.$datepicker = this.$input.pickadate('picker');
        setTimeout(() => {
            if (this.selectedDate) {
                this.$datepicker.set('select', this.selectedDate);
            }
        })
    }

    private updateDateValue(date) {
        // TODO Hackerman fix for 1970 date
        if (date === 0) {
            return;
        }

        this._logger.info("updateDateValue::", date);
        this.selectedDate = !date ? null : moment(date);

        if (this.$datepicker) {
            this.$datepicker.set('select', date);
        }
    }

    private propagateChange(value: Date) {
        if (this.stringFormat) {
            const date = value ? moment(value).format(dateFormat.toUpperCase()) : null;
            this.onChangeCallback(date);
            this.dateChange.emit(date);
        } else {
            const time = value ? value.getTime() : null;
            this.onChangeCallback(time);
            this.dateChange.emit(time);
            if (!isNaN(time)) {
                this.dateChange.emit(time);
            }
        }
    }

    private clear() {
        this.propagateChange(null);
    }

    get value() {
        return this.selectedDate ? moment(this.selectedDate).format(dateFormat.toUpperCase()) : null;
    }

    set value(value) {
        this.updateDateValue(value);
    }


    get hasError() {
        return this.formControl && this.formControl.errors && this.showErrors;
    }
}
