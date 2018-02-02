import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../../shared/models/enums/roles.enum';
import { PermissionService } from "@app/authentication/services/permission.service";
import { Observable } from "rxjs/Observable";


/**
 * Guard class for allowing access only for users with the {@link Role} of admin.
 */
@Injectable()
export class PermissionBasedGuard implements CanActivate, CanActivateChild {
    readonly TOOL_MANAGEMENT = 'tool-management';
    readonly TOOL_REQUEST = 'tool-request';
    readonly APPROVE_TOOL_REQUESTS_LINES = 'tool-requests-lines';
    readonly APPROVE_TOOL_REQUESTS_FACILITIES = 'tool-requests-facilities';


    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private permissionService: PermissionService) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.permissionService.hasPermissionForPage(this.authenticationService.getUserDetails(), route.url.toString())) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let canActivateBase = false;

        if (state.url && state.url.indexOf(this.TOOL_MANAGEMENT) > 0) {
            canActivateBase = this.permissionService
                .hasPermissionForPage(this.authenticationService.getUserDetails(), this.TOOL_MANAGEMENT);
        }

        if (state.url && state.url.indexOf(this.TOOL_REQUEST) > 0) {
            canActivateBase = this.permissionService
                .hasPermissionForPage(this.authenticationService.getUserDetails(), this.TOOL_REQUEST);
        }

        if (state.url && state.url.indexOf(this.APPROVE_TOOL_REQUESTS_LINES) > 0) {
            canActivateBase = this.permissionService
                .hasPermissionForPage(this.authenticationService.getUserDetails(), this.APPROVE_TOOL_REQUESTS_LINES);
        }

        if (state.url && state.url.indexOf(this.APPROVE_TOOL_REQUESTS_FACILITIES) > 0) {
            canActivateBase = this.permissionService
                .hasPermissionForPage(this.authenticationService.getUserDetails(), this.APPROVE_TOOL_REQUESTS_FACILITIES);
        }

        if (!canActivateBase) {
            this.router.navigate(['/']);
        }

        return canActivateBase;
    }
}
