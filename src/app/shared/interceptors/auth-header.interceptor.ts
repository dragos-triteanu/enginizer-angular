import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Log } from 'ng2-logger';

/**
 * Interceptor class for adding the JWT Authorization header to all the requests mad to the API.
 */

@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {
    private _logger = Log.create(AuthorizationHeaderInterceptor.name);
    readonly AUTHORIZATION_HEADER = 'Authorization';
    readonly X_CORRELATION_ID = "X-Correlation-ID";

    getRandom(length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = req.headers.set(this.AUTHORIZATION_HEADER, 'Bearer ' + localStorage.getItem('user_token'));
        headers = headers.set(this.X_CORRELATION_ID, this.getRandom(6).toString());
        const clonedRequest = req.clone({
            headers: headers
        });

        return next.handle(clonedRequest);
    }
}
