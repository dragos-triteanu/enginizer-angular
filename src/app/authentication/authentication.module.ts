import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { JwtHelper } from 'angular2-jwt';

import { TranslateModule } from '@ngx-translate/core';

import { ToastOptions, ToastsManager } from 'ng2-toastr';

import { AuthRoutingModule } from './authentication.routing';
import { SharedModule } from '../shared/shared.module';

import { AuthGuard } from './guards/auth.guard';

import { AuthenticationComponent } from './pages/authentication.component';
import { CredentialsFormComponent } from './components/login-form/login-form.component';
import { AuthenticationInfoModalComponent } from "@app/authentication/components";

import { AuthenticationService } from './services/authentication.service';
import { IntroGuard } from '@app/authentication/guards/intro.guard';
import { PermissionService } from "@app/authentication/services/permission.service";
import { PermissionBasedGuard } from "@app/authentication/guards/permission-based-auth.guard";

@NgModule({
    declarations: [
        AuthenticationComponent,
        CredentialsFormComponent,
        AuthenticationInfoModalComponent
    ],
    imports: [
        SharedModule,
        AuthRoutingModule,
    ],
    providers: [
        AuthenticationService,
        PermissionService,
        AuthGuard,
        IntroGuard,
        PermissionBasedGuard,
        JwtHelper,
        ToastsManager,
        ToastOptions
    ],
    bootstrap: []
})
export class AuthenticationModule {
}
