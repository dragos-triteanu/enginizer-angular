import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';


import { UserRole } from "@models/role.model";
import { Company } from "@models/company.model";

/**
 * Service class for handling CRUD operations on {@link UserRole} objects.
 */
@Injectable()
export class CompanyService {
    static readonly API_COMPANIES_BASE_PATH = `${environment.baseURL}/api/companies`;

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<Company[]>(`${CompanyService.API_COMPANIES_BASE_PATH}`)
        .map(this.mapCompany);
    }

    private mapCompany = res => {
        return new Company(res);
    };

}
