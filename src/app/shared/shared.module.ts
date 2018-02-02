import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { MaterializeModule } from "angular2-materialize";
import { ContextMenuModule, FileUploadModule } from 'primeng/primeng';
import { ComponentsModule } from '@components/components.module';
import { TableModule } from '@components/custom-table/table.module';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormFeatureModule } from '@components/form/form.feature.module';
import { Error404Component } from "@app/shared/components";

@NgModule({
    declarations: [
        Error404Component
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
        FileUploadModule,
        BrowserAnimationsModule,
        // Feature modules
        TableModule,
        FormFeatureModule,
        ComponentsModule
    ],
    exports: [
        CommonModule,
        // Feature modules
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
