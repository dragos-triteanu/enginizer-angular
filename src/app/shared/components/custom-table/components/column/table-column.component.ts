import { Component, ContentChild, EventEmitter, forwardRef, Input, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-table-column',
    template: ''
})
export class TableColumnComponent {
    @Input() cls: string;
    @Input() field: string;
    @Input() filter: boolean;
    @Input() showTree: boolean;
    @Input() header: string;
    @Input() sortable: string;
    @Input() filterPlaceholder: string;
    @Input() headerTooltip: string;

    @Output() filterChange = new EventEmitter();

    @ContentChild(forwardRef(() => 'filter')) filterTmpl: TemplateRef<any>;
    @ContentChild(forwardRef(() => 'body')) bodyTmpl: TemplateRef<any>;
    @ContentChild(forwardRef(() => 'editor')) editorTmpl: TemplateRef<any>;

    sort = {
        active: false,
        direction: ''
    };

    filterValue = '';

    updateSort() {
        const dir = this.sort.direction;
        this.sort = {
            active: true,
            direction: dir === 'asc' ? 'desc' : 'asc'
        };
    }

    onFilterChange() {
        this.filterChange.emit(this.filterValue);
    }

    clearSorting() {
        this.sort = {
            active: false,
            direction: ''
        };
    }
}
