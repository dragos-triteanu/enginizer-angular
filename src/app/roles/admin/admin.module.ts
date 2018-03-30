import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { RolesTableComponent } from "@app/roles/admin/pages/roles/components/roles-table/roles-table.component";
import { RolesModalComponent } from "@app/roles/admin/pages/roles/components/roles-modal/roles-modal.component";
import { RoleManagementComponent } from "@app/roles/admin/pages/roles/roles.component";

@NgModule({
    declarations: [
        RolesTableComponent,
        RolesModalComponent,
        RoleManagementComponent,
    ],
    imports: [
        SharedModule,
    ],
    providers: [],
    bootstrap: []
})

export class AdminModule {
}
