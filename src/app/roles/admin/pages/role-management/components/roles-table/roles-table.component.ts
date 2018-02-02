import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableConfig } from '@app/shared/util/table-config.utils';
import { UserRole } from '@models/role.model';
import { TranslateService } from '@ngx-translate/core';
import { Log } from 'ng2-logger';


@Component({
    selector: 'app-roles-table',
    templateUrl: './roles-table.component.html',
    styleUrls: ['./roles-table.component.scss']
})
export class RolesTableComponent {
    _logger = Log.create(RolesTableComponent.name);
    @Input() roles = new Array<UserRole>();
    @Input() tableConfig: TableConfig;
    @Input() isLoading: false;

    @Output() pageChange = new EventEmitter<any>();
    @Output() filterChange = new EventEmitter<any>();
    @Output() sortChange = new EventEmitter<any>();
    @Output() rowClick = new EventEmitter<any>();

    constructor(private translateService: TranslateService) {
    }

    onPageChange(tableConfig: TableConfig) {
        this._logger.info('onPageChange::', tableConfig);
        this.pageChange.emit(tableConfig);
    }

    onSortChange(tableConfig: TableConfig) {
        this._logger.info('onSortChange::', tableConfig);
        this.sortChange.emit(tableConfig);
    }

    onFilterChange(tableConfig: TableConfig) {
        this._logger.info('onFilterChange::', tableConfig);
        this.filterChange.emit(tableConfig);
    }

    onRowClick(clickedItem) {
        this._logger.info('onRowClick::', clickedItem);
        this.rowClick.emit(clickedItem);
    }

    getRoleName(role: UserRole) {
        if (role.isOob) {
            return this.translateService.instant('admin.roles.oobRoles.' + role.name)
        }

        return role.name;
    }
}
