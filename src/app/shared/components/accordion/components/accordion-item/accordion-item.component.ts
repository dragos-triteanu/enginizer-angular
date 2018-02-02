import { Component, ContentChild, forwardRef, Input, OnInit, TemplateRef } from '@angular/core';
import { AccordionService } from "@components/accordion/accordion.service";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
    selector: 'app-accordion-item',
    templateUrl: './accordion-item.component.html',
    styleUrls: ['./accordion-item.component.scss'],
    animations: [
        trigger('expandCollapse', [
            state('expandCollapseState', style({height: '*'})),
            transition('* => void', [style({height: '*'}), animate(200, style({height: "0"}))]),
            transition('void => *', [style({height: '0'}), animate(200, style({height: "*"}))])
        ])
    ],
})

export class AccordionItemComponent implements OnInit {

    @ContentChild(forwardRef(() => 'itemHeader')) header: TemplateRef<any>;
    @ContentChild(forwardRef(() => 'itemBody')) body: TemplateRef<any>;

    _index = 0;
    _isOpen = false;

    @Input()
    disabled = false;

    constructor(private accordionService: AccordionService) {
    }

    ngOnInit() {
    }

    @Input()
    set index(index) {
        this._index = index;
    }

    get index() {
        return this._index;
    }

    @Input()
    set open(open) {
        this._isOpen = open;
    }

    get open() {
        return this._isOpen;
    }

    click() {
        this.accordionService.announceItemSelection(this.index);
    }

    expand() {
        this._isOpen = true;
    }

    collapse() {
        this._isOpen = false;
    }


}
