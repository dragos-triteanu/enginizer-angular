import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

import { Role } from '@models/enums/roles.enum';
import { Log } from 'ng2-logger';

/**
 * Guard class for allowing access only for users with the {@link Role} of atom operator
 */
@Injectable()
export class IntroGuard implements CanActivate {
    _logger = Log.create(IntroGuard.name);

    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const isAllowedLogin = this.authenticationService.isAllowedLogin();
        this._logger.info('canActivate:: Is allowed login', isAllowedLogin);
        if (!isAllowedLogin) {
            this.router.navigate(['/auth']);
            return false;
        }

        const isCurrentUserMilkrun = this.authenticationService.isCurrentUserWithRole(Role.COMPANY);
        this._logger.info('canActivate:: Is current user with role', Role.COMPANY, isCurrentUserMilkrun);

        return true;
    }
}
