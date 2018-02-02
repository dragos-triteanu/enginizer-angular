import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Log } from 'ng2-logger';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

/**
 * Interceptor for handling errors.
 */

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
    private _logger = Log.create(ErrorHandlingInterceptor.name);
    readonly X_CORRELATION_ID = 'X-Correlation-ID';
    private authService: AuthenticationService;
    private translateService: TranslateService;
    private router: Router;
    private toastr: ToastsManager;

    constructor(private injector: Injector) {
        // what the fuck angular
        setTimeout(() => {
            this.authService = this.injector.get(AuthenticationService);
            this.translateService = this.injector.get(TranslateService);
            this.router = this.injector.get(Router);
            this.toastr = this.injector.get(ToastsManager);
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch((res: HttpErrorResponse) => {
            switch (res.status) {
                case 400:
                case 403:
                case 409:
                case 500:
                    if (res.error && res.error.message) {
                        const errorMessage = this.translateService.instant(res.error.message);
                        this._logger.error(errorMessage);
                        this.toastr.error(errorMessage);
                    }
                    const correlationId = req.headers.get(this.X_CORRELATION_ID);
                    if (correlationId) {
                        this._logger.error('Please contact the administrator and use this ID: ' + correlationId);
                        const errorMessage =
                            this.translateService.instant('errorMessage.correlationId', {correlationId: correlationId});
                        this.toastr.error(errorMessage);
                    }
                    break;
                case 401:
                    this._logger.error('Unauthorized ', res);
                    if (res.error && res.error.message) {
                        this.toastr.error(this.translateService.instant(res.error.message));
                    } else if (!this.authService.isRefreshing) {
                        this.authService.refreshToken().subscribe(() => {
                            this._logger.info('Should retry request');
                            next.handle(req.clone());
                        });
                    } else {
                        this.router.navigate(['/auth']).then();
                    }
                    break;
                case 404:
                    this.router.navigate(['/error404']).then();
                    break;
                default:
                    if (res && res.status) {
                        return Observable.throw(res);
                    }
            }

            return Observable.throw(res);
        });
    }
}
