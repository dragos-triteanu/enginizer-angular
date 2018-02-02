import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MaterializeAction } from 'angular2-materialize';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

    @Input()
    displayType: string;
    @Input()
    type: string;
    @Input()
    record: any = {};
    @Input()
    dropdownContent: any = [];

    @Output()
    tooltipActions = new EventEmitter<string | MaterializeAction>();
    @Output()
    click = new EventEmitter<any>();

    constructor(private translateService: TranslateService) {
    }


    ngOnInit(): void {
        this.translateService.onLangChange.subscribe(event => {
            this.tooltipActions.emit({action: "tooltip", params: ['']});
        });
    }

    buildTooltip(record) {
        switch (this.displayType) {
            default:
                return this.record;
        }
    }

    onClick(item: any) {
        this.click.emit(item);
    }
}
