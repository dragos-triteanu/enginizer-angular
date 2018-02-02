import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    DataTableModule, FileUploadModule, ListboxModule, PaginatorModule, PickListModule, SharedModule as PrimeSharedModule
} from 'primeng/primeng';

import { SharedModule } from '../../shared/shared.module';
import { MaterializeModule } from 'angular2-materialize';
import { RoleService } from '../../core/services/role.service';
import { RoleManagementComponent } from './pages/role-management/roles.component';
import { RolesTableComponent } from './pages/role-management/components/roles-table/roles-table.component';
import { RolesModalComponent } from './pages/role-management/components/roles-modal/roles-modal.component';
import { RouterModule } from '@angular/router';
import { PermissionService } from '@app/authentication/services/permission.service';
import { UserListComponent } from '@app/roles/admin/pages/users/users.component';
import { UsersTableComponent } from '@app/roles/admin/pages/users/users-table/users-table.component';

@NgModule({
    declarations: [
        RolesTableComponent,
        RolesModalComponent,
        RoleManagementComponent,
        UsersTableComponent,
        UserListComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MaterializeModule,
        DataTableModule,
        ListboxModule,
        PrimeSharedModule,
        PaginatorModule,
        PickListModule,
        RouterModule,
        FileUploadModule,
    ],
    providers: [
        RoleService,
        PermissionService,
    ],
    bootstrap: []
})

export class AdminModule {
}
