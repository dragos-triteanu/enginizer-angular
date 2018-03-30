import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CoreComponent} from './core.component';

import {IntroGuard} from '@app/authentication/guards/intro.guard';

import {IntroComponent} from '@app/core/layout/intro/intro.component';

import {Error404Component} from '@app/shared/pages/error404/error404.component';
import {PermissionBasedGuard} from '@app/authentication/guards/permission-based-auth.guard';
import {DemoComponent} from "@app/shared/pages/demo/demo.component";
import {RoleManagementComponent} from "@app/roles/admin/pages/roles/roles.component";
import {CompaniesComponent} from "@app/roles/user/pages/companies/companies.component";
import {ProjectsComponent} from "@app/roles/user/pages/projects/projects.component";
import {CompanyComponent} from "@app/roles/user/pages/companies/company/company.component";
import {CompanyTaxInfoComponent} from "@app/roles/user/pages/companies/company/company-tax-info/company-tax-info.component";
import {CompanyAssociatesComponent} from "@app/roles/user/pages/companies/company/company-associates/company-associates.component";
import {CompanyEmployeesComponent} from "@app/roles/user/pages/companies/company/company-employees/company-employees.component";
import {CompanyExpensesComponent} from "@app/roles/user/pages/companies/company/company-expenses/company-expenses.component";
import {CompanyAssetsComponent} from "@app/roles/user/pages/companies/company/company-assets/company-assets.component";
import {CompanyHomeComponent} from "@app/roles/user/pages/companies/company/company-home/company-home.component";
import { AccountConfirmComponent } from "@app/authentication/pages/account-confirm/account-confirm.component";

const coreRoutes: Routes = [

    {
        path: '', component: CoreComponent, children: [
            {path: '', component: IntroComponent, canActivate: [IntroGuard]},
            {path: 'error404', component: Error404Component},
            {path: 'confirm-account', component: AccountConfirmComponent},
            {path: 'roles', component: RoleManagementComponent, canActivate: [PermissionBasedGuard]},
            {path: 'demo', component: DemoComponent},
            {path: 'companies', component: CompaniesComponent, canActivate: [IntroGuard]},
            {path: 'companies/:id', component: CompanyComponent, canActivate: [IntroGuard], children: [
                    {path: '', pathMatch: 'full', redirectTo: 'home'},
                    {path: 'home', component: CompanyHomeComponent},
                    {path: 'tax-info', component: CompanyTaxInfoComponent},
                    {path: 'associates', component: CompanyAssociatesComponent},
                    {path: 'employees', component: CompanyEmployeesComponent},
                    {path: 'expenses', component: CompanyExpensesComponent},
                    {path: 'assets', component: CompanyAssetsComponent}
                ]
            },
            {path: 'projects', component: ProjectsComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(coreRoutes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
