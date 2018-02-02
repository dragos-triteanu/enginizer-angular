import { UserService } from '../../../../core/services/user.service';
import { TranslateParser, TranslateService } from '@ngx-translate/core';
import { User } from '@models/user.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TableConfig } from 'app/shared/util/table-config.utils';
import { UserRole } from '@models/role.model';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';
import { RoleService } from 'app/core/services/role.service';
import { PermissionService } from '@app/authentication/services/permission.service';
import { Log } from 'ng2-logger';

@Component({
    selector: 'app-user-list',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss']
})
export class UserListComponent implements OnInit {
    _logger = Log.create(UserListComponent.name);
    isLoadingUsers = false;

    users = new Array<User>();
    roles = new Array<UserRole>();
    userStates = [
        {name: 'All', value: 'All'},
        {name: 'Active', value: true},
        {name: 'Disabled', value: false}
    ];

    tableConfig = new TableConfig();

    constructor(private userService: UserService,
                private rolesService: RoleService,
                private translateService: TranslateService,
                private toastr: ToastsManager,
                private permissionService: PermissionService,
                private translate: TranslateService,
                private translateParser: TranslateParser) {
        this.userStates = this.getUserStates();
        this.translateService.onLangChange.subscribe((event) => {
            this.userStates = this.getUserStates();
        });
    }

    ngOnInit() {
        this.getAll();
        if (this.shouldAllowUserEdit()) {
            this.getUserRoles();
        }
    }

    private getAll(tableConfig = this.tableConfig) {
        this._logger.info('getAll:: Users table state::', tableConfig);
        this.isLoadingUsers = true;
        this.userService.getUsers(tableConfig).subscribe(data => {
            this._logger.info('getAll:: API returned data', data);
            this.isLoadingUsers = false;
            this.setUsers(data.users)
            this.tableConfig.pager.count = data.count;
        });
    }

    private setUsers(users) {
        this.users = users.map((user, index) => {
            user.index = this.getRealIndex(index);
            return user;
        });
    }

    private getRealIndex(index) {
        const pagination = this.tableConfig.pager;
        const startIndex = (pagination.page - 1) * pagination.pageSize + 1;
        return startIndex + index;
    }

    onUserRoleUpdate(payload) {
        this.isLoadingUsers = true;
        this.userService.updateUserRole(payload.user, payload.role)
            .subscribe((user) => {
                this.handleSuccessfulUpdate(payload.user);
            }, (error) => {
                this.handleUpdateError(error, payload.user);
            });
    }

    onUserStatusUpdate(payload) {
        this.isLoadingUsers = true;
        this.userService.updateUserStatus(payload.user, payload.isActive)
            .subscribe((data) => {
                this.handleSuccessfulUpdate(payload.user);
            }, (error) => {
                this.handleUpdateError(error, payload.user);
            })
    }

    private getUserRoles() {
        const roleLabels = this.translateService.get('roles').subscribe();
        this.rolesService.getAllRoles().subscribe(data => {
            this._logger.info('getUserRoles:: API returned data', data);
            this.roles = data.items;
            this.updateRoleLabels();
        });
    }

    private updateRoleLabels() {
        this.translateService.get('roles').subscribe((labels) => {
            this.roles = this.roles.map(role => {
                return role;
            });
        });
    }

    // TODO good for demo, bad for general use
    private getUserStates() {
        return [
            {
                name: this.translate.instant('admin.users.table.filters.status.all'),
                value: 'All'
            },
            {
                name: this.translate.instant('admin.users.table.filters.status.active'),
                value: true
            },
            {
                name: this.translate.instant('admin.users.table.filters.status.disabled'),
                value: false
            }
        ];
    }

    onSortChange(tableState) {
        this.getAll(tableState);
    }

    onFilter(tableState) {
        this.getAll(tableState);
    }

    onPageChange(tableState) {
        this.getAll(tableState);
    }

    private handleUpdateError(error, user) {
        this.toastr.error(this.translateParser.interpolate(
            this.translate.instant('admin.users.toasts.error'), {user: user.fullName}), null, {toastLife: environment.toasts.duration});
        return Observable.throw(error);
    }

    private handleSuccessfulUpdate(payload) {
        this.isLoadingUsers = false;
        this.getAll();
        this.toastr.success(this.buildUpdateMessage(payload), null, {toastLife: environment.toasts.duration});
    }

    private buildUpdateMessage(user) {
        return this.translateParser.interpolate(
            this.translate.instant('admin.users.toasts.updated'), {user: user.fullName});
    }

    shouldAllowUserEdit() {
        return this.permissionService.hasHasPermissionForFeature('MANAGE_USERS');
    }
}
