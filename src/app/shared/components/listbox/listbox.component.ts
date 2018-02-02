import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-listbox',
    templateUrl: './listbox.component.html',
    styleUrls: ['./listbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListboxComponent implements OnInit {

    @Input()
    items = [];
    @Input()
    label = '';
    @Input()
    displayField = 'name';
    @Input()
    labelClass = {};
    @Input()
    valueClass = {};
    @Input()
    labelStyle = {};
    @Input()
    valueStyle = {};

    constructor() {
    }

    ngOnInit() {

    }

}
