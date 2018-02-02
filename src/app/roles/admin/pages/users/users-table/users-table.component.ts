import { User } from '../../../../../shared/models/user.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableConfig } from '@app/shared/util/table-config.utils';
import { UserRole } from "@models/role.model";
import { Log } from "ng2-logger";

@Component({
    selector: 'app-users-table',
    templateUrl: 'users-table.component.html',
    styleUrls: ['users-table.component.scss']
})
export class UsersTableComponent {
    _logger = Log.create(UsersTableComponent.name);
    @Input() users = new Array<User>();
    @Input() userRoles = new Array<UserRole>();
    @Input() userStates = new Array<any>();
    @Input() tableConfig: TableConfig;
    @Input() isLoading = false;
    @Input() rowExpand = true;

    @Output() pageChange = new EventEmitter<any>();
    @Output() filterChange = new EventEmitter<any>();
    @Output() sortChange = new EventEmitter<any>();

    @Output() updateUserRole = new EventEmitter<any>();
    @Output() updateUserStatus = new EventEmitter<any>();

    onPageChange(tableConfig: TableConfig) {
        this._logger.info("onPageChange::", tableConfig);
        this.pageChange.emit(tableConfig);
    }

    onSortChange(tableConfig: TableConfig) {
        this._logger.info("onSortChange::", tableConfig);
        this.sortChange.emit(tableConfig);
    }

    onFilterChange(tableConfig: TableConfig) {
        this._logger.info("onFilterChange::", tableConfig);
        this.filterChange.emit(tableConfig);
    }

    onUserRoleUpdate(user, newRole) {
        this._logger.info("onUserRoleUpdate::", user, newRole);
        const payload = {
            user: user,
            role: newRole
        };
        this.updateUserRole.emit(payload);
    }

    onUserStatusUpdate(user, isActive) {
        this._logger.info("onUserStatusUpdate::", user, isActive);
        const payload = {
            user: user,
            isActive: isActive
        };
        this.updateUserStatus.emit(payload);
    }
}
