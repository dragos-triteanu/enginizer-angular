import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    @Input() type: string;
    @Input() message: string;
    @Input() fullWidth = false;

    constructor() {
    }

    ngOnInit() {
    }

}
