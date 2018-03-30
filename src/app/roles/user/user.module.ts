import { NgModule } from "@angular/core";
import { UserComponent } from "@app/roles/user/user.component";
import { CompaniesComponent } from "@app/roles/user/pages/companies/companies.component";
import { ProjectsComponent } from "@app/roles/user/pages/projects/projects.component";
import { SharedModule } from "@app/shared/shared.module";
import { CompanyModule } from "@app/roles/user/pages/companies/company/company.module";
import { CreateProjectsModalComponent } from './pages/projects/components/create-projects-modal/create-projects-modal.component';

@NgModule({
    declarations: [
        UserComponent,
        CompaniesComponent,
        ProjectsComponent,
        CreateProjectsModalComponent
    ],
    imports: [
        SharedModule,
        CompanyModule
    ]
})

export class UserModule {
}
