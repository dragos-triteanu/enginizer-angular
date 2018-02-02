import {
    ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges,
    Output, SimpleChange,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Log } from "ng2-logger";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-dropdown-autocomplete',
    templateUrl: './dropdown-autocomplete.component.html',
    styleUrls: ['./dropdown-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: DropdownAutocompleteComponent,
            multi: true
        }
    ]
})
export class DropdownAutocompleteComponent implements ControlValueAccessor, OnChanges {
    _logger = Log.create(DropdownAutocompleteComponent.name);

    @Input() labelAlign = 'top';
    @Input() label;
    @Input() displayField = 'name';
    @Input() valueField = 'id';
    @Input() emptyText = 'No empty text provided';
    @Input() items = [];
    @Output() selectItem = new EventEmitter();
    @Input() formControl: FormControl;
    @Input() showErrors = false;
    @Input() focusOut = false;
    @Input() required = false;
    @Input() dropdown = true;
    @Input() labelStyle = {};

    @HostBinding('class.label-left')
    get leftAlignLabel() {
        return this.labelAlign === 'left';
    }

    get hasError() {
        return this.formControl && this.formControl.errors && this.showErrors;
    }

    filteredItems: any[];

    private selectedItem = {};
    private onChangeCallback: (_: any) => {};
    private onToucheCallback: (_: any) => {};

    constructor() {
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }) {
        if (changes['items'] && changes['items'].previousValue !== changes['items'].currentValue ) {
            this.selectedItem = {};
        }
    }

    get value() {
        return this.selectedItem;
    }

    set value(value) {
        this.selectedItem = value;
    }

    writeValue(value) {
        this._logger.info('writeValue:: ', value);
        this.updateSelectedItem(value);
    }

    onItemSelect(value) {
        this.updateSelectedItem(value);

        if (this.onChangeCallback) {
            this.onChangeCallback(value ? value[this.valueField] : value);
        }

        this._logger.info('onItemSelect:: ', this.selectedItem);
    }

    onFocusOut() {
        this.onItemSelect(this.value);
    }

    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn) {
        this.onToucheCallback = fn;
    }

    search(event) {
        this.filteredItems = this.items.filter(item => {
            return (item[this.displayField].toLowerCase().startsWith(event.query.toLowerCase()));
        });
    }

    updateSelectedItem(item) {
        this.selectedItem = item;
        this.selectItem.emit(this.selectedItem);
    }


}
