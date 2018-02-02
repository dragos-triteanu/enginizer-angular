import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';
import { RoleService } from '@services/role.service';

import roles from './data/roles.data';

/**
 * Mock class for mocking {@link PlantService} operations on {@link Plant} objects.
 */
@Injectable()
export class RolesMockInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return rolesBackend(req.url, req.method, req) || next.handle(req);
    }
}

export function rolesBackend(url: string, method: string, request: HttpRequest<any>): Observable<HttpEvent<any>> {

    // Array in local storage for registered plants

    if (url.startsWith(RoleService.API_ROLES_BASE_PATH) && method === 'GET') {
        // Get parameters from POST request
        const params: any = request.params;

        if (params.keys().length > 0) {
            let filteredList = roles.items;

            const nameParam = _.find(params.keys, function (o) {
                return o === 'name'
            });

            if (nameParam) {
                filteredList = filteredList.filter(plant => {
                    return (plant.name.startsWith(params.get('name')));
                });
            }

            return new Observable(resp => {
                resp.next(new HttpResponse<any>({
                    status: 200,
                    body: {
                        items: filteredList,
                        total: filteredList.length
                    }
                }));
                resp.complete();
            });


        } else {
            // If login details are valid return 200: OK along with user details and a fake JWT Token

            return new Observable(resp => {
                resp.next(new HttpResponse<any>({
                    status: 200,
                    body: roles
                }));
                resp.complete();
            });
        }
    }

}
