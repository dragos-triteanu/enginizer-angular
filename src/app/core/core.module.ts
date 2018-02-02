import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterializeModule } from 'angular2-materialize';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core.routing';

import { CoreComponent } from './core.component';

import { AdminModule, } from '../roles';

import { HeaderComponent, SidebarComponent } from './layout';

import { IntroComponent } from './layout/intro/intro.component';
import { NotificationService } from '@services/notification.service';

@NgModule({
    declarations: [
        CoreComponent,
        HeaderComponent,
        SidebarComponent,
        IntroComponent
    ],
    imports: [
        RouterModule,
        MaterializeModule,
        AdminModule,
        SharedModule,
        CoreRoutingModule,
    ],
    providers: [
        UserService,
        NotificationService,
    ]
})
export class CoreModule {
}
