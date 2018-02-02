import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-textbox',
    templateUrl: './textbox.component.html',
    styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {

    @Input()
    label: string;
    @Input()
    value: string;
    @Input()
    labelClass = {};
    @Input()
    valueClass = {};
    @Input()
    labelStyle = {};
    @Input()
    valueStyle = {};
    @Input()
    resizable = false;
    @Input()
    editMode = false;

    constructor() {
    }

    ngOnInit() {
    }

}
