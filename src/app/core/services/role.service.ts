import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

import { TableConfig } from '@app/shared/util/table-config.utils';
import { PagedResponse } from "@models/response.model";
import { UserRole } from "@models/role.model";
import { AppUtils } from "@app/shared/util/app.utils";
import * as _ from 'lodash';

/**
 * Service class for handling CRUD operations on {@link UserRole} objects.
 */
@Injectable()
export class RoleService {
    static readonly API_ROLES_BASE_PATH = `${environment.baseURL}/api/roles`;

    constructor(private http: HttpClient) {
    }

    getAllRoles(tableConfig: TableConfig = null) {
        const params = AppUtils.buildPageableParams(tableConfig);
        return this.http.get<PagedResponse<UserRole>>(`${RoleService.API_ROLES_BASE_PATH}`, {params: params});
    }

    createRole(role) {
        return this.http.post<UserRole>(`${RoleService.API_ROLES_BASE_PATH}`, this.getRoleCopy(role));
    }

    updateRole(role) {
        const copyRole = this.getRoleCopy(role)
        return this.http.put<UserRole>(`${RoleService.API_ROLES_BASE_PATH}/${copyRole.id}`, copyRole);
    }

    deleteRole(role) {
        return this.http.delete<UserRole>(`${RoleService.API_ROLES_BASE_PATH}/${role.id}`);
    }

    getRoleCopy(role) {
        const copyRole: any = {
            id: role.id,
            name: role.name,
            isOob: role.isOob,
            permissions: _.map(role.permissions, 'id')
        };
        return copyRole;
    }
}
