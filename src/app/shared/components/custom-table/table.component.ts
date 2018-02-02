import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableBodyComponent } from './table-body/table-body.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableColumnComponent } from './components/column/table-column.component';
import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { TableConfig } from '@app/shared/util/table-config.utils';

@Component({
    selector: 'app-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TableComponent {
    @Input() data = [];
    @Input() groupableColumns = [];

    @ContentChildren(TableColumnComponent) columns: QueryList<TableColumnComponent>;

    @Input() isLoading = false;
    @Input() title;
    @Input() rowExpand = false;
    @Input() treeMode = false;
    @Input() selectableRows = true;
    @Input() filtersToggle = true;
    @Input() showFilters = true;
    @Input() config = new TableConfig();
    @Input() showGroupFilters = false;
    @Input() groupFilters = [];
    @Input() showGroupers = false;
    @Input() directlyGrouped = false;

    @Output() sortChange = new EventEmitter<any>();
    @Output() filterChange = new EventEmitter<any>();
    @Output() filterGroupChange = new EventEmitter<any>();
    @Output() groupChange = new EventEmitter<any>();
    @Output() pageChange = new EventEmitter<any>();
    @Output() rowClick = new EventEmitter<any>();

    @ViewChild(TableHeaderComponent) header: TableHeaderComponent;
    @ViewChild(TableBodyComponent) body: TableBodyComponent;
    @ViewChild(TableFooterComponent) footer: TableFooterComponent;

    allExpanded = false;

    onSortChange(config) {
        this.sortChange.emit(config);
    }

    onFilterChange(config) {
        this.filterChange.emit(config);
    }

    onFilterToggled(showFilters: boolean) {
        this.showFilters = showFilters;
    }

    onFilterGroupChanged(config) {
        this.filterGroupChange.emit(config);
    }

    onGroupChange(config) {
        this.groupChange.emit(config);
    }

    onRowClick(item) {
        this.rowClick.emit(item);
    }

    onPageChange(pagination) {
        // this.config.pager = pagination;
        this.pageChange.emit(this.config);
    }

    onExpandAll(expanded) {
        this.allExpanded = expanded;
        this.body.toggleExpandAll(expanded);
    }
}
