import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from "@components/card/card.model";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() isHorizontal = false;
    @Input() style;

    _record: CardModel;

    constructor() {

    }

    ngOnInit() {
    }

    @Input()
    set record(record) {
        this._record = record;
    }

    get record() {
        return this._record;
    }
}
