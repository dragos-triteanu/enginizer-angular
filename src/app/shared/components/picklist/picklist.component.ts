import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';

import * as _ from 'lodash';
import { Log } from "ng2-logger";

@Component({
    selector: 'app-picklist',
    templateUrl: 'picklist.component.html',
    styleUrls: ['picklist.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class PicklistComponent implements OnInit, OnChanges {
    _logger = Log.create(PicklistComponent.name);
    @Output() selectionChange = new EventEmitter<any>();

    @Input() displayField = 'name';
    @Input() valueField = 'id';
    @Input() sourceHeader;
    @Input() targetHeader;
    @Input() infoLabel;
    @Input() sourceFilterPlaceholder = "Search";
    @Input() targetFilterPlaceholder = "Search";
    @Input() disabled = false;
    @Input() source = [];
    @Input() hasTooltip = false;
    @Input() responsive = true;
    @Input() dragDrop = true;
    @Input() target = [];

    @Output() moveToSource = new EventEmitter<any>();
    @Output() moveToTarget = new EventEmitter<any>();


    filteredSource = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['target'] || changes['source']) {
            this.filterSourceByTarget();
        }
    }

    private filterSourceByTarget() {
        this.filteredSource = _.differenceBy(this.source, this.target, 'id');
        this._logger.data('filterSourceByTarget:: Picklist source', this.filteredSource);
        this._logger.data('filterSourceByTarget:: Picklist target', this.target);
    }

    onMoveToTarget() {
        this.moveToTarget.emit(this.target);
    }

    onMoveToSource() {
        this.moveToSource.emit(this.source);
    }

}
