import { PaginationComponent } from './pagination/pagination.component';
import { TableConfig } from '../../../util/table-config.utils';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
    selector: 'app-table-footer',
    templateUrl: 'table-footer.component.html',
    styleUrls: ['table-footer.component.scss']
})
export class TableFooterComponent {
    @Input() config = new TableConfig();

    @Output() pageChange = new EventEmitter<any>();

    @ViewChild(PaginationComponent) pagination: PaginationComponent;

    onPageChange(pagination) {
        // this.config.pager = pagination;
        this.pageChange.emit(this.config);
    }
}
