import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './pages/authentication.component';

const authRoutes: Routes = [
    { path: 'auth', component: AuthenticationComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
