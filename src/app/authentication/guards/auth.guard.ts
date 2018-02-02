import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

/**
 * Guard class for redirecting the user to the login page, if he is not logged in.
 * ATM this is done by verifying if a jwt token exists in the local storage.
 */
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('user_token')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
