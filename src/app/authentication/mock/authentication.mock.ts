import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';

import { UserRole } from '@models/role.model';

import { Observable } from 'rxjs/Observable';
import { User } from "@models/user.model";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return authenticationBackend(req.url, req.method, req) || next.handle(req);
    }
}

export function authenticationBackend(url: string, method: string, request: HttpRequest<any>): Observable<HttpEvent<any>> {

    // Array in local storage for registered users
    const users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    const adminUser = new User({
        id: 1,
        badgeId: '32136442675111986',
        email: 'admin@mail.com',
        password: 'password',
        role: new UserRole({
            id: 1,
            name: 'ADMIN',
            permissions: [
                'MANAGE_USERS',
                'VIEW_USERS',
                'MANAGE_ROLES',
                'VIEW_ROLES',
            ]
        }),
        isActive: true,
        name: 'Admin'
    });
    const company = new User({
        id: 2,
        badgeId: '55536442675111986',
        email: 'company@mail.com',
        password: 'password',
        role: new UserRole({
            id: 2,
            name: 'COMPANY',
            permissions: [
                '"VIEW_USERS",',
            ]
        }),
        isActive: true,
        name: 'Company'
    });

    if (users.length === 0) {
        users.push(adminUser, company);
    }

    if (url.endsWith('/api/authenticate/credentials') && method === 'POST') {
        // Get parameters from POST request
        const params: any = request.body;
        // Find if any user matches login credentials
        const filteredUsers = users.filter(user => {
            return user.email === params.email && user.password === params.password;
        });


        // If login details are valid return 200: OK along with user details and a fake JWT Token
        if (filteredUsers.length) {
            const user = filteredUsers[0];

            if (user.role.name === 'ADMIN') {
                // Return response for user with role ADMIN
                return new Observable(resp => {
                    resp.next(new HttpResponse<any>({
                        status: 200,
                        body: {
                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZmRlNWM2My1hZGRhL' +
                            'TQzZWEtYjA4MC1kZDljZWU2Yzg1YWQiLCJpc3MiOiJodHRwOi8vZW5naW5pemVyLmNvbSIsIn' +
                            'N1YiI6ImFkbWluQG1haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwidXNlcklkIjoiMSIs' +
                            'ImJhZGdlSWQiOiI1MzIzNjQ0MjY3NTExMTk4NiIsInJvbGUiOiJBRE1JTiIsInBlcm1pc3Npb2' +
                            '5zIjpbIk1BTkFHRV9VU0VSUyIsIlZJRVdfVVNFUlMiLCJNQU5BR0VfUk9MRVMiLCJWSUVXX1JP' +
                            'TEVTIl0sImV4cCI6MTUxNzU0OTIwNSwiYXVkIjoiRW5naW5pemVyIn0.g0Z6s7iV6g4FWkJuot' +
                            'GN2sDjI8VUNUWAg5k_6Mr7cNI',
                            statusCode: 200
                        }
                    }));
                    resp.complete();
                });
            } else if (user.role.name === 'COMPANY') {
                // Return response for user with role LINE_SETTER
                return new Observable(resp => {
                    resp.next(new HttpResponse<any>({
                        status: 200,
                        body: {
                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZmRlNWM2My1hZGRhLTQz' +
                            'ZWEtYjA4MC1kZDljZWU2Yzg1YWQiLCJpc3MiOiJodHRwOi8vZW5naW5pemVyLmNvbSIsInN1YiI6' +
                            'ImNvbXBhbnlAbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiQ29tcGFueSIsInVzZXJJZCI6IjEiLCJi' +
                            'YWRnZUlkIjoiNTk5OTQ0MjY3NTExMTk4MCIsInJvbGUiOiJDT01QQU5ZIiwicGVybWlzc2lvbnMi' +
                            'OlsiVklFV19VU0VSUyJdLCJleHAiOjE1MTc1NDkyMDUsImF1ZCI6IkVuZ2luaXplciJ9.VfJAb9L' +
                            'tOFAg3duRsplRySR8rD9KOcWiAY0ECYWGZDc',
                            statusCode: 200
                        }
                    }));
                    resp.complete();
                });
            }
        } else {
            // Else return 400: Bad request
            return Observable.throw(new HttpErrorResponse({
                error: 'general.messages.401.loginError',
                status: 401,
                statusText: 'Unauthorized',
                url: url
            }));
        }
    }

}
