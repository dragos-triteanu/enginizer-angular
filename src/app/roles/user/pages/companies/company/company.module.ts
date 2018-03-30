import {NgModule} from "@angular/core";
import {CompanyComponent} from "@app/roles/user/pages/companies/company/company.component";
import {CompanyHomeComponent} from "@app/roles/user/pages/companies/company/company-home/company-home.component";
import {CompanyTaxInfoComponent} from "@app/roles/user/pages/companies/company/company-tax-info/company-tax-info.component";
import {CompanyAssociatesComponent} from "@app/roles/user/pages/companies/company/company-associates/company-associates.component";
import {CompanyEmployeesComponent} from "@app/roles/user/pages/companies/company/company-employees/company-employees.component";
import {CompanyExpensesComponent} from "@app/roles/user/pages/companies/company/company-expenses/company-expenses.component";
import {CompanyAssetsComponent} from "@app/roles/user/pages/companies/company/company-assets/company-assets.component";
import {CompanyRoutingModule} from "@app/roles/user/pages/companies/company/company-routing.module";
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
    declarations: [
        CompanyComponent,
        CompanyHomeComponent,
        CompanyTaxInfoComponent,
        CompanyAssociatesComponent,
        CompanyEmployeesComponent,
        CompanyExpensesComponent,
        CompanyAssetsComponent,
    ],
    imports: [
        CompanyRoutingModule,
        SharedModule,
    ]
})

export class CompanyModule {}
