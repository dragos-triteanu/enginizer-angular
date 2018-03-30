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
    SAMPLE_SECTION: ['SAMPLE_PERMISSION'],
};


const URL_PERMISSIONS = new Map<string, string[]>();
// Admin
URL_PERMISSIONS.set('sample', ['SAMPLE_PERMISSION']);


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
