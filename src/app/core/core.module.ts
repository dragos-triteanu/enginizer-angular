import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core.routing';

import { CoreComponent } from './core.component';

import { AdminModule } from '../roles';
import { HeaderComponent } from './layout';

import { IntroComponent } from './layout/intro/intro.component';
import { RoleService } from "@services/role.service";
import { PermissionService } from "@app/authentication/services/permission.service";
import { UserModule } from "@app/roles/user/user.module";
import { CompanyService } from '@app/core/services/company.service';

@NgModule({
    declarations: [
        CoreComponent,
        HeaderComponent,
        IntroComponent
    ],
    imports: [
        UserModule,
        AdminModule,
        SharedModule,
        CoreRoutingModule
    ],
    providers: [
        RoleService,
        CompanyService,
        PermissionService
    ]
})
export class CoreModule {
}
