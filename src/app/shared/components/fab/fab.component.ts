import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-fab',
    templateUrl: './fab.component.html',
    styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {

    @Input() type = 'add';
    @Output() click = new EventEmitter<any>();


    constructor() {
    }

    ngOnInit() {
    }

    fabClick() {
        this.click.emit();
    }

}
