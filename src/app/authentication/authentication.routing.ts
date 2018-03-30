import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { RegisterFormComponent } from "@app/authentication/components/register-form/register-form.component";
import { LoginFormComponent } from "@app/authentication/components";
import { ForgetPasswordComponent } from "@app/authentication/components/forget-password/forget-password.component";
import { ConfirmPasswordComponent } from "@app/authentication/components/confirm-password/confirm-password.component";

const authRoutes: Routes = [
    { path: 'auth', component: AuthenticationComponent, children: [
            {path: '', redirectTo: 'login', pathMatch: 'full'},
            {path: 'login', component: LoginFormComponent},
            {path: 'register', component: RegisterFormComponent},
            {path: 'forgot-password', component: ForgetPasswordComponent},
            {path: 'confirm-password', component: ConfirmPasswordComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
