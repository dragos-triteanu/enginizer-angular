import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PermissionService } from '@app/authentication/services/permission.service';


import permissions from './data/permissions.data';

/**
 * Mock class for mocking {@link PlantService} operations on {@link Plant} objects.
 */
@Injectable()
export class PermissionsMockInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return permissionsBackend(req.url, req.method, req) || next.handle(req);
    }
}

export function permissionsBackend(url: string, method: string, request: HttpRequest<any>): Observable<HttpEvent<any>> {

    // Array in local storage for registered plants

    if (url.startsWith(PermissionService.API_PERMISSION_BASE_PATH) && method === 'GET') {

        return new Observable(resp => {
            resp.next(new HttpResponse<any>({
                status: 200,
                body: permissions
            }));
            resp.complete();
        });
    }

}
