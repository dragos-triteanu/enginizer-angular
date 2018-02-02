import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TableConfig } from '@app/shared/util/table-config.utils';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-report-download-form',
    templateUrl: './report-download-form.component.html',
    styleUrls: ['./report-download-form.component.scss']
})
export class ReportDownloadFormComponent implements OnInit {

    @Input() tableConfig: TableConfig;

    @Output() filterChange = new EventEmitter<any>();
    @Output() reportDownload = new EventEmitter<any>();

    reportFilters = [];

    reportDownloadForm: FormGroup;
    showValidations = false;

    static dateValidator(group: FormGroup) {
        const startDate = group.controls['startDate'];
        const endDate = group.controls['endDate'];

        if (startDate.value && endDate.value) {
            if (startDate.value > endDate.value) {
                startDate.setErrors({invalidDateInterval: true});
                return;
            }
        }

        if (startDate.hasError('invalidDateInterval')) {
            startDate.setErrors(null);
        }
    };

    constructor(private toastr: ToastsManager, private translationService: TranslateService) {
    }

    ngOnInit() {
        this.onFormInit();
    }

    onFormInit() {
        this.reportDownloadForm = new FormGroup({
            'startDate': new FormControl(null),
            'endDate': new FormControl(null)
        }, ReportDownloadFormComponent.dateValidator.bind(this));
    }

    onDateChange(field: string, value: string) {
        const dateFilter = {
            field: field,
            value: value
        };

        // TODO can't lodash unionBy be used to simplify logic? There must be a way :D
        const filter = this.reportFilters.find(fltr => fltr.field === dateFilter.field);
        const filterIndex = this.reportFilters.indexOf(filter);

        if (filterIndex === -1) {
            if (dateFilter.value) {
                this.reportFilters.push(dateFilter);
            }
        } else {
            if (dateFilter.value) {
                this.reportFilters[filterIndex].value = dateFilter.value;
            } else {
                this.reportFilters.splice(filterIndex, 1);
            }
        }

        this.filterChange.emit(this.reportFilters);
    }

    onReportDownload() {
        if (this.reportDownloadForm.invalid) {
            this.showValidations = true;
            return;
        }
        if (!this.tableConfig.pager.count) {
            this.toastr.error(this.translationService.instant('reportDownloadForm.toasts.noEntriesError'));
            return;
        }
        this.showValidations = false;
        this.reportDownload.emit(this.tableConfig);
    }
}
