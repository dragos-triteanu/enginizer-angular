import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Log } from 'ng2-logger';
import { AuthenticationService } from "@app/authentication/services/authentication.service";

/**
 * Guard class for allowing access only for users that have a jwt token in the local storage.
 */
@Injectable()
export class IntroGuard implements CanActivate {
    _logger = Log.create(IntroGuard.name);

    constructor(private router: Router, private authService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        this.authService.getUserDetails();

        if (localStorage.getItem('user_token')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth'], {queryParams: {returnUrl: state.url}});

        return false;
    }
}
