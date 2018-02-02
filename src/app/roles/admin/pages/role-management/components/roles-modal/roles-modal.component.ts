import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'app/shared/components';
import { UserRole } from '@models/role.model';
import { Permission } from '@models/permission.model';
import { TranslateService } from '@ngx-translate/core';
import { PermissionService } from '@app/authentication/services/permission.service';
import { Log } from 'ng2-logger';

@Component({
    selector: 'app-roles-modal',
    templateUrl: './roles-modal.component.html',
    styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent implements OnInit {
    _logger = Log.create(RolesModalComponent.name);

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output('onCreate')
    onCreate: EventEmitter<any> = new EventEmitter();
    @Output('onUpdate')
    onUpdate: EventEmitter<any> = new EventEmitter();
    @Output('onDelete')
    onDelete: EventEmitter<any> = new EventEmitter();

    @Input()
    public role: UserRole;

    form: FormGroup;

    permissions: Permission[] = [];

    error = false;
    previousRoleName = '';

    validationErrors;
    showValidations = false;

    constructor(private permissionService: PermissionService,
                private translateService: TranslateService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl('', [<any>Validators.required]),
            date: new FormControl('', [<any>Validators.required])
        });
        if (this.shouldRenderModifiers()) {
            this.getPermissions();
        }
    }

    /**
     * @param {any} role
     */
    open(role = new UserRole()) {
        this.reset();
        this.loadFormValue(role);
        if (this.shouldRenderModifiers()) {
            this.getPermissions();
        }
        this.modal.open();
    }

    close() {
        this.modal.close();
    }

    loadFormValue(role) {
        this.role = role;
        this.previousRoleName = role.name;
        this.form.setValue({name: this.getRoleName(role), date: new Date(2020, 2, 2)});
    }

    getFormValue() {
        this._logger.info('getFormValue::', this.role);
        return Object.assign(this.role, this.form.getRawValue());
    }

    createRole() {
        if (!this.isFormValid()) {
            return;
        }
        this.onCreate.emit(this.getFormValue());
    }

    updateRole() {
        if (!this.isFormValid()) {
            return;
        }
        this.onUpdate.emit({previousRoleName: this.previousRoleName, newRole: this.getFormValue()});
    }

    deleteRole() {
        this.onDelete.emit(this.role);
    }

    isOobRole() {
        return this.role && this.role.isOob;
    }

    getRoleName(role: UserRole) {
        if (role.isOob) {
            return this.translateService.instant('admin.roles.oobRoles.' + role.name)
        }

        return role.name;
    }

    private reset() {
        this.showValidations = false;
        this.validationErrors = {};
        this.form.reset();
    }

    private getPermissions() {
        this._logger.info('getPermissions:: Retrieving list of permissions');
        this.permissionService.getAllPermissions().subscribe(
            (data: any) => {
                this._logger.info('getPermissions:: API returned data', data);
                this.permissions = data.items;
            },
            (error: any) => {
                this._logger.info('getPermissions:: API returned error', error);
            }
        );
    }

    private isFormValid() {
        this.validationErrors = {};
        this.showValidations = true;
        let isValid = true;

        Object.keys(this.form.controls).forEach(key => {
            const control = this.form.controls[key];
            if (control.invalid) {
                isValid = false;
            }
        });

        return isValid;
    }

    get isEditMode() {
        return !!this.role.id;
    }

    shouldRenderModifiers() {
        return this.permissionService.hasHasPermissionForFeature('MANAGE_ROLES');
    }
}
