import {AfterContentInit, Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit {
    ngAfterContentInit(): void {
        $('.tabs').tabs();
    }

    constructor() {
    }

    ngOnInit() {
        $('.tabs').tabs();
    }


}
