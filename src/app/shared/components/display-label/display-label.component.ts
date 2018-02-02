import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-display-label',
    templateUrl: './display-label.component.html',
    styleUrls: ['./display-label.component.scss']
})
export class DisplayLabelComponent implements OnInit {

    @Input()
    label: string;
    @Input()
    value: any;
    @Input()
    labelStyle: {};
    @Input()
    valueStyle: {};
    @Input()
    labelClass: {};
    @Input()
    valueClass: {};
    @Input()
    inlineLabel = false;
    @Input()
    hyperlinkValue = '';

    constructor(private translateService: TranslateService) {
    }

    ngOnInit() {
    }


    get displayValue() {

        if (null == this.value || '' === this.value) {
            return 'N/A';
        }

        const type = typeof(this.value);
        switch (type) {
            case "boolean":
                return this.value ? this.translateService.instant('generic.yes') :
                    this.translateService.instant('generic.no')
            default:
                return this.value;
        }
    }

}
