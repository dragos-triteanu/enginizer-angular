import { Component, OnInit, ViewChild } from '@angular/core';
import { UserRole } from '@models/role.model';
import { Permission } from 'app/shared/models/permission.model';
import { TableConfig } from 'app/shared/util/table-config.utils';
import { RoleService } from 'app/core/services/role.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateParser, TranslateService } from '@ngx-translate/core';
import { RolesModalComponent } from './components/roles-modal/roles-modal.component';
import { environment } from 'environments/environment';
import { Log } from 'ng2-logger';
import { PermissionService } from '@app/authentication/services/permission.service';

@Component({
    selector: 'app-role',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss']
})

export class RoleManagementComponent implements OnInit {
    _logger = Log.create(RoleManagementComponent.name);

    @ViewChild(RolesModalComponent) roleFormModal: RolesModalComponent;

    permissions: Permission[] = [];
    roles: UserRole[] = [];
    selectedRole: UserRole = new UserRole();
    tableConfig = new TableConfig();
    isLoadingRoles = false;

    constructor(private roleService: RoleService,
                private toastr: ToastsManager,
                private translationService: TranslateService,
                private permissionService: PermissionService,
                private translateParser: TranslateParser) {

    }

    ngOnInit() {
        this._logger.data('init');
        this.getAll();
    }


    /**
     * Opens the modal and sets up it's specific requirements.
     * @param {any} plant
     */
    openRoleModal() {
        this._logger.info('openRoleModal: Opening create role modal ');
        this.selectedRole = new UserRole();
        this.roleFormModal.open();
    }

    onTableRowClick(event) {
        this._logger.info('onTableRowClick: Opening modal with event', event);
        this.selectedRole = event;
        this.roleFormModal.open(event);
    }

    getAll() {
        this._logger.info('getAll(): Retrieving all roles from API');
        this.isLoadingRoles = true;
        this.roleService.getAllRoles(this.tableConfig).subscribe(
            (data: any) => {
                this._logger.data('getAll(): API returned', data.items);
                this.roles = data.items;
                this.tableConfig.pager.count = data.total;
                this.isLoadingRoles = false;
                this.tableConfig.pager.count = data.total;
            },
            (error: any) => {
                this._logger.error('getAll(): Error while retrieving roles', error);
            }
        );
    }

    create(role: UserRole) {
        this._logger.info('create(): Creating Role', role);
        this.roleService.createRole(role).subscribe(
            (data: any) => {
                this._logger.info('create(): Role created. API response is', data);
                this.getAll();
                this.toastr.success(this.buildCreateMessage(data.name), null, {toastLife: environment.toasts.duration});
                this.roleFormModal.close();
            },
            (error: any) => {
                this._logger.info('create(): Error while creating role', error);
            }
        );
    }

    remove(role: UserRole) {
        this._logger.info('remove(): Removing role', role);
        this.roleService.deleteRole(role).subscribe(
            (data: any) => {
                this._logger.info('remove(): Role deleted. API response is', data);
                this.getAll();
                this.toastr.warning(this.buildDeleteMessage(role.name), null, {toastLife: environment.toasts.duration});
                this.roleFormModal.close();
            },
            (error: any) => {
                this._logger.info('remove(): Error while removing role', error);
            }
        );
    }

    update(roleUpdate) {
        this._logger.info('update(): Updating role', roleUpdate);
        this.roleService.updateRole(roleUpdate.newRole).subscribe(
            (data: any) => {
                this._logger.info('update(): Role updated. API response is', data);
                this.getAll();
                this.toastr.success(this.buildUpdateMessage(roleUpdate.previousRoleName), null, {toastLife: environment.toasts.duration});
                this.roleFormModal.close();
            },
            (error: any) => {
                this._logger.info('update(): Error whole updating role', error);
            }
        );
    }

    onSortChange(tableState: TableConfig) {
        this._logger.info('onSortChange: ', tableState);
        this.getAll();
    }

    onFilter(tableConfig: TableConfig) {
        this._logger.info('onFilter: ', tableConfig);
        this.getAll();
    }

    onPageChange(tableConfig: TableConfig) {
        this._logger.info('onFilter: ', tableConfig);
        this.getAll();
    }

    buildCreateMessage(roleName) {
        const message = this.translationService.instant('admin.roles.toasts.created');
        return this.translateParser.interpolate(message, {roleName: roleName});
    }

    buildUpdateMessage(roleName) {
        const message = this.translationService.instant('admin.roles.toasts.updated');
        return this.translateParser.interpolate(message, {roleName: roleName});
    }

    buildDeleteMessage(roleName) {
        const message = this.translationService.instant('admin.roles.toasts.deleted');
        return this.translateParser.interpolate(message, {roleName: roleName});
    }

    shouldRenderModifiers() {
        return this.permissionService.hasHasPermissionForFeature('MANAGE_ROLES');
    }
}
