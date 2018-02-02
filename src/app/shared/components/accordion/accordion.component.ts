import {
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    Input,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { AccordionService } from "@components/accordion/accordion.service";
import { AccordionItemComponent } from "@app/shared/components";

declare var $: any;

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    providers: [AccordionService],
    encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements AfterViewInit {
    @ViewChild('accordion') accordion: ElementRef;

    @ContentChildren(forwardRef(() => AccordionItemComponent)) accordionItems: QueryList<AccordionItemComponent>;

    @Input()
    label = '';

    private $accordion;
    private accordionArrayItems = [];
    private openIndex = 0;

    constructor(private accordionService: AccordionService) {
        this.accordionService.accordionItemSelectedObservable.subscribe((event: any) => {
            if (null != event && this.accordionItems) {
                this.accordionArrayItems = this.accordionItems.toArray();
                this.openIndex = event;

                // TODO this can be done by index reference, which is O(1) instead of O(n)
                this.accordionArrayItems.forEach((item) => {
                    item.collapse();
                });

                this.accordionArrayItems[this.openIndex].expand();
            }
        })
    }

    ngAfterViewInit(): void {
        this.$accordion = $(this.accordion.nativeElement).collapsible();
        this.accordionItems.toArray().forEach((accordionItem: AccordionItemComponent, idx) => {
            accordionItem.index = idx;
        });

    }
}
