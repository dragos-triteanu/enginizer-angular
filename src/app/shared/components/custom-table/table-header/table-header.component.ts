import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { TableConfig } from '../../../util/table-config.utils';
import { TableColumnComponent } from '../components/column/table-column.component';

import { Subject } from 'rxjs/Subject';

import "rxjs/add/operator/debounceTime";

import * as _ from 'lodash';
import { Subscription } from "rxjs/Subscription";
import { Log } from "ng2-logger";

@Component({
    selector: 'app-table-header',
    templateUrl: 'table-header.component.html',
    styleUrls: ['table-header.component.scss']
})
export class TableHeaderComponent implements OnInit, OnDestroy {
    _logger = Log.create(TableHeaderComponent.name);
    @Input() columns: QueryList<TableColumnComponent>;
    @Input() title;
    @Input() config = new TableConfig();
    @Input() rowExpand = false;
    @Input() allExpanded = false;
    @Input() filtersToggle = true;
    @Input() showFilters = true;
    @Input() showGroupFilters = false;
    @Input() showGroupers = false;
    @Input() directlyGrouped = false;

    @Input()
    set groupableColumns(columns) {
        if (columns.length) {
            this.groupableDropdownItems = _.cloneDeep(columns);
        }
    };
    @Input()
    set groupFilters(filters) {
        if (filters.length) {
            this.groupFilterItems = _.cloneDeep(filters);
        }
    }

    @Output() sort = new EventEmitter<any>();
    @Output() filter = new EventEmitter<any>();
    @Output() filterToggled = new EventEmitter<any>();
    @Output() groupFilter = new EventEmitter<any>();
    @Output() group = new EventEmitter<any>();
    @Output() expandAll = new EventEmitter<any>();

    private filterSubject = new Subject<any>();
    private debounceTime = 500;
    private filterMode = false;

    templateContext = this;

    groupFilterItems = Array<any>();

    groupableDropdownItems = Array<any>();
    previousGroupers = [];

    addGroupActive = false;
    filterSubscription: Subscription;

    constructor(private translateService: TranslateService) {
    }

    ngOnInit() {
        this.registerFilterSubscription();
        if (this.showGroupers && this.directlyGrouped) {
            this.config.groupers = [...this.groupableDropdownItems];
        }
    }

    private registerFilterSubscription() {
        this._logger.info('registerFilterSubscription::');
        this.filterSubscription = this.filterSubject
            .debounceTime(this.debounceTime)
            .subscribe(val => {
                this.config.filters = this.getActiveFilters();
                this._logger.info('registerFilterSubscription:: Active filters are', this.config.filters);
                this.filter.emit(this.config);
            });
    }

    ngOnDestroy() {
        this.filterSubscription.unsubscribe();
    }

    onToggleExpandAll() {
        this.expandAll.emit(!this.allExpanded);
    }

    toggleFilters() {
        this.showFilters = !this.showFilters;
        this.filterToggled.emit(this.showFilters);
    }

    onFilterChange(column) {
        if (!this.filterMode && column.filterValue !== '' && this.directlyGrouped) {
            this.previousGroupers = [...this.config.groupers];
        }
        if (column.filterValue !== '') {
            this.filterMode = true;
            if (this.directlyGrouped) {
                this.config.groupers = [];
                this.group.emit(this.config);
            }
        } else {
            this.filterMode = false;
            if (this.directlyGrouped) {
                this.config.groupers = [...this.previousGroupers];
                this.group.emit(this.config);
            }
        }
        this.filterSubject.next(column.filterValue);
    }

    onGroupFilterChanged(selectedItemFromGrouper, groupFilter) {
        if (this.showGroupFilters) {
            this.config.filters = this.getActiveFilters();
            this._logger.info('registerFilterSubscription:: Active filters are', this.config.filters);
            this.groupFilter.emit(this.config);
        }
    }

    onSort(column) {
        if (!column.header || !column.sortable) {
            return;
        }
        this.columns.forEach(col => {
            if (col.field !== column.field) {
                col.clearSorting();
            }
        });

        column.updateSort();
        this.config.sorter = {
            field: column.field,
            IsSortingAscending: column.sort.direction === 'asc'
        };
        this.sort.emit(this.config);
    }


    getActiveFilters() {
        const filters = this.getColumnFilters();
        for (const groupFilter of this.groupFilterItems) {
            if (groupFilter.selectedValue) {
                filters.push({
                    field: groupFilter.filterParam,
                    value: groupFilter.selectedValue
                })
            }
        }
        return filters;
    }

    getColumnFilters() {
        const filters = [];
        this.columns.forEach(col => {
            if (col.filterValue) {
                filters.push({
                    field: col.field,
                    value: col.filterValue
                })
            }
        });
        return filters;
    }

    onAddGroupButtonClick() {
        this.addGroupActive = true;
    }

    addGrouper(grouper) {
        this.config.groupers.push(grouper);
        _.remove(this.groupableDropdownItems, (actGrouper) => grouper.id === actGrouper.id);
        this.addGroupActive = false;
        this.group.emit(this.config);
    }

    removeGrouper(grouper) {
        _.remove(this.config.groupers, (actGrouper) => grouper.id === actGrouper.id);
        this.groupableDropdownItems.push(grouper);
        this.group.emit(this.config);
    }

    isActiveGrouper(grouper) {
        return this.config.groupers.filter(x => x.value === grouper.value).length > 0;
    }

    addChipsGrouper(grouper) {
        this.config.groupers.push(grouper);
        this.group.emit(this.config);
    }

    removeChipsGrouper(grouper) {
        _.remove(this.config.groupers, (actGrouper) => grouper.id === actGrouper.id);
        this.group.emit(this.config);
    }

    get showExpandAll() {
        return this.rowExpand || this.showGroupers;
    }

    get showAddGroupButton() {
        return !this.addGroupActive && this.groupableDropdownItems.length;
    }

    get showGroupDropdown() {
        return this.addGroupActive && this.groupableDropdownItems.length;
    }
}
