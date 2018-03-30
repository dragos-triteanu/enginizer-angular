import { environment } from '../../../environments/environment';
import { User } from '@models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { TableConfig } from '@app/shared/util/table-config.utils';
import { AppUtils } from '@app/shared/util/app.utils';
import { PagedResponse } from '@models/response.model';
import { UserRole } from '@models/role.model';

@Injectable()
export class UserService {
    static readonly API_USERS_BASE_PATH = `${environment.baseURL}/api/auth/register`;
    static readonly API_ROLES_BASE_PATH = `${environment.baseURL}/api/roles`;

    roles = new Array<UserRole>();

    constructor(private http: HttpClient) {
        this.getUserRoles();
    }

    getUsers(tableConfig: TableConfig = null) {
        const params = AppUtils.buildPageableParams(tableConfig);

        return this.http.get<PagedResponse<User>>(`${UserService.API_USERS_BASE_PATH}`, {
            params: params
        }).map(this.mapUsers);
    }

    getUserRoles() {
        return this.http.get(`${UserService.API_ROLES_BASE_PATH}`)
            .map(this.mapUserRoles);
    }

    updateUser(user, data) {
        return this.http.put(`${UserService.API_USERS_BASE_PATH}/${user.id}`, data);
    }

    updateUserStatus(user: User, isActive: any) {
        return this.updateUser(user, {isActive: isActive});
    }


    private mapUsers = res => {
        return {
            users: res.items.map(user => new User(user)),
            count: res.total
        };
    };

    private mapUserRoles = res => {
        return {
            items: res.items.map(role => {
                return new UserRole(role);
            }),
            count: res.total
        };
    }
}
