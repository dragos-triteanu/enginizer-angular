import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import 'rxjs/add/operator/map';

import users from './data/users.data';
import roles from './data/roles.data';
import { UserService } from 'app/core/services/user.service';
import { Log } from 'ng2-logger';

class ApiEndpoints {
    static users = 'users';
}

function getApiRequestEndpoint(req: HttpRequest<any>) {
    const reqTokens = req.url.split('/');
    const apiIndex = reqTokens.indexOf('api');

    if (apiIndex < 0) {
        return '';
    }

    const endpoint = reqTokens[reqTokens.indexOf('api') + 1];
    return endpoint;
}

@Injectable()
export class UserMockInterceptor implements HttpInterceptor {
    _logger = Log.create(UserMockInterceptor.name);
    users = users;
    roles = roles;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const endpoint = getApiRequestEndpoint(req);
        if (endpoint === ApiEndpoints.users) {
            return this.processRequest(req);
        }

        return next.handle(req);
    }

    constructor() {
    }

    processRequest(req: HttpRequest<any>): any {
        const method = req.method;
        const url = req.url;
        const mockResponse = new Observable(resp => {
            let response;
            switch (method) {
                case 'GET':
                    if (url.startsWith(UserService.API_ROLES_BASE_PATH)) {
                        response = this.getUserRoles(req);
                        this._logger.info('mock::getUserRoles - ', req);
                    } else {
                        response = this.getPaginatedUsers(req);
                        this._logger.info('mock::getPaginatedUsers - ', req);
                    }
                    break;
                case 'PATCH':
                    response = this.patchUser(req);
                    this._logger.info('User::patchUser - ', response);
                    break;
            }
            resp.next(response);
            resp.complete();
        });

        return mockResponse;
    }

    private getPaginatedUsers(req: HttpRequest<any>): HttpResponse<any> {
        const params = req.params;
        const sortBy = params.get('sortBy');
        const sortDirection = params.get('sortDirection');
        const pageNumber = parseInt(params.get('page'), 10);
        const pageSize = parseInt(params.get('pageSize'), 10);
        const badgeId = params.get('badgeId');
        const email = params.get('email');
        const firstName = params.get('firstName');
        const role = params.get('role');
        const isActive = params.get('isActive');

        let data: any = _.filter(this.users.items, (user: User) => {
            let hasBoschId = true;
            let hasEmail = true;
            let hasName = true;
            let hasRole = true;
            let hasStatus = true;

            if (badgeId) {
                hasBoschId = user.badgeId.toLowerCase().indexOf(badgeId.toLowerCase()) > -1;
            }
            if (email) {
                hasEmail = user.email.toLowerCase().indexOf(email.toLowerCase()) > -1;
            }
            if (firstName) {
                hasName = user.firstName.toLowerCase().indexOf(firstName.toLowerCase()) > -1;
            }
            if (role) {
                hasRole = user.role.name.toLowerCase().indexOf(role.toLowerCase()) > -1;
            }
            if (isActive) {
                hasStatus = user.isActive === !!isActive;
            }
            return hasBoschId && hasEmail && hasName && hasRole && hasStatus;
        });

        if (sortBy) {
            data = _.orderBy(this.users, [sortBy], [sortDirection]);
        }


        if (pageNumber && pageSize) {
            const start = (pageNumber - 1) * pageSize;
            const end = pageNumber * pageSize;
            data = _.slice(data, start, end);
        }
        return new HttpResponse<any>({
            status: 200,
            body: {
                items: data,
                total: data.length
            }
        });
    }

    private getUserRoles(req: HttpRequest<any>): HttpResponse<any> {
        return new HttpResponse<any>({
            status: 200,
            body: this.roles
        });
    }

    private patchUser(req: HttpRequest<any>): HttpResponse<any> {
        return new HttpResponse<any>({
            status: 200,
            body: req.body
        });
    }

    private mapResponse = res => {
        return {
            users: this.mapUsers(res.data),
            count: res.count
        };
    };

    private mapUsers(users) {
        return users.map(user => new User(user));
    }
}
