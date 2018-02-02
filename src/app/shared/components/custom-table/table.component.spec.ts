import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableBodyComponent } from './table-body/table-body.component';
import { TableColumnComponent } from './components/column/table-column.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TranslateModuleStub } from '../../../testing/translate.module.stub';
import { TranslateServiceStub } from '../../../testing/translate.service.stub';
import { TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { TableConfig } from '../../util/table-config.utils';
import { TableModule } from './table.module';
import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from "./table.component";

const mockData = [
    {
        col0: 0,
        col1: 'Col 1 data',
        col2: 'Col 2 data'
    },
    {
        col0: 1,
        col1: 'Col 1 data',
        col2: 'Col 2 data'
    }
];

@Component({
    template:
    `
        <app-table [data]="data"
            [config]="config"
            [isLoading]="isLoading"
            [rowExpand]="rowExpand"
            [title]="title"
            (sortChange)="onSortChange($event)"
            (filterChange)="onFilterChange($event)"
            (pageChange)="onPageChange($event)">
                <app-table-column header="Col 0"
                            field="col0">
                </app-table-column>
                <app-table-column header="Col 1 sortable"
                            sortable="true"
                            field="col1">
                </app-table-column>
                <app-table-column header="Col 2 filterable"
                            filter="true"
                            field="col2">
                </app-table-column>
        </app-table>
    `
})
class TestComponent {
    data = mockData;
    config = new TableConfig();
    isLoading = false;
    rowExpand = false;
    allExpanded = false;
    title = "Table test";

    @ViewChild(TableComponent) table: TableComponent;

    @Output() sortBy = new EventEmitter<any>();
    filterBy = new EventEmitter();
    pageChange = new EventEmitter();

    constructor() { }

    onSortChange(config: TableConfig) {
        this.sortBy.emit(config);
    }
    onFilterChange(config: TableConfig) {
        this.filterBy.emit(config);
    }
    onPageChange(config: TableConfig) {
        this.pageChange.emit(config);
    }
}
fdescribe('TableComponent', () => {

    let fixture: ComponentFixture<TestComponent>;
    let testHost: TestComponent;
    let table: TableComponent;
    let columns: Array<TableColumnComponent>;

    function getElementByCss(selector) {
        return fixture.debugElement.query(By.css(selector));
    }
    function getElementsByCss(selector) {
        return fixture.debugElement.queryAll(By.css(selector));
    }
    function getTextContent(debugElement) {
        const nativeElement = debugElement.nativeElement;
        return nativeElement ? nativeElement.textContent.trim() : '';
    }


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TableModule, TranslateModuleStub],
            declarations: [
                TestComponent
            ],
            schemas: []
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testHost = fixture.componentInstance;
        table = testHost.table;
        fixture.detectChanges();
        columns = table.columns.toArray();
    });

    it('should create a component instance', () => {
        expect(table).toBeTruthy();
    });

    describe('Table header', () => {
        let header: TableHeaderComponent;

        beforeEach(() => {
            header = table.header;
        });

        it('should render title', () => {
            const titleCol = getElementByCss('.title .table-column');
            expect(getTextContent(titleCol)).toEqual(testHost.title);
        });

        it('should render column headers', () => {
            const headerColumns = getElementsByCss('.headers .table-column');
            expect(columns.length).toEqual(headerColumns.length);
            expect(getTextContent(headerColumns[0])).toEqual(columns[0].header);
        });

        it('should trigger sort on sortable=true', () => {
            const sortableHeader = getElementsByCss('.headers .table-column')[1];
            const sortableColumn = columns[1];
            header.sort.subscribe((config: TableConfig) => {
                expect(sortableColumn.field).toEqual(config.sorter.field);
                expect(config.sorter.IsSortingAscending).toEqual(true);
            });
            sortableHeader.nativeElement.click();
        });

        it('should not trigger sort on sortable=false', () => {
            const sortableHeader = getElementsByCss('.headers .table-column')[0];
            const sortableColumn = columns[0];
            const sortSpy = spyOn(header.sort, 'emit');
            sortableHeader.nativeElement.click();
            expect(sortSpy.calls.count()).toEqual(0);
        });

        it('should render column filters', () => {
            const filterColumns = getElementsByCss('.filters .table-column');
            expect(columns.length).toEqual(filterColumns.length);
        });
    });

    describe('Table body', () => {
        let body: TableBodyComponent;

        beforeEach(() => {
            body = table.body;
        });

        it('should get records', () => {
            expect(testHost.data).toEqual(body.records);
        });

        it('should render records as table rows', () => {
            const rows = getElementsByCss('app-table-body .table-row');
            expect(rows.length).toEqual(testHost.data.length);
        });

        it('should render row table columns', () => {
            const rowColumns = getElementsByCss('app-table-body .table-row .table-column');
            expect(rowColumns.length).toEqual(Object.keys(testHost.data[0]).length * testHost.data.length);
        });
    });

    describe('Table footer', () => {
        let footer: TableFooterComponent;

        beforeEach(() => {
            footer = table.footer;
        });

        it('should render pagination', () => {
            expect(footer.pagination).toBeTruthy();
        });

        it('should show page count', () => {
            const pageCount = getElementsByCss('app-table-footer .page-count');
            expect(pageCount).toBeTruthy();
        });

        it('should hide pagination for less than 2 pages', () => {
            const pagerEl = getElementByCss('app-table-footer .app-pager');
            expect(pagerEl).toBeFalsy();
        });
    });

});
