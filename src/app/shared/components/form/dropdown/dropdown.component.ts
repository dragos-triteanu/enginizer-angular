import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { MaterializeAction } from 'angular2-materialize';
import { Log } from "ng2-logger";

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DropdownComponent,
            multi: true
        }
    ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
    _logger = Log.create(DropdownComponent.name);

    @Input() labelAlign = 'top';
    @Input() label;
    @Input() displayField = 'name';
    @Input() valueField = 'id';
    @Input() emptyText = 'No empty text provided';
    @Input() isDisabled = false;
    @Input() items = [];
    @Output() selectItem = new EventEmitter<any>();

    @Input() formControl: FormControl;
    @Input() showErrors = false;

    @HostBinding('class.label-left')
    get leftAlignLabel() {
        return this.labelAlign === 'left';
    }

    selectActions = new EventEmitter<string | MaterializeAction>();

    get hasError() {
        return this.formControl && this.formControl.errors && this.showErrors;
    }

    private selectedItem = {};
    private onChangeCallback: (_: any) => {};
    private onToucheCallback: (_: any) => {};

    constructor(private translateService: TranslateService) {
    }

    ngOnInit() {
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.selectActions.emit({action: 'material_select', params: ['']});
        });
    }

    get value() {
        return this.selectedItem ? this.selectedItem[this.valueField] : undefined;
    }

    trackByFn(index, item) {
        return item[this.valueField]; // or item.id
    }

    writeValue(value) {
        this.updateSelectedItem(value);
    }

    onItemSelect(value) {
        if ((value || value === 0) && this.valueField === 'id') {
            value = +value;
        }
        if (this.onChangeCallback) {
            this.onChangeCallback(value);
        }

        this.updateSelectedItem(value);
        this.selectItem.emit(this.selectedItem);
        this._logger.data("Dropdown::onItemSelect", this.selectedItem);
    }

    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn) {
        this.onToucheCallback = fn;
    }

    updateSelectedItem(value) {
        if ((value || value === 0) && this.valueField === 'id') {
            value = +value;
        }
        if (this.items) {
            if (value instanceof Object) {
                this.selectedItem = this.items.find(item => item[this.valueField] === value[this.valueField]) || '';
            } else {
                this.selectedItem = this.items.find(item => item[this.valueField] === value) || '';
            }
        }
    }
}
