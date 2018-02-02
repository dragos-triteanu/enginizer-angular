import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'simple-row',
    templateUrl: 'simple-row.component.html',
    styleUrls: ['simple-row.component.scss']
})
export class SimpleRowComponent {
    @Input() record;
    @Input() columnsRenderer: TemplateRef<any>;
}
