import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CompanyComponent} from "@app/roles/user/pages/companies/company/company.component";
import {CompanyHomeComponent} from "@app/roles/user/pages/companies/company/company-home/company-home.component";
import {CompanyTaxInfoComponent} from "@app/roles/user/pages/companies/company/company-tax-info/company-tax-info.component";
import {CompanyAssociatesComponent} from "@app/roles/user/pages/companies/company/company-associates/company-associates.component";
import {CompanyEmployeesComponent} from "@app/roles/user/pages/companies/company/company-employees/company-employees.component";
import {CompanyExpensesComponent} from "@app/roles/user/pages/companies/company/company-expenses/company-expenses.component";
import {CompanyAssetsComponent} from "@app/roles/user/pages/companies/company/company-assets/company-assets.component";

const companyRoutes: Routes = [
    /*{path: 'companies/:id', component: CompanyComponent, children: [
            {path: '', pathMatch: 'full', redirectTo: 'home'},
            {path: 'home', component: CompanyHomeComponent},
            {path: 'tax-info', component: CompanyTaxInfoComponent},
            {path: 'associates', component: CompanyAssociatesComponent},
            {path: 'employees', component: CompanyEmployeesComponent},
            {path: 'expenses', component: CompanyExpensesComponent},
            {path: 'assets', component: CompanyAssetsComponent}
        ]}*/
];

@NgModule({
    imports: [
        RouterModule.forRoot(companyRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CompanyRoutingModule {}
