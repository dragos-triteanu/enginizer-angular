import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TreeComponent implements OnInit {
    @Input() displayField = '';
    @Input() label = '';
    @Input() labelClass = {};
    @Input() hasContextMenu = false;
    @Input() selectionMode = 'single';
    @Input() selectedFile;
    @Input() scanningEnabled = false;
    @Input() emptyMessage = '';
    @Input() loading = false;
    @Input() selectDisabled = false;
    @Input() propagateSelectionUp = true;
    @Input() propagateSelectionDown = true;
    @Input() isMaterial = true;

    @Output() scan = new EventEmitter<any>();
    @Output() unselect = new EventEmitter<any>();
    @Output() select = new EventEmitter<any>();
    @Output() selections = new EventEmitter<any>();
    @Output() rowAlertClick = new EventEmitter<any>();

    _contextMenuItems = [];
    _items = [];
    _selectedItems = [];

    constructor() {
    }

    ngOnInit() {
    }

    triggerScanEvent(event) {
        this.scan.emit(event);
    }

    nodeSelect(event) {
        this.selections.emit(this.selectedItems);
        this.select.emit(event);
    }

    nodeUnselect(event) {
        this.selections.emit(this.selectedItems);
        this.unselect.emit(event);
    }

    shouldRenderItems() {
        return this.items && this.items.length > 0;
    }

    get items() {
        return this._items;
    }

    @Input()
    set items(items) {
        this._items = items;
    }

    get contextMenuItems() {
        return this._contextMenuItems;
    }

    @Input()
    set contextMenuItems(items) {
        this._contextMenuItems = items;
    }

    @Input()
    set selectedItems(selectedItems) {
        this._selectedItems = selectedItems;

    }

    get selectedItems() {
        return this._selectedItems;
    }

    clickRowAlert(node) {
        this.rowAlertClick.emit(node);
    }
}
