import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Log } from 'ng2-logger';
import { PermissionService } from '@app/authentication/services/permission.service';
import { JWTUser } from '@models/jwt-data.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    _logger = Log.create(SidebarComponent.name);

    @Input()
    currentUser: JWTUser;
    isExpanded = false;

    constructor(private permissionService: PermissionService) {
    }

    // Previously sued to subscribe to socket changes
    ngOnInit(): void {
    }

    // Previously sued to unsubscribe from socket changes
    ngOnDestroy(): void {
    }


    hasPermission(requiredPermission) {
        return this.currentUser.permissions && this.currentUser.permissions.indexOf(requiredPermission) > -1;
    }

    hasSection(section) {
        return this.permissionService.hasPermissionsForSection(this.currentUser, section);
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

}
