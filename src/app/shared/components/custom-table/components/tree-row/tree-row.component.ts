import { Component, Input, TemplateRef } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tree-row',
    templateUrl: 'tree-row.component.html',
    styleUrls: ['tree-row.component.scss']
})
export class TreeRowComponent {
    @Input() record;
    @Input() children;
    @Input() columnsRenderer: TemplateRef<any>;

    isExpanded = false;

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
    }
}
