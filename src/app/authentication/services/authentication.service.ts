import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelper } from 'angular2-jwt';

import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { JWTUser } from '../../shared/models/jwt-data.model';
import { User } from "@models/user.model";

/**
 * Service for handling authentication operations, and for retrieving decrypted information
 * about the current user from the stored JWT.
 */
@Injectable()
export class AuthenticationService {
    static readonly USER_TOKEN_KEY = 'user_token';
    static readonly USER_DATA_TOKEN = 'user_data_untill_refresh_token';
    static readonly API_REGISTER_BASE_PATH = `${environment.baseURL}/api/auth/register`;
    static readonly API_CONFIRM_ACCOUNT_PATH = `${environment.baseURL}/api/auth/confirmAccount`;
    static readonly API_FORGET_PASSWORD_PATH = `${environment.baseURL}/api/auth/forgotPassword`;
    static readonly API_RESET_PASSWORD_PATH = `${environment.baseURL}/api/auth/resetPassword`;
    static readonly API_LOGIN_BASE_PATH = `${environment.baseURL}/api/auth/login`;

    isRefreshing = false;

    constructor(private http: HttpClient, private jwtHelper: JwtHelper) { }

    // Create a user
    createUser(user) {
        return this.http.post(AuthenticationService.API_REGISTER_BASE_PATH, user);
    }

    // Confirm the account
    confirmAccount(token) {
        return this.http.post(AuthenticationService.API_CONFIRM_ACCOUNT_PATH, token);
    }

    // Forget Password
    forgetPassword(email) {
        return this.http.post(AuthenticationService.API_FORGET_PASSWORD_PATH, email);
    }

    // Reset Password
    resetPassword(data) {
        return this.http.post(AuthenticationService.API_RESET_PASSWORD_PATH, data);
    }

    // Login User
    login(user) {
        if (!localStorage.getItem(AuthenticationService.USER_DATA_TOKEN)) {
            const userDataToken = btoa(JSON.stringify({
                email: user.email,
                password: user.password
            }));
            localStorage.setItem(AuthenticationService.USER_DATA_TOKEN, userDataToken);
        }
        return this.http.post(`${AuthenticationService.API_LOGIN_BASE_PATH}`, user)
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

    private handleLoginSuccess(data) {
        this.storeToken(data.token);
    }

    private mapUsers = res => {
        return {
            users: res.items.map(user => new User(user)),
            count: res.total
        };
    };
}
