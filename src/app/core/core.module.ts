import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core.routing';

import { CoreComponent } from './core.component';

import { AdminModule, } from '../roles';

import { HeaderComponent, SidebarComponent } from './layout';

import { IntroComponent } from './layout/intro/intro.component';
import { NotificationService } from '@services/notification.service';
import { RoleService } from "@services/role.service";
import { PermissionService } from "@app/authentication/services/permission.service";

@NgModule({
    declarations: [
        CoreComponent,
        HeaderComponent,
        SidebarComponent,
        IntroComponent
    ],
    imports: [
        AdminModule,
        SharedModule,
        CoreRoutingModule,
    ],
    providers: [
        UserService,
        RoleService,
        PermissionService,
        NotificationService,
    ]
})
export class CoreModule {
}
