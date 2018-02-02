import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreComponent } from './core.component';

import { AuthGuard } from '../authentication/guards/auth.guard';
import { IntroGuard } from '@app/authentication/guards/intro.guard';

import { IntroComponent } from '@app/core/layout/intro/intro.component';
import { RoleManagementComponent } from '../roles/admin/pages/role-management/roles.component';

import { Error404Component } from '@app/shared/pages/error404/error404.component';
import { PermissionBasedGuard } from '@app/authentication/guards/permission-based-auth.guard';
import { UserListComponent } from '@app/roles/admin/pages/users/users.component';
import {DemoComponent} from "@app/shared/pages/demo/demo.component";

const coreRoutes: Routes = [
    {
        path: '', component: CoreComponent, canActivate: [AuthGuard], children: [
            {path: '', component: IntroComponent, canActivate: [IntroGuard]},
            {path: 'error404', component: Error404Component},
            {path: 'roles', component: RoleManagementComponent, canActivate: [PermissionBasedGuard]},
            {path: 'users', component: UserListComponent, canActivate: [PermissionBasedGuard]},
            {path: 'demo', component: DemoComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(coreRoutes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
