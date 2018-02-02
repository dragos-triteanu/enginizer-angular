import { TreeNode } from "primeng/primeng";

export class TreeModel implements TreeNode {

    public label: string;
    public data: any;
    public expandedIcon: string;
    public collapsedIcon: string;
    public icon: string;
    public children: TreeModel[] = [];
    public parent: TreeModel;
    public _type: string;
    public selectable: boolean;
    public expanded: boolean;

    // aux properties
    public inspected = false;
    public isTopLevel = false;
    public isFolder = false;
    public warning: boolean;


    constructor(item: any = {}) {
        this.label = item.label;
        this.data = item.data;
        this.expandedIcon = item.expandedIcon;
        this.collapsedIcon = item.collapsedIcon;
        this.icon = item.icon;
        this.children = item.children || [];
        this.isTopLevel = item.isFolder || false;
        this.isFolder = item.isFolder || false;
        this.parent = item.parent;
        this.type = item.type || 'tree-model';
        this.warning = item.warning || false;
        this.inspected = item.inspected;
        this.selectable = item.selectable;
        this.expanded = item.expanded;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
    }
}
