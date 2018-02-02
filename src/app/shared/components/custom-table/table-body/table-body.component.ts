import { Component, EventEmitter, Input, Output, QueryList } from '@angular/core';

import { TableColumnComponent } from '../components/column/table-column.component';

@Component({
    selector: 'app-table-body',
    templateUrl: 'table-body.component.html',
    styleUrls: ['./table-body.component.scss']
})
export class TableBodyComponent {
    @Input() columns: QueryList<TableColumnComponent>;
    @Input() hasActiveGroups = false;
    @Input() rowExpand = true;
    @Input() isLoading = false;
    @Input() records = [];

    @Output() rowClick = new EventEmitter<any>();

    onRowClick(record) {
        if (this.rowExpand || record.children) {
            this.toggleRowExpand(record);
        }
        this.rowClick.emit(record);
    }

    toggleRowExpand(item) {
        item.expanded = !item.expanded;
    }

    toggleExpandAll(expanded) {
        this.records.forEach(rec => this.toggleRowExpand(rec));
    }

    isDisabled(record) {
        return record.disabled;
    }

    // TODO - move into a tree node interface
    getNrOfParents(record) {
        let nrOfParents = 0;
        let recParent = record.parent;
        while (recParent) {
            nrOfParents++;
            recParent = recParent.parent;
        }
        return nrOfParents;
    }
}
