import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { RoleManagementComponent } from './pages/role-management/roles.component';
import { RolesTableComponent } from './pages/role-management/components/roles-table/roles-table.component';
import { RolesModalComponent } from './pages/role-management/components/roles-modal/roles-modal.component';
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
        SharedModule,
    ],
    providers: [],
    bootstrap: []
})

export class AdminModule {
}
