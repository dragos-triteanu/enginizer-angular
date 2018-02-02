import { HttpParams } from "@angular/common/http";

import { TableConfig } from "@app/shared/util/table-config.utils";

export class AppUtils {

    static buildPageableParams(tableConfig: TableConfig): HttpParams {
        let params = new HttpParams();

        if (tableConfig) {
            params = params.set('page', `${tableConfig.pager.page}`);
            params = params.set('pageSize', `${tableConfig.pager.pageSize}`);
            if (tableConfig.sorter.field) {
                params = params.set('sortBy', `${tableConfig.sorter.field}`);
                params = params.set('IsSortingAscending', `${tableConfig.sorter.IsSortingAscending}`);
            }

            tableConfig.filters.forEach(filter => {
                if (filter.value !== 'All') {
                    params = params.set(filter.field, filter.value);
                }
            });

            tableConfig.groupers.forEach(group => {
                params = params.append("groupBy", group.value);
            });
        }
        return params;
    }
}
