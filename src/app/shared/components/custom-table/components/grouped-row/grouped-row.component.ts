import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-grouped-row',
    templateUrl: 'grouped-row.component.html',
    styleUrls: ['grouped-row.component.scss']
})
export class GroupedRowComponent {
    @Input() data;

    isExpanded = false;

    toggleGroupExpand() {
        this.isExpanded = !this.isExpanded;
    }
}
