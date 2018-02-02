import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MaterializeModule } from "angular2-materialize";
import {
    ContextMenuModule,
    DataTableModule,
    FileUploadModule,
    ListboxModule,
    PaginatorModule,
    PickListModule,
    SharedModule as PrimeSharedModule
} from 'primeng/primeng';

import { ComponentsModule } from '@components/components.module';
import { TableModule } from '@components/custom-table/table.module';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormFeatureModule } from '@components/form/form.feature.module';
import { Error404Component } from "@app/shared/components";
import { DemoComponent } from "@app/shared/pages/demo/demo.component";


@NgModule({
    declarations: [
        Error404Component,
        DemoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        TranslateModule,
        MaterializeModule,
        ContextMenuModule,
        DataTableModule,
        PrimeSharedModule,
        PaginatorModule,
        PickListModule,
        ListboxModule,
        FileUploadModule,
        BrowserAnimationsModule,
        // Feature modules
        TableModule,
        FormFeatureModule,
        ComponentsModule
    ],
    exports: [
        CommonModule,
        PaginatorModule,
        PickListModule,
        // Feature modules

        ListboxModule,
        DataTableModule,
        TableModule,
        ComponentsModule,
        FormFeatureModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        FileUploadModule,
        Error404Component
    ],
    providers: [],
    bootstrap: [],
    schemas: []
})
export class SharedModule {
}
