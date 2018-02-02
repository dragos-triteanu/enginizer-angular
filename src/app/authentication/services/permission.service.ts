///<reference path="authentication.service.ts"/>
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { JWTUser } from '../../shared/models/jwt-data.model';

import * as _ from 'lodash';
import { AuthenticationService } from '@app/authentication/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Permission } from '@models/permission.model';
import { PagedResponse } from '@models/response.model';

/**
 * Service class for conveniently resolving permission requirements for app urls.
 */

const NAV_SECTIONS = {
    USER_ROLE_SECTION: ['VIEW_ROLES', 'VIEW_USERS'],
    INFRASTRUCTURE_SECTION: ['VIEW_PLANTS', 'VIEW_LINES', 'VIEW_EQUIPMENT', 'VIEW_PARTNUMBERS'],
    TOOL_SECTION: ['VIEW_TOOLS', 'VIEW_TOOL_HISTORY', 'MANAGE_TOOLS'],
    ISSUES_SECTION: ['VIEW_ISSUES', 'CREATE_ISSUES'],
    TICKETS_SECTION: ['MANAGE_TICKETS'],
    REQUEST_TOOLS_SECTION: ['CREATE_TOOL_REQUESTS', 'VIEW_TOOL_REQUESTS'],
    RETURN_TOOLS_SECTION: ['VIEW_TOOL_RETURNS', 'CREATE_TOOL_RETURNS'],
    APPROVE_TOOL_REQUESTS_SECTION: ['APPROVE_TOOL_REQUESTS'],
    APPROVE_TOOL_RETURNS_SECTION: ['APPROVE_TOOL_RETURNS'],
    PROCESS_TOOL_REQUESTS_SECTION: ['PROCESS_TOOL_REQUESTS'],
    PROCESS_TOOL_RETURNS_SECTION: ['PROCESS_TOOL_RETURNS'],
    PROCESS_TICKETS_SECTION: ['PROCESS_TICKETS']
};


const URL_PERMISSIONS = new Map<string, string[]>();
// Admin
URL_PERMISSIONS.set('users', ['VIEW_USERS', 'MANAGE_USERS']);
URL_PERMISSIONS.set('roles', ['VIEW_ROLES', 'MANAGE_ROLES']);


@Injectable()
export class PermissionService {

    static readonly API_PERMISSION_BASE_PATH = `${environment.baseURL}/api/permissions`;

    constructor(private authenticationService: AuthenticationService,
                private http: HttpClient) {
    }

    /**
     * Method that verifies whether the logged in user has permissions for using a feature
     * @param {string} requiredPermission the required permission
     * @returns {boolean} true if the user has the permission, false otherwise.
     */
    hasHasPermissionForFeature(requiredPermission: string) {
        const currentUser = this.authenticationService.getUserDetails();
        return currentUser && currentUser.permissions.indexOf(requiredPermission) > -1;
    }

    hasPermissionForPage(user: JWTUser, url: string) {
        const permissions = URL_PERMISSIONS.get(url) || [];
        return user && _.intersection(permissions, [].concat(user.permissions)).length > 0;
    }

    hasPermissionsForSection(user: JWTUser, section: string) {
        return _.intersection(NAV_SECTIONS[section], [].concat(user.permissions)).length;
    }

    getAllPermissions() {
        return this.http.get<PagedResponse<Permission>>(`${PermissionService.API_PERMISSION_BASE_PATH}`);
    }
}
