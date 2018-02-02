import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { MaterializeModule } from 'angular2-materialize';
import { Ng2CompleterModule } from 'ng2-completer';

import { ComponentsModule } from '../components.module';
import { FormFeatureModule } from '../form/form.feature.module';

import { TableComponent } from './table.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableBodyComponent } from './table-body/table-body.component';
import { TableColumnComponent } from './components/column/table-column.component';
import { PaginationComponent } from './table-footer/pagination/pagination.component';
import { TableFooterComponent } from './table-footer/table-footer.component';
import { TreeRowComponent } from './components/tree-row/tree-row.component';
import { SimpleRowComponent } from './components/simple-row/simple-row.component';
import { GroupedRowComponent } from './components/grouped-row/grouped-row.component';

@NgModule({
    imports: [
        CommonModule,
        MaterializeModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2CompleterModule,
        ComponentsModule,
        FormFeatureModule
    ],
    declarations: [
        TableComponent,
        TableHeaderComponent,
        TableBodyComponent,
        TableFooterComponent,
        TableColumnComponent,
        PaginationComponent,
        GroupedRowComponent,
        SimpleRowComponent,
        TreeRowComponent
    ],
    exports: [
        TableComponent,
        TableColumnComponent,
        TableHeaderComponent,
        TableBodyComponent,
        TableFooterComponent
    ],
    entryComponents: [TableColumnComponent]
})
export class TableModule {
}
