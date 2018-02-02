import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { JWTUser } from '../../shared/models/jwt-data.model';
import { Role } from '../../shared/models/enums/roles.enum';
import { UserService } from '@services/user.service';

/**
 * Service for handling authentication operations, and for retrieving decrypted information
 * about the current user from the stored JWT.
 */
@Injectable()
export class AuthenticationService {
    static readonly USER_TOKEN_KEY = 'user_token';
    static readonly USER_DATA_TOKEN = 'user_data_untill_refresh_token';
    static readonly API_LOGIN_BASE_PATH = `${environment.baseURL}/api/authenticate/credentials`;
    static readonly API_LOGIN_BOSCH_ID_BASE_PATH = `${environment.baseURL}/api/authenticate/boschidentifier`;

    isRefreshing = false;

    constructor(private http: HttpClient, private jwtHelper: JwtHelper) {
    }

    login(user) {
        if (!localStorage.getItem(AuthenticationService.USER_DATA_TOKEN)) {
            const userDataToken = btoa(JSON.stringify({email: user.email, password: user.password}));
            localStorage.setItem(AuthenticationService.USER_DATA_TOKEN, userDataToken);
        }

        return this.http.post(`${AuthenticationService.API_LOGIN_BASE_PATH}`, user)
            .map(response => {
                this.handleLoginSuccess(response);
                return response;
            });
    }

    loginWithBadgeId(badgeId) {
        return this.http.post(`${AuthenticationService.API_LOGIN_BOSCH_ID_BASE_PATH}`, {'badgeId': badgeId})
            .map(response => {
                this.handleLoginSuccess(response);
                return response;
            });
    }

    addUserBadgeId(badgeId) {
        return this.http.patch(`${UserService.API_USERS_BASE_PATH}`, {'badgeId': badgeId})
            .map(response => {
                this.handleLoginSuccess(response);
                return response;
            });
    }

    logout() {
        localStorage.removeItem(AuthenticationService.USER_TOKEN_KEY);
        localStorage.removeItem(AuthenticationService.USER_DATA_TOKEN);
    }

    storeToken(token: string): void {
        localStorage.setItem(AuthenticationService.USER_TOKEN_KEY, token);
    }

    refreshToken() {
        const encoded = localStorage.getItem(AuthenticationService.USER_DATA_TOKEN);
        const userData = JSON.parse(atob(encoded));
        this.isRefreshing = true;
        return this.http.post(`${AuthenticationService.API_LOGIN_BASE_PATH}`, userData)
            .map((data: any) => {
                this.isRefreshing = false;
                this.storeToken(data.token);
                return data;
            });
    }

    getUserDetails(): JWTUser {
        const token = localStorage.getItem(AuthenticationService.USER_TOKEN_KEY);
        return token ? this.jwtHelper.decodeToken(token) : null;
    }

    isCurrentUserWithRole(role: Role) {
        const userDetails = this.getUserDetails();
        return userDetails ? userDetails.role === Role[role] : true;
    }

    isAllowedLogin() {
        const userDetails = this.getUserDetails();
        return null != userDetails.badgeId && null != userDetails.role;
    }

    private handleLoginSuccess(data) {
        this.storeToken(data.token);
    }

}
