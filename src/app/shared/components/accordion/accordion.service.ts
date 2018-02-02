import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class AccordionService {

    private accordionItemSelected = new BehaviorSubject<number>(null);
    accordionItemSelectedObservable = this.accordionItemSelected.asObservable();

    constructor() {
    }

    announceItemSelection(event: any) {
        this.accordionItemSelected.next(event);
    }

}
