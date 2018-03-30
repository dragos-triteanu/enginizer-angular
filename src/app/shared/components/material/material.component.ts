import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

    @Input()
    style = {};

    @Input()
    class = {};


    constructor() {
    }

    ngOnInit() {
    }

}
