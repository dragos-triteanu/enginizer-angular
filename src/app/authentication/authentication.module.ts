import { NgModule } from '@angular/core';

import { JwtHelper } from 'angular2-jwt';

import { ToastOptions, ToastsManager } from 'ng2-toastr';

import { AuthRoutingModule } from './authentication.routing';
import { SharedModule } from '../shared/shared.module';


import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { LoginFormComponent } from './components/index';

import { AuthenticationService } from './services/authentication.service';
import { IntroGuard } from '@app/authentication/guards/intro.guard';
import { PermissionService } from "@app/authentication/services/permission.service";
import { PermissionBasedGuard } from "@app/authentication/guards/permission-based-auth.guard";
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { UserService } from "@services/user.service";
import { AccountConfirmComponent } from './pages/account-confirm/account-confirm.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';

@NgModule({
    declarations: [
        AuthenticationComponent,
        LoginFormComponent,
        RegisterFormComponent,
        AccountConfirmComponent,
        ForgetPasswordComponent,
        ConfirmPasswordComponent
    ],
    imports: [
        SharedModule,
        AuthRoutingModule,
    ],
    providers: [
        AuthenticationService,
        UserService,
        PermissionService,
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
